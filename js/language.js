const dbName = 'LanguageDB';
const storeName = 'Languages';

// 打开 IndexedDB 数据库
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName, { keyPath: 'lang' });
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// 将语言包存储到 IndexedDB
function saveLanguageToDB(lang, data) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put({ lang, data, version: data.version || '1.0' });
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    });
}

// 从 IndexedDB 中检索语言包
function getLanguageFromDB(lang) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(lang);
            request.onsuccess = () => resolve(request.result ? request.result : null);
            request.onerror = () => reject(request.error);
        });
    });
}

// 根据位置获取语言
function getLanguageFromLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // 使用经纬度调用外部服务以获取语言信息（示例）
                    // 请用实际的地理位置服务 API 替换下面的 URL 和处理逻辑
                    fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
                        .then(response => response.json())
                        .then(data => {
                            // 从位置数据推测语言（根据国家/区域）
                            const countryCode = data.country.toLowerCase();
                            const langMap = {
                                'tw': 'zh-Hant', // 台湾
                                'hk': 'zh-Hant', // 香港
                                'cn': 'zh-Hans', // 中国大陆
                                'jp': 'jp',      // 日本
                                'kr': 'korean',  // 韩国
                                'es': 'spanish', // 西班牙
                                // 添加其他国家和语言映射
                            };
                            resolve(langMap[countryCode] || 'en'); // 默认英文
                        })
                        .catch(() => resolve('en')); // 外部服务失败时回退到英文
                },
                () => resolve('en'), // 获取位置失败时回退到英文
                { timeout: 5000 } // 设置超时
            );
        } else {
            resolve('en'); // 浏览器不支持地理位置服务时使用默认语言
        }
    });
}

// 加载语言包
function loadLanguage(lang) {
    document.getElementById('loading-indicator').style.display = 'block';

    getLanguageFromDB(lang)
        .then(result => {
            const data = result ? result.data : null;
            if (data) {
                // 检查语言包版本
                return fetch(`./lang/${lang}.json`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(freshData => {
                        if (freshData.version && freshData.version !== data.version) {
                            // 语言包有更新，保存最新版本
                            saveLanguageToDB(lang, freshData);
                            applyLanguageData(freshData);
                        } else {
                            // 使用缓存的语言包
                            applyLanguageData(data);
                        }
                    });
            } else {
                // 从服务器加载语言包
                return fetch(`./lang/${lang}.json`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // 存储语言包到 IndexedDB
                        saveLanguageToDB(lang, data);
                        applyLanguageData(data);
                    });
            }
        })
        .catch(error => {
            console.error('Error loading language file:', error);
            // 使用默认语言
            loadLanguage('en');
        })
        .finally(() => {
            document.getElementById('loading-indicator').style.display = 'none';
        });
}

// 应用语言数据
function applyLanguageData(data) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (data[key]) {
            element.textContent = data[key];
        }
    });

    const rtlLanguages = ['ar', 'he', 'fa']; // 添加支持 RTL 语言
    if (rtlLanguages.includes(document.documentElement.lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.removeAttribute('dir');
    }

    // 提示语言切换成功
    alert('Language changed successfully!');
}

// 处理语言选择更改
function changeLanguage() {
    const lang = document.getElementById('language-selector').value;
    document.documentElement.lang = lang; // 更新 HTML lang 属性
    loadLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
}

// 初始化语言设置
function initializeLanguage() {
    getLanguageFromLocation()
        .then(locationLang => {
            // 首先尝试加载位置语言
            return getLanguageFromDB(locationLang)
                .then(result => {
                    if (result) {
                        // 如果从 IndexedDB 中获取到位置语言，则应用它
                        return locationLang;
                    } else {
                        // 位置语言不可用，则回退到英文
                        return 'en';
                    }
                });
        })
        .then(lang => {
            loadLanguage(lang);
            document.getElementById('language-selector').value = lang;
            document.documentElement.lang = lang;
        });
}

// 初始化语言和事件监听
window.onload = function() {
    initializeLanguage();

    document.getElementById('language-selector').addEventListener('change', changeLanguage);
}

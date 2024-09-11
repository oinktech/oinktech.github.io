// 打开数据库
const DB_NAME = 'languageDB';
const DB_VERSION = 1;

let db;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = function(event) {
            db = event.target.result;
            db.createObjectStore('languages', { keyPath: 'lang' });
        };
        request.onsuccess = function(event) {
            db = event.target.result;
            resolve();
        };
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

// 从 IndexedDB 获取语言数据
function getLanguageFromDB(lang) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['languages'], 'readonly');
        const store = transaction.objectStore('languages');
        const request = store.get(lang);
        request.onsuccess = function(event) {
            resolve(event.target.result);
        };
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

// 保存语言数据到 IndexedDB
function saveLanguageToDB(lang, data) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['languages'], 'readwrite');
        const store = transaction.objectStore('languages');
        const request = store.put({ lang, data });
        request.onsuccess = function() {
            resolve();
        };
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

// 根据位置获取语言
function getLanguageFromLocation() {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                // 使用位置检测语言，暂时简单返回英文作为示例
                resolve('en');
            },
            () => {
                resolve('en'); // 默认返回英文
            }
        );
    });
}

// 加载语言数据
function loadLanguage(lang) {
    document.getElementById('loading-indicator').style.display = 'block';

    getLanguageFromDB(lang)
        .then(result => {
            const data = result ? result.data : null;
            if (data) {
                return fetch(`./lang/${lang}.json`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(freshData => {
                        if (freshData.version && freshData.version !== data.version) {
                            saveLanguageToDB(lang, freshData);
                            applyLanguageData(freshData);
                        } else {
                            applyLanguageData(data);
                        }
                    });
            } else {
                return fetch(`./lang/${lang}.json`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        saveLanguageToDB(lang, data);
                        applyLanguageData(data);
                    });
            }
        })
        .catch(error => {
            console.error('Error loading language file:', error);
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
        if (data && data[key]) {
            element.textContent = data[key];
        } else {
            console.warn(`Missing translation for key: ${key}`);
            element.textContent = `Missing translation for key: ${key}`;
        }
    });

    const rtlLanguages = ['ar', 'he', 'fa']; // 支持 RTL 语言
    if (rtlLanguages.includes(document.documentElement.lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.removeAttribute('dir');
    }

    alert('Language changed successfully!');
}

// 处理语言选择更改
function changeLanguage() {
    const lang = document.getElementById('language-selector').value;
    document.documentElement.lang = lang;
    loadLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
}

// 初始化语言设置
function initializeLanguage() {
    getLanguageFromLocation()
        .then(locationLang => {
            return getLanguageFromDB(locationLang)
                .then(result => {
                    if (result) {
                        return locationLang;
                    } else {
                        return 'en';
                    }
                });
        })
        .then(lang => {
            loadLanguage(lang);
            document.getElementById('language-selector').value = lang;
            document.documentElement.lang = lang;
        })
        .catch(error => {
            console.error('Error initializing language:', error);
            loadLanguage('en');
        });
}

// 初始化语言和事件监听
window.onload = function() {
    openDB()
        .then(() => {
            initializeLanguage();
            document.getElementById('language-selector').addEventListener('change', changeLanguage);
        })
        .catch(error => {
            console.error('Error opening database:', error);
        });
};

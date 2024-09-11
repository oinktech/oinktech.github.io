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
        if (data && data[key]) {
            element.textContent = data[key];
        } else {
            console.warn(`Missing translation for key: ${key}`);
            element.textContent = `Missing translation for key: ${key}`;
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
        })
        .catch(error => {
            console.error('Error initializing language:', error);
            // 处理初始化语言时的错误
            loadLanguage('en');
        });
}

// 初始化语言和事件监听
window.onload = function() {
    initializeLanguage();

    document.getElementById('language-selector').addEventListener('change', changeLanguage);
}

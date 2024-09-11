document.addEventListener('DOMContentLoaded', () => {
    // 创建按钮元素
    const languageButton = document.createElement('button');
    languageButton.id = 'language-button';
    languageButton.textContent = 'Select Language';

    // 创建语言选择框
    const languageSelectorModal = document.createElement('div');
    languageSelectorModal.id = 'language-selector-modal';
    languageSelectorModal.style.display = 'none';
    languageSelectorModal.innerHTML = `
        <label for="language-selector" data-key="selectLanguage">Select language:</label>
        <select id="language-selector" onchange="changeLanguage()">
            <option value="zh-Hant">繁體中文</option>
            <option value="en">English</option>
            <option value="jp">日本語</option>
            <option value="korean">한국어</option>
            <option value="spanish">español</option>
            <!-- 添加其他语言选项 -->
        </select>
    `;

    // 查找 header 元素
    const header = document.querySelector('header');
    
    // 插入按钮和语言选择框到 header 的底部
    if (header) {
        header.appendChild(languageButton);
        header.appendChild(languageSelectorModal);
    }

    // 切换语言选择框的显示和隐藏
    languageButton.addEventListener('click', () => {
        if (languageSelectorModal.style.display === 'none') {
            languageSelectorModal.style.display = 'block';
        } else {
            languageSelectorModal.style.display = 'none';
        }
    });

    // 关闭语言选择框（点击选择框外部区域）
    window.addEventListener('click', (event) => {
        if (event.target !== languageButton && event.target !== languageSelectorModal && !languageSelectorModal.contains(event.target)) {
            languageSelectorModal.style.display = 'none';
        }
    });
});

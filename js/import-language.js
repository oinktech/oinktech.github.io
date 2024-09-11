document.addEventListener('DOMContentLoaded', () => {
    // 创建新的 div 元素
    const languageSelectorDiv = document.createElement('div');
    languageSelectorDiv.className = 'language-selector';

    // 设置 HTML 内容
    languageSelectorDiv.innerHTML = `
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

    // 创建换行元素
    const lineBreak = document.createElement('br');

    // 查找 header 元素
    const header = document.querySelector('header');

    // 如果 header 元素存在，将换行元素和语言选择 div 插入到 header 的底部
    if (header) {
        header.appendChild(lineBreak); // 添加换行
        header.appendChild(languageSelectorDiv); // 添加语言选择器
    }
});

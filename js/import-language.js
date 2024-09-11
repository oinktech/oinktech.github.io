document.addEventListener('DOMContentLoaded', () => {
    // 创建一个按钮元素
    const button = document.createElement('button');
    button.className = 'language-button';
    button.innerHTML = `<box-icon name='globe'></box-icon>`; // 使用 Boxicons 图标

    // 创建一个语言选择 div 元素
    const languageSelectorDiv = document.createElement('div');
    languageSelectorDiv.className = 'language-selector';
    languageSelectorDiv.style.display = 'none'; // 初始隐藏

    // 设置语言选择框的 HTML 内容
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

    // 处理按钮点击事件
    button.addEventListener('click', () => {
        if (languageSelectorDiv.style.display === 'none') {
            languageSelectorDiv.style.display = 'block';
        } else {
            languageSelectorDiv.style.display = 'none';
        }
    });

    // 查找 header 元素
    const header = document.querySelector('header');

    // 如果 header 元素存在，将按钮和语言选择 div 插入到 header 的底部
    if (header) {
        header.appendChild(button); // 添加按钮
        header.appendChild(languageSelectorDiv); // 添加语言选择框
    }
});

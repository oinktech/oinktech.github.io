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
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // 防止点击事件冒泡到 document
        languageSelectorDiv.style.display = languageSelectorDiv.style.display === 'none' ? 'block' : 'none';
    });

    // 处理点击其他位置时隐藏语言选择框
    document.addEventListener('click', (event) => {
        if (languageSelectorDiv.style.display === 'block' && !languageSelectorDiv.contains(event.target) && event.target !== button) {
            languageSelectorDiv.style.display = 'none';
        }
    });

    // 拖动功能
    let isDragging = false;
    let offsetX, offsetY;

    button.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - button.getBoundingClientRect().left;
        offsetY = event.clientY - button.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            button.style.left = `${event.clientX - offsetX}px`;
            button.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // 将按钮和语言选择框添加到 body
    document.body.appendChild(button); // 添加按钮
    document.body.appendChild(languageSelectorDiv); // 添加语言选择框
});

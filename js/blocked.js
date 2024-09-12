document.addEventListener('DOMContentLoaded', () => {
    // 1. 添加動態CSS
    const style = document.createElement('style');
    style.innerHTML = `
        
        #virtualPopup {
            display: none;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #2c2c2c; /* 深灰色 */
            border: 2px solid #1a1a1a; /* 更深的灰色邊框 */
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            border-radius: 8px;
            color: #e0e0e0; /* 淺灰色文字 */
            width: 300px;
            text-align: center;
        }

        #virtualPopup h3 {
            margin: 0;
            padding-bottom: 10px;
            font-size: 20px;
            color: #00aaff; /* 天藍色強調色 */
        }

        #virtualPopup p {
            font-size: 16px;
            margin: 10px 0;
        }

        #closePopup {
            margin-top: 15px;
            padding: 10px 20px;
            border: none;
            background-color: #00aaff; /* 天藍色按鈕 */
            color: white;
            cursor: pointer;
            border-radius: 4px;
            font-size: 16px;
            transition: background-color 0.3s, transform 0.3s;
        }

        #closePopup:hover {
            background-color: #0088cc; /* 按鈕 hover 狀態 */
            transform: scale(1.05);
        }

        #overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 999;
        }
    `;
    document.head.appendChild(style);

    // 2. 創建虛擬彈出框的 HTML
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);

    const popup = document.createElement('div');
    popup.id = 'virtualPopup';
    popup.innerHTML = `
        <h3>警告</h3>
        <p>檢視原始碼功能已被禁用。</p>
        <button id="closePopup">關閉</button>
    `;
    document.body.appendChild(popup);

    // 3. 顯示虛擬彈出框
    function showPopup(message) {
        const popupMessage = popup.querySelector('p');
        popupMessage.textContent = message;
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }

    // 4. 隱藏虛擬彈出框
    function hidePopup() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }

    // 5. 綁定關閉按鈕的事件
    document.getElementById('closePopup').addEventListener('click', hidePopup);

    // 6. 禁用 Ctrl+U 和 F12
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showPopup("檢視原始碼功能已被禁用");
        }
        
        if (e.key === 'F12') {
            e.preventDefault();
            showPopup("開發者工具已被禁用");
        }
    });

    // 7. 禁用右鍵
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showPopup("右鍵功能已被禁用");
    });
});

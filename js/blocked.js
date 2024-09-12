document.addEventListener('DOMContentLoaded', () => {
    // 1. 動態添加CSS樣式
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: 'Arial', sans-serif;
        }

        #virtualPopup {
            display: none;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, #2e2e2e, #3a3a3a); /* 深灰色漸變 */
            border: 2px solid #1a1a1a; /* 更深的灰色邊框 */
            padding: 25px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            border-radius: 10px;
            color: #e0e0e0; /* 淺灰色文字 */
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease; /* 平滑顯示和位移動畫 */
        }

        #virtualPopup.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1); /* 放大效果 */
        }

        #virtualPopup h3 {
            margin: 0;
            padding-bottom: 10px;
            font-size: 20px;
            color: #00aaff; /* 天藍色強調色 */
        }

        #virtualPopup p {
            font-size: 16px;
        }

        #closePopup {
            margin-top: 15px;
            padding: 10px 20px;
            border: none;
            background-color: #00aaff; /* 天藍色按鈕 */
            color: white;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s;
        }

        #closePopup:hover {
            background-color: #0088cc; /* 按鈕 hover 狀態 */
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
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        #overlay.show {
            display: block;
            opacity: 1;
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
        popup.classList.add('show');
        overlay.classList.add('show');
    }

    // 4. 隱藏虛擬彈出框
    function hidePopup() {
        popup.classList.remove('show');
        overlay.classList.remove('show');
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

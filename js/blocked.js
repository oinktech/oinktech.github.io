document.addEventListener('DOMContentLoaded', () => {
    try {
        // 1. 動態添加CSS樣式
        const style = document.createElement('style');
        style.innerHTML = `
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                overflow-x: hidden; /* 防止水平滾動條 */
            }

            #virtualPopup {
                display: none;
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(145deg, #333333, #4a4a4a); /* 更深的灰色漸變 */
                border: 2px solid #1c1c1c; /* 邊框更深色 */
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
                z-index: 1000;
                border-radius: 12px;
                color: #e0e0e0; /* 淺灰色文字 */
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9); /* 預設縮小 */
                transition: opacity 0.4s ease, transform 0.4s ease; /* 平滑顯示和放大動畫 */
            }

            #virtualPopup.show {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1); /* 顯示為正常大小 */
            }

            #virtualPopup h3 {
                margin: 0;
                padding-bottom: 15px;
                font-size: 22px;
                color: #00aaff; /* 天藍色強調色 */
            }

            #virtualPopup p {
                font-size: 16px;
                line-height: 1.5;
            }

            #closePopup {
                margin-top: 20px;
                padding: 12px 24px;
                border: none;
                background-color: #00aaff; /* 天藍色按鈕 */
                color: white;
                cursor: pointer;
                border-radius: 6px;
                font-size: 16px;
                transition: background-color 0.3s, transform 0.2s; /* 背景顏色和縮放動畫 */
            }

            #closePopup:hover {
                background-color: #0088cc; /* 按鈕 hover 狀態 */
            }

            #closePopup:active {
                transform: scale(0.98); /* 按鈕點擊效果 */
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
                transition: opacity 0.4s ease;
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
            try {
                const popupMessage = popup.querySelector('p');
                popupMessage.textContent = message;
                popup.classList.add('show');
                overlay.classList.add('show');
            } catch (error) {
                alert('顯示彈出框時發生錯誤: ' + error.message);
            }
        }

        // 4. 隱藏虛擬彈出框
        function hidePopup() {
            try {
                popup.classList.remove('show');
                overlay.classList.remove('show');
            } catch (error) {
                alert('隱藏彈出框時發生錯誤: ' + error.message);
            }
        }

        // 5. 綁定關閉按鈕的事件
        document.getElementById('closePopup').addEventListener('click', hidePopup);

        // 6. 禁用 Ctrl+U 和 F12
        document.addEventListener('keydown', function(e) {
            try {
                if (e.ctrlKey && e.key === 'u') {
                    e.preventDefault();
                    showPopup("檢視原始碼功能已被禁用");
                }
                
                if (e.key === 'F12') {
                    e.preventDefault();
                    showPopup("開發者工具已被禁用");
                }
            } catch (error) {
                alert('鍵盤事件處理錯誤: ' + error.message);
            }
        });

        // 7. 禁用右鍵
        document.addEventListener('contextmenu', function(e) {
            try {
                e.preventDefault();
                showPopup("右鍵功能已被禁用");
            } catch (error) {
                alert('右鍵事件處理錯誤: ' + error.message);
            }
        });
    } catch (error) {
        alert('初始化腳本時發生錯誤: ' + error.message);
    }
});

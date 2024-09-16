// 動態加載 Boxicons 圖標庫
(function loadBoxicons() {
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
})();

// 創建回到首頁按鈕
(function createHomeButton() {
    const homeButton = document.createElement('a');
    homeButton.href = '#';
    homeButton.id = 'home-button';
    homeButton.title = '回到首頁';
    homeButton.innerHTML = "<i class='bx bx-up-arrow-alt'></i><span>回到首頁</span>";
    document.body.appendChild(homeButton);

    const style = document.createElement('style');
    style.innerHTML = `
        #home-button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: white;
            border-radius: 10px; /* 改為方形按鈕，圓角設置較小 */
            font-size: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, background 1s ease, box-shadow 0.3s ease, opacity 0.3s;
            position: fixed;
            bottom: 30px;
            right: 30px;
            opacity: 0;
            pointer-events: none;
            z-index: 1000;
            text-decoration: none;
            padding-right: 30px;
        }

        #home-button i {
            font-size: 22px;
            margin-right: 8px;
            transition: transform 0.3s ease;
        }

        #home-button span {
            opacity: 1; /* 確保文字正確顯示 */
            transition: opacity 0.3s ease;
        }

        #home-button.show {
            opacity: 1;
            pointer-events: auto;
            animation: flashBackground 3s infinite alternate;
        }

        #home-button:hover {
            background: linear-gradient(135deg, #00f2fe, #4facfe);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        #home-button:hover i {
            transform: rotate(360deg) scale(1.2);
        }

        #home-button:active {
            transform: scale(0.95);
        }

        @media (max-width: 768px) {
            #home-button {
                font-size: 14px;
                right: 20px;
                bottom: 20px;
            }

            #home-button i {
                font-size: 18px;
            }
        }

        /* 彈跳進場動畫 */
        @keyframes bounceIn {
            0% {
                transform: scale(0.5);
                opacity: 0;
            }
            60% {
                transform: scale(1.2);
                opacity: 1;
            }
            80% {
                transform: scale(0.9);
            }
            100% {
                transform: scale(1);
            }
        }

        /* 背景閃爍動畫 */
        @keyframes flashBackground {
            0% { background: #4facfe; }
            50% { background: #00f2fe; }
            100% { background: #4facfe; }
        }
    `;
    document.head.appendChild(style);

    // 滾動後顯示/隱藏按鈕
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            homeButton.classList.add('show');
        } else {
            homeButton.classList.remove('show');
        }
    });

    // 平滑滾動至頂部
    homeButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

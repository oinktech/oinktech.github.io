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
    homeButton.title = 'Back to Home';
    homeButton.innerHTML = "<i class='bx bx-up-arrow-alt'></i><span>Back to Home</span>";
    document.body.appendChild(homeButton);

    const style = document.createElement('style');
    style.innerHTML = `
        #home-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: white;
            border-radius: 12px;
            font-size: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, background 1s ease, box-shadow 0.3s ease, opacity 0.3s, color 0.3s;
            position: fixed;
            bottom: 30px;
            right: 30px;
            opacity: 0;
            pointer-events: none;
            z-index: 1000;
            text-decoration: none;
            padding: 10px;
            text-align: center;
        }

        #home-button i {
            font-size: 24px;
            margin-right: 8px;
            transition: transform 0.3s ease;
        }

        #home-button span {
            font-size: 14px;
            display: inline-block;
            opacity: 1;
            transition: opacity 0.3s ease;
            text-align: center;
        }

        #home-button.show {
            opacity: 1;
            pointer-events: auto;
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
                font-size: 20px;
            }

            #home-button span {
                font-size: 12px;
            }
        }

        /* 淡入淡出動畫 */
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }

        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // 根據滾動深度動態調整按鈕顯示與隱藏
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        if (scrollY > 300) {
            homeButton.classList.add('show');
            homeButton.style.animation = 'fadeIn 0.5s ease-in-out forwards';
        } else {
            homeButton.classList.remove('show');
            homeButton.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        }
    });

    // 平滑滾動至頂部
    homeButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

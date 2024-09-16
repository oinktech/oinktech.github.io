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
            padding: 15px;
            background: linear-gradient(135deg, #ff7e5f, #feb47b); /* 橙色到粉色的漸變 */
            color: white;
            border-radius: 50px;
            font-size: 18px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, background 1s ease, box-shadow 0.3s ease, opacity 0.3s;
            position: fixed;
            bottom: 30px;
            right: 30px;
            opacity: 0;
            pointer-events: none;
            z-index: 1000;
            text-decoration: none;
            padding-right: 20px;
        }

        #home-button i {
            font-size: 24px;
            margin-right: 8px;
            transition: transform 0.3s ease;
        }

        #home-button span {
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        #home-button.show {
            opacity: 1;
            pointer-events: auto;
        }

        #home-button:hover {
            background: linear-gradient(135deg, #feb47b, #ff7e5f);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        #home-button:hover span {
            opacity: 1;
        }

        #home-button:hover i {
            transform: scale(1.1);
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
                display: none;
            }
        }

        /* 按鈕背景漸變動畫 */
        @keyframes background-change {
            0% { background: #ff7e5f; }
            50% { background: #feb47b; }
            100% { background: #ff7e5f; }
        }

        /* 當按鈕出現時添加背景漸變效果 */
        #home-button.show {
            animation: background-change 3s infinite alternate;
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

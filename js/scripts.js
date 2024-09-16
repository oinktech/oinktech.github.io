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
    homeButton.innerHTML = "<i class='bx bx-up-arrow-alt'></i><span>回到首頁</span><div class='progress-ring'></div>";
    document.body.appendChild(homeButton);

    const style = document.createElement('style');
    style.innerHTML = `
        #home-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: white;
            border-radius: 15px;
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
            padding-right: 30px;
        }

        #home-button i {
            font-size: 22px;
            margin-right: 8px;
            transition: transform 0.3s ease;
        }

        #home-button span {
            display: none;
            font-size: 12px;
            opacity: 1;
            transition: opacity 0.3s ease;
        }

        #home-button .progress-ring {
            position: absolute;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 4px solid rgba(255, 255, 255, 0.5);
            box-sizing: border-box;
            top: -5px;
            left: -5px;
            z-index: -1;
            transition: border-color 0.3s ease;
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

        #home-button:hover {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.6); /* 光暈效果 */
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

        /* 淡入淡出動畫 */
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }

        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }

        /* 背景漸變動畫 */
        @keyframes backgroundChange {
            0% { background: #4facfe; }
            50% { background: #00f2fe; }
            100% { background: #4facfe; }
        }
    `;
    document.head.appendChild(style);

    // 根據滾動深度動態調整按鈕大小與背景
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / maxScroll) * 100;

        if (scrollY > 300) {
            homeButton.classList.add('show');
            homeButton.style.animation = 'fadeIn 0.5s ease-in-out forwards';

            // 環繞按鈕的圓形進度條更新
            homeButton.querySelector('.progress-ring').style.borderColor = `rgba(255, 255, 255, ${scrollPercent / 100})`;

            // 滾到底部時增加振動效果
            if (scrollY + window.innerHeight >= document.body.scrollHeight) {
                homeButton.style.animation = 'shake 0.5s';
            }
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

    // 懸停顯示文字
    homeButton.addEventListener('mouseover', function() {
        homeButton.querySelector('span').style.display = 'inline';
    });

    homeButton.addEventListener('mouseout', function() {
        homeButton.querySelector('span').style.display = 'none';
    });

    // 添加振動效果
    homeButton.addEventListener('animationend', function() {
        homeButton.style.animation = '';
    });
})();

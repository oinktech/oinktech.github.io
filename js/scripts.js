
(function() {
    // 這裡是配置參數
    const buttonConfig = {
        width: '70px',
        height: '70px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        hoverBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '8px',
        fontSize: '14px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        bottom: '20px',
        right: '20px',
        iconSize: '20px',
        textColor: '#00BFFF',
        textSize: '10px',
        transition: '0.2s ease'
    };

    // 引入按鈕創建腳本並傳遞配置參數
    const script = document.createElement('script');
    script.src = 'https://oinktech.github.io/BACKTOHOMEBUTTON/@1-0-0script.js'; // 確保這裡的路徑是正確的
    script.onload = function() {
        createHomeButton(buttonConfig);
    };
    document.head.appendChild(script);
})();


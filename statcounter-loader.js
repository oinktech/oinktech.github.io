(function() {
    var sc_project = 13034834;
    var sc_invisible = 0;
    var sc_security = "bd33db8e";
    var scJsHost = "https://";
    
    // 動態加載 Statcounter JavaScript 文件
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = scJsHost + 'statcounter.com/counter/counter.js';
    scriptElement.async = true;
    
    // 創建一個 div 元素，包含 noscript 內容
    var noscriptElement = document.createElement('noscript');
    var divElement = document.createElement('div');
    divElement.className = 'statcounter';
    var aElement = document.createElement('a');
    aElement.href = 'https://statcounter.com/';
    aElement.target = '_blank';
    aElement.title = 'real time web analytics';
    var imgElement = document.createElement('img');
    imgElement.className = 'statcounter';
    imgElement.src = 'https://c.statcounter.com/13034834/0/bd33db8e/0/';
    imgElement.alt = 'real time web analytics';
    imgElement.referrerPolicy = 'no-referrer-when-downgrade';
    aElement.appendChild(imgElement);
    divElement.appendChild(aElement);
    noscriptElement.appendChild(divElement);
    
    // 查找所有頁面的 footer，並添加 Statcounter 代碼
    document.querySelectorAll('footer').forEach(function(footer) {
        var statcounterContainer = document.createElement('div');
        statcounterContainer.className = 'statcounter-container';
        footer.appendChild(statcounterContainer);
        statcounterContainer.appendChild(scriptElement);
        statcounterContainer.appendChild(noscriptElement);
    });
})();

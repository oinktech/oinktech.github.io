document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("IvkuQf_wwjODhE30t");

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        emailjs.send('service_4xr5dl8', 'template_zvura0n', {
            from_name: name,
            from_email: email,
            message_html: message
        })
        .then(response => {
            document.getElementById('contact-form').reset();
            const responseMessage = document.getElementById('response-message');
            responseMessage.style.display = 'block';
            responseMessage.innerHTML = '<p style="color: green;">訊息已成功發送！我們將會盡快與您聯繫。</p>';
            responseMessage.classList.add('animate__animated', 'animate__fadeInUp');
            document.getElementById('contact-form').style.display = 'none';
        }, error => {
            const responseMessage = document.getElementById('response-message');
            responseMessage.style.display = 'block';
            responseMessage.innerHTML = `<p style="color: red;">訊息發送失敗，請稍後再試。錯誤訊息：${error.text}</p>`;
            responseMessage.classList.add('animate__animated', 'animate__shakeX');
        });
    });
});
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

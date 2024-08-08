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

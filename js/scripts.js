document.addEventListener('DOMContentLoaded', () => {
    // 確保 EmailJS 正確初始化
    emailjs.init("IvkuQf_wwjODhE30t"); 

    // 處理表單提交
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // 檢查是否有空值
        if (!name || !email || !message) {
            const responseMessage = document.getElementById('response-message');
            responseMessage.style.display = 'block';
            responseMessage.innerHTML = '<p style="color: red;">Please fill out all fields before submitting.</p>';
            return;
        }

        emailjs.send('service_4xr5dl8', 'template_zvura0n', {
            from_name: name,
            from_email: email,
            message_html: message
        })
        .then(response => {
            document.getElementById('contact-form').reset();
            const responseMessage = document.getElementById('response-message');
            responseMessage.style.display = 'block';
            responseMessage.innerHTML = '<p style="color: green;">Your message has been sent successfully! We will get in touch with you as soon as possible.</p>';
            responseMessage.classList.add('animate__animated', 'animate__fadeInUp');
            document.getElementById('contact-form').style.display = 'none';
        }, error => {
            const responseMessage = document.getElementById('response-message');
            responseMessage.style.display = 'block';
            responseMessage.innerHTML = `<p style="color: red;">Failed to send message, please try again later. Error message: ${error.text || 'Unknown error'}</p>`;
            responseMessage.classList.add('animate__animated', 'animate__shakeX');
        });
    });
});

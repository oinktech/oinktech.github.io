document.addEventListener('DOMContentLoaded', () => {
        // 确保 EmailJS 正确初始化
        if (typeof emailjs !== 'undefined') {
            emailjs.init("IvkuQf_wwjODhE30t"); 
        } else {
            console.error('EmailJS is not loaded');
        }

        // 处理表单提交
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();

                // 检查是否有空值
                if (!name || !email || !message) {
                    const responseMessage = document.getElementById('response-message');
                    if (responseMessage) {
                        responseMessage.style.display = 'block';
                        responseMessage.innerHTML = '<p style="color: red;">Please fill out all fields before submitting.</p>';
                    }
                    return;
                }

                emailjs.send('service_4xr5dl8', 'template_zvura0n', {
                    from_name: name,
                    from_email: email,
                    message_html: message
                })
                .then(response => {
                    form.reset();
                    const responseMessage = document.getElementById('response-message');
                    if (responseMessage) {
                        responseMessage.style.display = 'block';
                        responseMessage.innerHTML = '<p style="color: green;">Your message has been sent successfully! We will get in touch with you as soon as possible.</p>';
                        responseMessage.classList.add('animate__animated', 'animate__fadeInUp');
                        form.style.display = 'none';
                    }
                }, error => {
                    const responseMessage = document.getElementById('response-message');
                    if (responseMessage) {
                        responseMessage.style.display = 'block';
                        responseMessage.innerHTML = `<p style="color: red;">Failed to send message, please try again later. Error message: ${error.text || 'Unknown error'}</p>`;
                        responseMessage.classList.add('animate__animated', 'animate__shakeX');
                    }
                });
            });
        } else {
            console.error('Form element not found');
        }
    });

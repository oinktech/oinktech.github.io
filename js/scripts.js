(function() {
    // 配置參數
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
    const buttonScript = document.createElement('script');
    buttonScript.src = 'https://oinktech.github.io/BACKTOHOMEBUTTON/@1-0-0/script.js';
    buttonScript.onload = () => createHomeButton(buttonConfig);
    document.head.appendChild(buttonScript);

    // 引入鏈接監聽腳本
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Script load error'));
            document.head.appendChild(script);
        });
    }

    loadScript('https://oinktech.github.io/LinkAware/@1.0.0/script.js')
        .then(() => console.log('Script loaded successfully'))
        .catch(error => console.error(error));
})();

// 生成 session ID
const sessionId = 'session_' + Math.random().toString(36).substring(2, 15);

// 添加 CSS 樣式
const styles = `
    .chat-container {
        background-color: #ffffff;
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
        padding: 20px;
        width: 450px;
        max-width: 90%;
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    #chat-box {
        border: 1px solid #ddd;
        padding: 15px;
        height: 350px;
        overflow-y: auto;
        margin-bottom: 10px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s;
    }

    .user-message, .liya-message {
        margin: 10px 0;
        padding: 10px;
        border-radius: 10px;
        animation: fadeIn 0.5s;
    }

    .user-message {
        background-color: #e0f7da;
        text-align: right;
        color: #333;
    }

    .liya-message {
        background-color: #ffe0e6;
        text-align: left;
        color: #333;
    }

    .input-container {
        display: flex;
        align-items: center;
    }

    #user-input {
        flex: 1;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 10px;
        transition: border-color 0.3s;
    }

    #user-input:focus {
        border-color: #4CAF50;
        outline: none;
    }

    #send-btn {
        padding: 12px;
        border: none;
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        margin-left: 5px;
        transition: background-color 0.3s, transform 0.3s;
    }

    #send-btn:hover {
        background-color: #45a049;
        transform: scale(1.05);
    }

    .error-message {
        color: red;
        font-size: 0.85em;
        text-align: center;
        margin-top: 5px;
    }

    .fade-in {
        animation: fadeIn 0.5s;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .modal-001 {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
        padding: 20px;
        width: 450px;
        max-width: 90%;
    }

    .modal-001-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        color: #4CAF50;
    }

    .close-modal-001 {
        cursor: pointer;
        font-size: 20px;
    }

    .floating-icon {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: #4CAF50;
        color: white;
        border-radius: 50%;
        padding: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        z-index: 1000;
    }

    .floating-icon:hover {
        background-color: #45a049;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// 模態框和浮動圖標
const chatHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMOi8QO1cK5+4WDXx5G2jX2hv1fFxWmVsb/vTk" crossorigin="anonymous">
    <div class="modal-001" id="chat-modal">
        <div class="modal-001-header">
            <h2>Chat with AI</h2>
            <span class="close-modal-001" id="close-modal-001">&times;</span>
        </div>
        <div class="chat-container">
            <div id="chat-box"></div>
            <div class="input-container">
                <input type="text" id="user-input" placeholder="輸入你的問題..." />
                <button id="send-btn">發送</button>
            </div>
            <div id="error-msg" class="error-message"></div>
        </div>
    </div>
    <div class="floating-icon" id="chat-icon">
        <i class="fas fa-comments"></i>
    </div>
`;
document.body.innerHTML += chatHTML;

// 模態框控制
const chatModal = document.getElementById('chat-modal');
const chatIcon = document.getElementById('chat-icon');
const closeModal = document.getElementById('close-modal-001');

chatIcon.onclick = () => { chatModal.style.display = 'block'; };
closeModal.onclick = () => { chatModal.style.display = 'none'; };

window.onclick = (event) => {
    if (event.target === chatModal) {
        chatModal.style.display = 'none';
    }
};

// 事件綁定
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    const errorMsg = document.getElementById("error-msg");

    if (!userInput) {
        errorMsg.textContent = "請輸入一個問題。";
        return;
    }

    errorMsg.textContent = "";
    appendMessage("user", userInput);
    document.getElementById("user-input").value = "";

    // 顯示「正在生成中」動畫
    displayLoadingMessage();

    fetch("https://techieai.onrender.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Session-ID": sessionId
        },
        body: JSON.stringify({ prompt: userInput })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("伺服器無法回應，請稍後再試。");
        }
        return response.json();
    })
    .then(data => {
        appendMessage("liya", data.response);
    })
    .catch(error => {
        errorMsg.textContent = error.message;
        removeLoadingMessage();
    });
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender === "user" ? "user-message" : "liya-message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // 滾動到最底部
}

function displayLoadingMessage() {
    const chatBox = document.getElementById("chat-box");
    const loadingElement = document.createElement("div");
    loadingElement.classList.add("liya-message");
    loadingElement.textContent = "正在生成回應...";
    chatBox.appendChild(loadingElement);
    chatBox.scrollTop = chatBox.scrollHeight; // 滾動到最底部
}

function removeLoadingMessage() {
    const chatBox = document.getElementById("chat-box");
    const loadingMessage = chatBox.querySelector(".liya-message:last-child");
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

(function() {
    function showError(message) {
        alert(`錯誤: ${message}`);
    }

    function addVirtualPopup() {
        const popup = document.createElement('div');
        popup.id = 'virtual-popup';
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.width = '80%';
        popup.style.maxWidth = '600px';
        popup.style.padding = '20px';
        popup.style.backgroundColor = '#333';
        popup.style.color = '#f0f0f0';
        popup.style.border = '2px solid #00bfff';
        popup.style.borderRadius = '10px';
        popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
        popup.style.zIndex = '1000';
        popup.style.display = 'none';
        popup.style.fontFamily = 'Arial, sans-serif';
        popup.style.fontSize = '16px';

        const closeButton = document.createElement('button');
        closeButton.textContent = '關閉';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.backgroundColor = '#00bfff';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.padding = '5px 10px';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function() {
            popup.style.display = 'none';
        };

        popup.appendChild(closeButton);
        document.body.appendChild(popup);

        return popup;
    }

    function displayPopup(message) {
        const popup = document.getElementById('virtual-popup') || addVirtualPopup();
        popup.textContent = message;
        popup.style.display = 'block';
    }

    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'u') {
            event.preventDefault();
            displayPopup('網站源碼被阻擋。');
        }
    });

    window.addEventListener('error', function(event) {
        showError(`錯誤訊息: ${event.message}\n於 ${event.filename} 行 ${event.lineno}`);
        event.preventDefault();
    });
})();

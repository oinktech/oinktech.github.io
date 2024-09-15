document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const head = document.head;

    // Function to add a stylesheet
    function addStylesheet(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        head.appendChild(link);
    }

    // Function to add a style block
    function addStyle(content) {
        const style = document.createElement('style');
        style.textContent = content;
        body.appendChild(style);
    }

    // Add Boxicons CSS
    addStylesheet('https://unpkg.com/boxicons/css/boxicons.min.css');

    // Add custom styles
    addStyle(`
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }

        .container {
            background-color: white;
            max-width: 600px;
            margin: 50px auto;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease, visibility 0.5s ease;
            z-index: 1000;
        }

        .container.show {
            opacity: 1;
            visibility: visible;
        }

        h1 {
            color: #00bfff;
            font-size: 28px;
            margin-bottom: 20px;
            animation: fadeIn 1s ease-out;
        }

        p {
            font-size: 18px;
            margin: 10px 0;
            color: #555;
        }

        button {
            background-color: #00bfff;
            color: white;
            border: none;
            padding: 15px 25px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 10px;
            margin-top: 20px;
            transition: background-color 0.3s ease, transform 0.2s;
        }

        button:hover {
            background-color: #009fdc;
            transform: scale(1.05);
        }

        input[type="text"] {
            padding: 10px;
            font-size: 16px;
            margin-top: 10px;
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            margin-bottom: 10px;
            transition: border-color 0.3s;
        }

        input[type="text"]:focus {
            border-color: #00bfff;
            outline: none;
        }

        .hidden {
            display: none;
        }

        #message {
            margin-top: 20px;
            font-size: 18px;
            color: red;
        }

        .fade-in {
            animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .floating-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #00bfff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 28px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s, transform 0.2s;
            z-index: 1000;
        }

        .floating-button.close {
            background-color: #ff4d4d;
        }

        .floating-button.close:hover {
            background-color: #e60000;
        }

        .confirm-dialog {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1001;
        }

        .confirm-dialog.show {
            display: block;
        }

        .confirm-dialog p {
            margin-bottom: 20px;
        }

        .confirm-dialog button {
            background-color: #ff4d4d;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .confirm-dialog button:hover {
            background-color: #e60000;
        }
    `);

    // Create and add floating button
    function createFloatingButton() {
        const button = document.createElement('button');
        button.className = 'floating-button';
        button.innerHTML = '<i class="bx bx-menu"></i>'; // Boxicons menu icon initially
        body.appendChild(button);
        return button;
    }

    // Create and add container
    function createContainer() {
        const container = document.createElement('div');
        container.className = 'container fade-in';
        container.innerHTML = `
            <h1>Manage IndexedDB</h1>
            <p>Click the button below to delete the database</p>
            <button id="deleteButton">Delete Database</button>
            <div id="confirmBox" class="hidden">
                <p>Please enter the verification code: <strong id="securityCode"></strong></p>
                <input type="text" id="confirmationCode" placeholder="Enter verification code">
                <button id="confirmDelete">Confirm Delete</button>
            </div>
            <p id="message"></p>
        `;
        body.appendChild(container);
        return container;
    }

    // Create and add confirmation dialog
    function createConfirmDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.innerHTML = `
            <p>Are you sure you want to delete the database?</p>
            <button id="confirmDeleteDatabase">Yes, delete</button>
            <button id="cancelDeleteDatabase">Cancel</button>
        `;
        body.appendChild(dialog);
        return dialog;
    }

    const button = createFloatingButton();
    const container = createContainer();
    const confirmDialog = createConfirmDialog();

    let randomCode = '';
    let isContainerVisible = false;

    // Generate random 9-digit verification code
    function generateRandomCode() {
        randomCode = Math.floor(100000000 + Math.random() * 900000000).toString();
        document.getElementById('securityCode').textContent = randomCode;
    }

    // Function to hide the container
    function hideContainer() {
        container.classList.remove('show');
        isContainerVisible = false;
        button.classList.remove('close');
        button.innerHTML = '<i class="bx bx-menu"></i>'; // Boxicons menu icon
    }

    // Show/hide container
    button.addEventListener('click', function() {
        if (isContainerVisible) {
            hideContainer();
        } else {
            container.classList.add('show');
            isContainerVisible = true;
            button.classList.add('close');
            button.innerHTML = '<i class="bx bx-x"></i>'; // Boxicons close icon
        }
    });

    // Show confirmation dialog
    document.getElementById('deleteButton').addEventListener('click', function() {
        confirmDialog.classList.add('show');
    });

    // Confirm delete button click
    document.getElementById('confirmDeleteDatabase').addEventListener('click', function() {
        document.getElementById('confirmBox').classList.remove('hidden');
        document.getElementById('message').textContent = '';
        confirmDialog.classList.remove('show');
    });

    // Cancel delete button click
    document.getElementById('cancelDeleteDatabase').addEventListener('click', function() {
        confirmDialog.classList.remove('show');
    });

    document.getElementById('confirmDelete').addEventListener('click', function() {
        const confirmationCode = document.getElementById('confirmationCode').value;
        if (confirmationCode === randomCode) {
            deleteIndexedDB();
            document.getElementById('message').textContent = 'Database successfully deleted!';
            document.getElementById('confirmBox').classList.add('hidden');
            hideContainer();
        } else {
            document.getElementById('message').textContent = 'Incorrect verification code, please try again.';
        }
    });

    // Delete IndexedDB function
    function deleteIndexedDB() {
        const dbName = 'myDatabase';
        const request = indexedDB.deleteDatabase(dbName);

        request.onsuccess = function() {
            console.log('Database deleted');
        };

        request.onerror = function(event) {
            console.error('Error deleting database', event);
        };

        request.onblocked = function() {
            console.warn('Database deletion blocked');
        };
    }

    // Generate verification code on page load
    generateRandomCode();
});

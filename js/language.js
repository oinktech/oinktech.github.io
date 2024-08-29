function loadLanguage(lang) {
    fetch(`./lang/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (data[key]) {
                    element.textContent = data[key];
                }
            });
        });
}

function changeLanguage() {
    const lang = document.getElementById('language-selector').value;
    loadLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
}

window.onload = function() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'zh-Hant';
    loadLanguage(preferredLanguage);
    document.getElementById('language-selector').value = preferredLanguage;
}
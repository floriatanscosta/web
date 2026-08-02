// js/menu.js
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeBtn = document.getElementById('theme-toggle');

    if (currentTheme === 'dark') {
        // Muda para claro
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (themeBtn) themeBtn.textContent = '🌙';
    } else {
        // Muda para escuro
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (themeBtn) themeBtn.textContent = '☀️';
    }
}
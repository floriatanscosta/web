// js/menu.js
// Função para abrir e fechar o menu no mobile
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    if (menu) {
        menu.classList.toggle("active");
    } else {
        console.error("O elemento 'navMenu' não foi encontrado na página.");
    }
}

// Função para alternar o tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeBtn = document.getElementById('theme-toggle');

    if (currentTheme === 'dark') {
        // Muda para Claro
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (themeBtn) themeBtn.textContent = '🌙';
    } else {
        // Muda para Escuro
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (themeBtn) themeBtn.textContent = '☀️';
    }
}
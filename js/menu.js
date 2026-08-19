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

// Função para troca manual de idioma através dos botões
function switchLanguage(lang) {
    // 1. Salva a escolha do usuário no navegador
    localStorage.setItem('preferred_lang', lang);

    // 2. Pega o endereço atual da página
    const currentPath = window.location.pathname;

    // 3. Faz o redirecionamento com base na escolha
    if (lang === 'en' && !currentPath.includes('/en/')) {
        // Vai do PT para o EN
        window.location.href = '/en' + currentPath;
    }
    else if (lang === 'pt' && currentPath.includes('/en/')) {
        // Vai do EN para o PT
        const newPath = currentPath.replace('/en', '') || '/';
        window.location.href = newPath;
    }
}
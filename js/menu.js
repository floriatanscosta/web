// js/menu.js

// Função para abrir e fechar o menu
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    if (menu) {
        menu.classList.toggle("active");
    } else {
        console.error("O elemento 'navMenu' não foi encontrado na página.");
    }
}

// Função para alternar o tema (Claro/Escuro)
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeBtn = document.getElementById('theme-toggle');
    const basePath = window.location.pathname.startsWith('/web') ? '/web' : '';

    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (themeBtn) {
            themeBtn.innerHTML = `<img src="${basePath}/assets/icons/escuro.svg" alt="Ativar Modo Escuro" style="width: 20px; height: 20px;">`;
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (themeBtn) {
            themeBtn.innerHTML = `<img src="${basePath}/assets/icons/claro.svg" alt="Ativar Modo Claro" style="width: 20px; height: 20px;">`;
        }
    }
}

// Função para troca manual de idioma
function switchLanguage(lang) {
    localStorage.setItem('preferred_lang', lang);
    const currentPath = window.location.pathname;
    const basePath = currentPath.startsWith('/web') ? '/web' : '';
    
    // Remove o basePath temporariamente para fazer a troca limpa de /en/
    let pathSemBase = currentPath.replace(basePath, '') || '/';

    if (lang === 'en' && !pathSemBase.includes('/en/')) {
        window.location.href = basePath + '/en' + (pathSemBase === '/' ? '' : pathSemBase);
    }
    else if (lang === 'pt' && pathSemBase.includes('/en/')) {
        const newPath = pathSemBase.replace('/en', '') || '/';
        window.location.href = basePath + newPath;
    }
}
// js/load-components.js

document.addEventListener("DOMContentLoaded", function() {
    
    // Detecta automaticamente se o site está na subpasta '/web'
    const basePath = window.location.pathname.startsWith('/web') ? '/web' : '';
    
    // Verifica se a URL atual contém a pasta do idioma inglês
    const isEnglish = window.location.pathname.includes('/en/');
    
    // Define quais arquivos carregar com base no idioma e no caminho base
    const headerFile = basePath + (isEnglish ? '/components/header-en.html' : '/components/header.html');
    const footerFile = basePath + (isEnglish ? '/components/footer-en.html' : '/components/footer.html');

    // 1. Injetar o Header
    fetch(headerFile)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar o header");
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Ajustar o ícone do tema (Claro/Escuro)
            const themeBtn = document.getElementById('theme-toggle');
            if (localStorage.getItem('theme') === 'dark' && themeBtn) {
                themeBtn.innerHTML = `<img src="${basePath}/assets/icons/claro.svg" alt="Ativar Modo Claro" style="width: 20px; height: 20px;">`;
            }
        })
        .catch(error => console.error('Problema com a requisição do header:', error));

    // 2. Injetar o Footer
    fetch(footerFile)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar o footer");
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            const yearSpan = document.getElementById("year");
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        })
        .catch(error => console.error('Problema com a requisição do footer:', error));
});
// js/load-components.js
document.addEventListener("DOMContentLoaded", function () {

    // Header
    fetch('./components/header.html')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar o header");
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // NOVO: Ajustar o ícone de lua/sol ao carregar o componente
            const themeBtn = document.getElementById('theme-toggle');
            if (localStorage.getItem('theme') === 'dark' && themeBtn) {
                themeBtn.textContent = '☀️';
            }
        })
        .catch(error => console.error('Problema com a requisição do header:', error));
    // Footer
    fetch('./components/footer.html')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar");
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;

            // 3. Atualizar o ano do copyright APÓS o footer ser injetado na tela
            const yearSpan = document.getElementById("year");
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        })
        .catch(error => console.error('Problema com a requisição:', error));

});
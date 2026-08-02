// js/load-components.js
document.addEventListener("DOMContentLoaded", function () {
    // header
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar o header");
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Problema com a requisição do header:', error));

    // footer
    fetch('components/footer.html')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar o footer");
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
        .catch(error => console.error('Problema com a requisição do footer:', error));

});
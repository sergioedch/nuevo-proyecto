document.addEventListener('DOMContentLoaded', () => {
    const btnToggle = document.getElementById('btnTogglePerfil');
    const cardPerfil = document.getElementById('cardPerfil');

    if (btnToggle && cardPerfil) {
        btnToggle.addEventListener('click', () => {
            cardPerfil.classList.toggle('panel-oculto');
        });
    }
});
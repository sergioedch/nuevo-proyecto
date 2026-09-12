const selectTalleres = document.getElementById('selectTalleres');
const checkTalleres = document.getElementById('opcionTalleres');

if (selectTalleres && checkTalleres) {
    selectTalleres.addEventListener('change', () => {
        checkTalleres.checked = true;
    });
}

const selectAmbos = document.getElementById('selectAmbos');
const checkAmbos = document.getElementById('opcionAmbos');

if (selectAmbos && checkAmbos) {
    selectAmbos.addEventListener('change', () => {
        checkAmbos.checked = true;
    });
}
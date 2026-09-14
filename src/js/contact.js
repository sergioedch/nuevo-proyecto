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

import Modal from 'bootstrap/js/dist/modal';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formContacto');
    const btnEnviar = document.getElementById('btnEnviar');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const textoOriginal = btnEnviar.innerText;
            btnEnviar.disabled = true;
            btnEnviar.innerText = 'ENVIANDO...';

            const formData = new FormData(form);

            try {
                const respuesta = await fetch('/sendmail.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await respuesta.json();

                if (data.status === 'success') {
                    // 1. Mostrar Modal de Éxito
                    const modalExitoElement = document.getElementById('modalExito');
                    if (modalExitoElement) {
                        const modalExito = new Modal(modalExitoElement);
                        modalExito.show();
                        // 2. Autocierre a los 3.5 segundos (3500 ms)
                        setTimeout(() => {
                            modalExito.hide();
                        }, 4500);
                    }

                    form.reset();
                } else {
                    mostrarModalError('No pudimos enviar tu registro. Detalle: ' + data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                mostrarModalError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
            } finally {
                btnEnviar.disabled = false;
                btnEnviar.innerText = textoOriginal;
            }
        });
    }

    function mostrarModalError(mensaje) {
        const modalErrorElement = document.getElementById('modalError');
        const textoErrorElement = document.getElementById('textoError');

        if (modalErrorElement) {
            if (textoErrorElement) {
                textoErrorElement.innerText = mensaje;
            }
            const modalError = new Modal(modalErrorElement);
            modalError.show();
        } else {
            console.error('No se encontró el elemento #modalError en el DOM.');
            alert(mensaje);
        }
    }
});
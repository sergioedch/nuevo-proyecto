document.addEventListener('DOMContentLoaded', () => {
    let rutaActual = window.location.pathname;
    
    if (rutaActual === '/' || rutaActual === '') {
        rutaActual = '/index.html';
    }
    const archivoActual = rutaActual.split('/').pop() || 'index.html';

    const enlaces = document.querySelectorAll('.nav-pildora .nav-link');

    enlaces.forEach(enlace => {
        let rutaEnlace = enlace.getAttribute('href');
        
        if (rutaEnlace === '/') {
            rutaEnlace = 'index.html';
        }
   
        const archivoEnlace = rutaEnlace.split('/').pop();

        enlace.classList.remove('active', 'fw-bold', 'text-danger');
        enlace.classList.add('text-dark'); 
        if (archivoActual === archivoEnlace) {
            enlace.classList.remove('text-dark');
            enlace.classList.add('active', 'fw-bold', 'text-danger');
        }
    });
});
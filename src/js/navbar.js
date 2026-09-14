document.addEventListener('DOMContentLoaded', () => {
    // --- NUEVO CÓDIGO PARA EFECTO BLUR EN SCROLL ---
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled', 'py-2');
                navbar.classList.remove('pt-4', 'mb-2'); 
            } else {
                navbar.classList.remove('navbar-scrolled', 'py-2');
                navbar.classList.add('pt-4', 'mb-2');
            }
        });
    }
    
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
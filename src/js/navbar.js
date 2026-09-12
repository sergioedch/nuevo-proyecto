document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtenemos la ruta actual (pathname). Ej: "/", "/index.html", "/contacto.html"
    let rutaActual = window.location.pathname;
    
    // Normalizamos: si es "/" o está vacío, lo tratamos como "/index.html"
    if (rutaActual === '/' || rutaActual === '') {
        rutaActual = '/index.html';
    }

    // Extraemos solo el nombre del archivo actual (ej. "index.html" o "contacto.html")
    // Esto evita problemas con subcarpetas en el servidor
    const archivoActual = rutaActual.split('/').pop() || 'index.html';

    // 2. Seleccionamos todos los enlaces del menú
    const enlaces = document.querySelectorAll('.nav-pildora .nav-link');

    enlaces.forEach(enlace => {
        // Obtenemos la ruta a la que apunta el enlace en el HTML
        let rutaEnlace = enlace.getAttribute('href');
        
        // Normalizamos el enlace: si apunta a "/", lo tratamos como "index.html"
        if (rutaEnlace === '/') {
            rutaEnlace = 'index.html';
        }
        
        // Extraemos solo el nombre del archivo del enlace
        const archivoEnlace = rutaEnlace.split('/').pop();

        // Limpiamos las clases "activas" de todos los enlaces por si quedaron en el HTML
        enlace.classList.remove('active', 'fw-bold', 'text-danger');
        enlace.classList.add('text-dark'); // Ponemos todos en negro por defecto

        // 3. Comparamos los nombres de archivo. Si coinciden, encendemos el enlace.
        if (archivoActual === archivoEnlace) {
            enlace.classList.remove('text-dark');
            enlace.classList.add('active', 'fw-bold', 'text-danger');
        }
    });
});
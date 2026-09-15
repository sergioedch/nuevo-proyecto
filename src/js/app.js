// Importamos los estilos de SASS
import '../scss/main.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Importamos todo el JS de Bootstrap
import * as bootstrap from 'bootstrap';

AOS.init({
    once: true, // Para que la animación ocurra solo la primera vez que bajas
    duration: 800 // Cuánto dura la animación en milisegundos
});

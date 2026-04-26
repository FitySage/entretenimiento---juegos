// --- BASE DE DATOS DIDÁCTICA ---
// IMPORTANTE: Las imágenes DEBEN ser PNG sin fondo.
const basesDatos = {
    letras: [
        { 
            simbolo: "A", 
            preguntaInicial: "¿Qué letra es esta?", 
            pistaSombra: "¿Qué animal empieza con la letra A?",
            imagen: "../assets/img/arana.jpg", // <- Ruta a tu imagen
            respuestaMisteriosa: "¡La Araña!"
        },
        { 
            simbolo: "E", 
            preguntaInicial: "¿Qué vocal es esta?", 
            pistaSombra: "¿Qué animal GIGANTE empieza con E?",
            imagen: "../assets/img/elefante.jpg", 
            respuestaMisteriosa: "¡El Elefante!"
        }
    ],
    colores: [
        { 
            simbolo: "🔴", 
            preguntaInicial: "¡Busquen algo de color ROJO en la casa!", 
            pistaSombra: "Ahora... ¿Qué animal del mar es de color rojo?",
            imagen: "../assets/img/cangrejo2.jpg", 
            respuestaMisteriosa: "¡El Cangrejo!"
        }
    ]
};

let elementosDisponibles = [];
let rondaActual = null;
let temporizadorAyuda = null;

// --- ELEMENTOS DEL DOM ---
const seccionMenu = document.getElementById('seleccion-categoria');
const seccionJuego = document.getElementById('juego-didactico');
const textoPregunta = document.getElementById('texto-pregunta');
const elementoGigante = document.getElementById('elemento-gigante');
const imagenMisteriosa = document.getElementById('imagen-misteriosa');
const mensajeEstado = document.getElementById('mensaje-estado');

// Botones del DJ
const btnFaseSombra = document.getElementById('btn-fase-sombra');
const btnFaseRevelar = document.getElementById('btn-fase-revelar');
const btnCorrecto = document.getElementById('btn-correcto');

// --- LÓGICA DEL JUEGO ---

function iniciarJuego(categoria) {
    elementosDisponibles = [...basesDatos[categoria]];
    seccionMenu.classList.add('d-none');
    seccionJuego.classList.remove('d-none');
    prepararRonda();
}

// FASE 1: Mostrar Letra/Color
function prepararRonda() {
    if (elementosDisponibles.length === 0) {
        alert("¡Terminamos todos los desafíos!");
        window.location.href = "../index.html"; // O llevalos al podio si hiciste sistema de estrellas
        return;
    }

    // Sorteo
    const indice = Math.floor(Math.random() * elementosDisponibles.length);
    rondaActual = elementosDisponibles[indice];
    elementosDisponibles.splice(indice, 1);

    // Preparar UI para Fase 1
    textoPregunta.innerText = rondaActual.preguntaInicial;
    
    elementoGigante.innerText = rondaActual.simbolo;
    elementoGigante.classList.remove('d-none');
    
    imagenMisteriosa.classList.add('d-none');
    imagenMisteriosa.src = rondaActual.imagen;
    imagenMisteriosa.classList.remove('animal-revelado'); // Asegurar que sea sombra
    imagenMisteriosa.classList.add('animal-oculto'); 

    mensajeEstado.innerText = "¡Digan la respuesta bien fuerte!";
    mensajeEstado.className = "text-info mt-4 fw-bold display-6";

    // Mostrar solo botón de avanzar
    btnFaseSombra.classList.remove('d-none');
    btnFaseRevelar.classList.add('d-none');
    btnCorrecto.classList.add('d-none');
}

// FASE 2: Pasar a la Sombra
btnFaseSombra.addEventListener('click', () => {
    // Escondemos la letra gigante y mostramos la imagen (que ahora es negra por el CSS)
    elementoGigante.classList.add('d-none');
    imagenMisteriosa.classList.remove('d-none');

    textoPregunta.innerText = rondaActual.pistaSombra;
    mensajeEstado.innerText = "¡Miren esa sombra! ¿Qué podrá ser?";
    
    // Cambiamos botones
    btnFaseSombra.classList.add('d-none');
    btnFaseRevelar.classList.remove('d-none');
});

// FASE 3: Iniciar el Reloj y Revelar
btnFaseRevelar.addEventListener('click', () => {
    // Al agregar esta clase, el CSS empieza a hacer la transición lenta de 10 segundos
    imagenMisteriosa.classList.add('animal-revelado');
    
    mensajeEstado.innerText = "⏳ Revelando... 10 segundos";
    mensajeEstado.className = "text-warning mt-4 fw-bold display-6";

    btnFaseRevelar.classList.add('d-none');

    // Cronómetro de la frustración (La genialidad que propusiste)
    temporizadorAyuda = setTimeout(() => {
        mensajeEstado.innerText = "🙋‍♀️ ¡Pídanle ayuda a un adulto, seguro que la saben!";
        mensajeEstado.className = "text-danger mt-4 fw-bold display-5";
        btnCorrecto.classList.remove('d-none'); // Recién acá te deja avanzar
    }, 10000); // 10 segundos
    
    // También podés habilitar el botón de correcto antes por si adivinan rápido
    setTimeout(() => {
        btnCorrecto.classList.remove('d-none');
    }, 3000); 
});

// FASE 4: Correcto y Siguiente
btnCorrecto.addEventListener('click', () => {
    clearTimeout(temporizadorAyuda); // Frenamos el cronómetro por las dudas
    
    textoPregunta.innerText = rondaActual.respuestaMisteriosa;
    mensajeEstado.innerText = "🎉 ¡EXCELENTE! 🎉";
    mensajeEstado.className = "text-success mt-4 fw-bold display-3";
    
    // Lluvia de confeti
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

    // En 3 segundos, pasamos solos a la siguiente letra
    btnCorrecto.classList.add('d-none');
    setTimeout(prepararRonda, 3500);
});

// Botón de salir
document.getElementById('btn-finalizar').addEventListener('click', () => {
    window.location.href = "../index.html";
});
// --- CONFIGURACIÓN DE EQUIPOS Y PUNTOS ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" },
    equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" },
    equipo4: { nombre: "Equipo 4" }
};
// --- BASE DE DATOS DE ANIMALES CON VARIANTES ---
// Reemplazá las rutas con los nombres exactos de los archivos que descargaste
const animales = [
    {
        nombre: "León",
        emoji: "🦁",
        audios: [
            "../assets/sounds/animales/leon/leon.mp3",
        ]
    },
    {
        nombre: "Perro",
        emoji: "🐶",
        audios: [
            "../assets/sounds/animales/perro/perro.mp3",
        ]
    },
    {
        nombre: "Gato",
        emoji: "🐱",
        audios: [
            "../assets/sounds/animales/gato/gato.mp3",
        ]
    },
    {
        nombre: "Vaca",
        emoji: "🐮",
        audios: [
            "../assets/sounds/animales/vaca/vaca.mp3",
        ]
    },
    {
        nombre: "lobo",
        emoji: "🐺",
        audios: [
            "../assets/sounds/animales/lobo/lobo.mp3",
        ]
    },
    {
        nombre: "Coscu",
        emoji: "👑",
        audios: [
            "../assets/sounds/animales/coscu/coscu.mp3",
        ]
    },
    {
        nombre: "Oveja",
        emoji: "🐑",
        audios: [
            "../assets/sounds/animales/oveja/oveja.mp3",
        ]
    },
    {
        nombre: "Pato",
        emoji: "🦆",
        audios: [
            "../assets/sounds/animales/pato/pato.mp3",
            "../assets/sounds/animales/pato/patov2.mp3",
        ]
    },
    {
        nombre: "Elefante",
        emoji: "🐘",
        audios: [
            "../assets/sounds/animales/elefante/elefante.mp3",
        ]
    },
    {
        nombre: "Delfin",
        emoji: "🐬",
        audios: [
            "../assets/sounds/animales/delfin/delfin.mp3",
            "../assets/sounds/animales/delfin/delfinv2.mp3",
        ]
    },
    {
        nombre: "Aguila",
        emoji: "🦅",
        audios: [
            "../assets/sounds/animales/aguila/aguila.mp3",
        ]
    },
    {
        nombre: "Mono",
        emoji: "🐒",
        audios: [
            "../assets/sounds/animales/mono/mono.mp3",
        ]
    },
    {
        nombre: "Lechuza",
        emoji: "🦉",
        audios: [
            "../assets/sounds/animales/lechuza/lechuza.mp3",
        ]

    },
    {
        nombre: "oso",
        emoji: "🐻",
        audios: [
            "../assets/sounds/animales/oso/oso.mp3",
        ]
    },
    {
        nombre: "Rana",
        emoji: "🐸",
        audios: [
            "../assets/sounds/animales/rana/rana.mp3",
        ]
    },
    {
        nombre: "Serpiente",
        emoji: "🐍",
        audios: [
            "../assets/sounds/animales/serpiente/serpiente.mp3",
        ]
    },
    {
        nombre: "Pingüino",
        emoji: "🐧",
        audios: [
            "../assets/sounds/animales/pinguino/pinguino.mp3",
        ]
    },
    {
        nombre: "caballo",
        emoji: "🐴",
        audios: [
            "../assets/sounds/animales/caballo/caballo.mp3",
        ]
    },
    {
        nombre: "cerdo",
        emoji: "🐷",
        audios: [
            "../assets/sounds/animales/cerdo/cerdo.mp3",
        ]
    },
    {
        nombre: "gallina",
        emoji: "🐔",
        audios: [
            "../assets/sounds/animales/gallina/gallina.mp3",
        ]
    },

    // Podés seguir agregando todos los animales que quieras copiando el formato
];

// --- VARIABLES DE ESTADO ---
let animalActual = null;

// ¡ACÁ ESTÁ LA MAGIA! Copiamos la lista original para ir "tachando" los que ya salieron
let animalesDisponibles = [...animales];

const reproductor = new Audio();

// --- ELEMENTOS DE LA PANTALLA ---
const graficoCentro = document.getElementById('grafico-centro');
const nombreAnimal = document.getElementById('nombre-animal');
const tituloEstado = document.getElementById('titulo-estado');

const btnReproducir = document.getElementById('btn-reproducir');
const btnRevelar = document.getElementById('btn-revelar');
const btnSiguiente = document.getElementById('btn-siguiente');
const contenedorPuntajes = document.getElementById('contenedor-puntajes');

// --- FUNCIONES DEL CONTADOR ---
function renderizarPuntajes() {
    contenedorPuntajes.innerHTML = "";
    Object.keys(puntajes).forEach((id, index) => {
        const equipo = nombresEquipos[id];
        const colorClass = ["btn-primary", "btn-danger", "btn-success", "btn-warning"][index];

        contenedorPuntajes.innerHTML += `
            <div class="col-3 col-md-2">
                <button onclick="sumarPunto('${id}')" class="btn ${colorClass} w-100 shadow-sm p-1">
                    <div class="small fw-bold text-truncate">${equipo.nombre}</div>
                    <div class="h4 m-0">${puntajes[id]}</div>
                </button>
            </div>
        `;
    });
}

function sumarPunto(idEquipo) {
    if (nombreAnimal.classList.contains('d-none')) return; // Evita sumar antes de revelar
    puntajes[idEquipo] += 5;
    renderizarPuntajes();
}

// --- LÓGICA DEL JUEGO ---
function nuevaRonda() {
    // 1. ¿Quedan animales en la bolsa? Si no quedan, terminamos el juego automáticamente
    if (animalesDisponibles.length === 0) {
        alert("¡Se terminaron todos los animales de la ronda! Veamos los resultados...");
        finalizarJuego();
        return; // Frena la función acá para que no busque más animales
    }

    // 2. Elegimos un animal al azar SOLO de los que están disponibles
    const indiceAnimal = Math.floor(Math.random() * animalesDisponibles.length);
    animalActual = animalesDisponibles[indiceAnimal];

    // 3. ¡Lo sacamos de la lista para que no se repita!
    animalesDisponibles.splice(indiceAnimal, 1);

    // 4. Elegimos la variante de audio de ese animal
    const indiceAudio = Math.floor(Math.random() * animalActual.audios.length);
    reproductor.src = animalActual.audios[indiceAudio];

    // 5. Preparamos la pantalla
    graficoCentro.innerText = "❓";
    nombreAnimal.classList.add('d-none');

    // Le agregamos un detallito visual: mostrar cuántos animales quedan
    tituloEstado.innerText = `¿Quién hace este sonido? (Faltan ${animalesDisponibles.length})`;

    btnReproducir.classList.remove('d-none');
    btnReproducir.classList.add('btn-latido');
    btnRevelar.classList.add('d-none');
    btnSiguiente.classList.add('d-none');
}

// Controles de botones
btnReproducir.addEventListener('click', () => {
    if (!animalActual) return;
    reproductor.play().catch(err => console.error("Error al reproducir audio:", err));
    btnReproducir.classList.remove('btn-latido');
    btnRevelar.classList.remove('d-none');
});

btnRevelar.addEventListener('click', () => {
    reproductor.pause();
    graficoCentro.innerText = animalActual.emoji;
    nombreAnimal.innerText = animalActual.nombre;
    nombreAnimal.classList.remove('d-none');
    tituloEstado.innerText = "¡Era el...";

    btnReproducir.classList.add('d-none');
    btnRevelar.classList.add('d-none');
    btnSiguiente.classList.remove('d-none');
});

btnSiguiente.addEventListener('click', () => {
    nuevaRonda();
});

// --- FINALIZAR Y GUARDAR EN EL SALÓN DE LA FAMA ---
// Convertimos el cierre en una función para poder llamarla al final de los animales o si tocás el botón rojo
function finalizarJuego() {
    // 1. Guardamos la foto exacta de los puntos para el podio
    localStorage.setItem('puntajesUltimaPartida', JSON.stringify(puntajes));

    // 2. Buscamos al ganador (Esto ya lo tenías, para guardarlo en el historial general)
    let equipoGanador = "";
    let puntajeMaximo = 0;
    Object.keys(puntajes).forEach(id => {
        if (puntajes[id] > puntajeMaximo) {
            puntajeMaximo = puntajes[id];
            equipoGanador = nombresEquipos[id].nombre;
        }
    });

    if (puntajeMaximo > 0) {
        guardarGanador(equipoGanador, puntajeMaximo, "Adivina el Animal");
    } 
    
    // 3. Llevamos a todos al podio para la celebración
    window.location.href = "podio.html";
}

// Conectamos la función al botón rojo de "Terminar y Guardar"
document.getElementById('btn-finalizar').addEventListener('click', finalizarJuego);

// ¡Arrancamos el juego!
renderizarPuntajes();
nuevaRonda();
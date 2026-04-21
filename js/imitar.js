// --- CONFIGURACIÓN DE EQUIPOS Y PUNTOS ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" },
    equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" },
    equipo4: { nombre: "Equipo 4" }
};

// --- BASE DE DATOS REUTILIZADA ---
const animales = [
    { nombre: "León", emoji: "🦁", audios: ["../assets/sounds/animales/leon/leon.mp3"] },
    { nombre: "Perro", emoji: "🐶", audios: ["../assets/sounds/animales/perro/perro.mp3"] },
    { nombre: "Gato", emoji: "🐱", audios: ["../assets/sounds/animales/gato/gato.mp3"] },
    { nombre: "Vaca", emoji: "🐮", audios: ["../assets/sounds/animales/vaca/vaca.mp3"] },
    { nombre: "Lobo", emoji: "🐺", audios: ["../assets/sounds/animales/lobo/lobo.mp3"] },
    { nombre: "Coscu", emoji: "👑", audios: ["../assets/sounds/animales/coscu/coscu.mp3"] }, // ¡Jajaja excelente este!
    { nombre: "Oveja", emoji: "🐑", audios: ["../assets/sounds/animales/oveja/oveja.mp3"] },
    { nombre: "Pato", emoji: "🦆", audios: ["../assets/sounds/animales/pato/pato.mp3", "../assets/sounds/animales/pato/patov2.mp3"] },
    { nombre: "Elefante", emoji: "🐘", audios: ["../assets/sounds/animales/elefante/elefante.mp3"] },
    { nombre: "Delfín", emoji: "🐬", audios: ["../assets/sounds/animales/delfin/delfin.mp3", "../assets/sounds/animales/delfin/delfinv2.mp3"] },
    { nombre: "Águila", emoji: "🦅", audios: ["../assets/sounds/animales/aguila/aguila.mp3"] },
    { nombre: "Mono", emoji: "🐒", audios: ["../assets/sounds/animales/mono/mono.mp3"] },
    { nombre: "Lechuza", emoji: "🦉", audios: ["../assets/sounds/animales/lechuza/lechuza.mp3"] },
    { nombre: "Oso", emoji: "🐻", audios: ["../assets/sounds/animales/oso/oso.mp3"] },
    { nombre: "Rana", emoji: "🐸", audios: ["../assets/sounds/animales/rana/rana.mp3"] },
    { nombre: "Serpiente", emoji: "🐍", audios: ["../assets/sounds/animales/serpiente/serpiente.mp3"] },
    { nombre: "Pingüino", emoji: "🐧", audios: ["../assets/sounds/animales/pinguino/pinguino.mp3"] },
    { nombre: "Caballo", emoji: "🐴", audios: ["../assets/sounds/animales/caballo/caballo.mp3"] },
    { nombre: "Cerdo", emoji: "🐷", audios: ["../assets/sounds/animales/cerdo/cerdo.mp3"] },
    { nombre: "Gallina", emoji: "🐔", audios: ["../assets/sounds/animales/gallina/gallina.mp3"] }
];

let animalActual = null;
let animalesDisponibles = [...animales];
const reproductor = new Audio();

// --- ELEMENTOS HTML ---
const graficoCentro = document.getElementById('grafico-centro');
const nombreAnimal = document.getElementById('nombre-animal');
const tituloEstado = document.getElementById('titulo-estado');
const btnReproducir = document.getElementById('btn-reproducir');
const btnSiguiente = document.getElementById('btn-siguiente');
const contenedorPuntajes = document.getElementById('contenedor-puntajes');

// --- SISTEMA DE PUNTAJES ---
function renderizarPuntajes() {
    contenedorPuntajes.innerHTML = "";
    Object.keys(puntajes).forEach((id, index) => {
        const equipo = nombresEquipos[id];
        const colorClass = ["btn-primary", "btn-danger", "btn-success", "btn-warning"][index];
        const textColor = ["text-primary", "text-danger", "text-success", "text-warning"][index];
        
        contenedorPuntajes.innerHTML += `
            <div class="col-12 col-md-3">
                <div class="bg-dark p-2 rounded-3 shadow border border-secondary">
                    <div class="small fw-bold text-truncate ${textColor}">${equipo.nombre}</div>
                    <div class="display-6 fw-bold mb-2">${puntajes[id]}</div>
                    <div class="d-flex justify-content-center gap-1">
                        <button onclick="sumarPuntos('${id}', 1)" class="btn ${colorClass} btn-punto">+1</button>
                        <button onclick="sumarPuntos('${id}', 5)" class="btn ${colorClass} btn-punto">+5</button>
                        <button onclick="restarPuntos('${id}', 1)" class="btn btn-outline-secondary btn-punto">-1</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function sumarPuntos(idEquipo, cantidad) {
    puntajes[idEquipo] += cantidad;
    renderizarPuntajes();
}

function restarPuntos(idEquipo, cantidad) {
    puntajes[idEquipo] -= cantidad;
    if(puntajes[idEquipo] < 0) puntajes[idEquipo] = 0; // No bajamos de cero
    renderizarPuntajes();
}

// --- LÓGICA DEL JUEGO ---
function nuevaRonda() {
    if (animalesDisponibles.length === 0) {
        alert("¡Se terminaron todos los animales de la ronda!");
        finalizarJuego();
        return; 
    }

    const indiceAnimal = Math.floor(Math.random() * animalesDisponibles.length);
    animalActual = animalesDisponibles[indiceAnimal];
    animalesDisponibles.splice(indiceAnimal, 1);

    const indiceAudio = Math.floor(Math.random() * animalActual.audios.length);
    reproductor.src = animalActual.audios[indiceAudio];

    // A diferencia del otro juego, acá MOSTRAMOS todo desde el principio
    graficoCentro.innerText = animalActual.emoji;
    nombreAnimal.innerText = animalActual.nombre;
    tituloEstado.innerText = `¡A imitar al... (Faltan ${animalesDisponibles.length})`;
}

// Botones
btnReproducir.addEventListener('click', () => {
    reproductor.play().catch(err => console.error("Error audio:", err));
});

btnSiguiente.addEventListener('click', () => {
    reproductor.pause();
    nuevaRonda();
});

function finalizarJuego() {
    let equipoGanador = "";
    let puntajeMaximo = 0;

    Object.keys(puntajes).forEach(id => {
        if (puntajes[id] > puntajeMaximo) {
            puntajeMaximo = puntajes[id];
            equipoGanador = nombresEquipos[id].nombre;
        }
    });

    if (puntajeMaximo > 0) {
        guardarGanador(equipoGanador, puntajeMaximo, "Imitar Animales");
        alert(`¡Juego finalizado! El ganador es ${equipoGanador} con ${puntajeMaximo} puntos.`);
    } else {
        alert("El juego terminó en empate.");
    }
    window.location.href = "../index.html";
}

document.getElementById('btn-finalizar').addEventListener('click', finalizarJuego);

// Iniciar
renderizarPuntajes();
nuevaRonda();
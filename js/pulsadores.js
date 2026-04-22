// --- CONFIGURACIÓN Y PUNTOS ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" }, equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" }, equipo4: { nombre: "Equipo 4" }
};

// --- BASE DE DATOS MUSICAL (YOUTUBE) ---
const listas = {
    rock: ["5IR5CdvBQPY", "PyTUcj1fGcs", "RvuyfBpytAA", "l-mBu_3rI8g", "YTex-t2cwyQ", "PORH8P2ylPA"],
    pop: [] // Poné tus IDs acá
};

let cancionesDisponibles = [];
let player = null;
let equipoActivo = null;

// NUEVO: Lista negra temporal para los que se equivocan en la misma canción
let equiposBloqueados = []; 

// --- ELEMENTOS DE PANTALLA ---
const btnReproducir = document.getElementById('btn-reproducir');
const mensajeEstado = document.getElementById('mensaje-estado');
const contenedorPulsadores = document.getElementById('contenedor-pulsadores');
const controlesPresentador = document.getElementById('controles-presentador');
const btnSiguiente = document.getElementById('btn-siguiente');
const contadorCanciones = document.getElementById('contador-canciones');
const miniPuntos = document.getElementById('mini-puntos');

// --- 1. CONFIGURACIÓN DE YOUTUBE ---
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '10', width: '10', videoId: '',
        playerVars: { 'playsinline': 1, 'controls': 0 }
    });
}

// --- 2. DIBUJAR INTERFAZ ---
function actualizarUI() {
    miniPuntos.innerHTML = "";
    Object.keys(puntajes).forEach(id => {
        miniPuntos.innerHTML += `<div class="text-white fw-bold">${nombresEquipos[id].nombre}: <span class="text-warning">${puntajes[id]}</span></div>`;
    });

    contenedorPulsadores.innerHTML = "";
    Object.keys(nombresEquipos).forEach((id, index) => {
        const colorClass = ["btn-primary", "btn-danger", "btn-success", "btn-warning"][index];
        contenedorPulsadores.innerHTML += `
            <div class="col-6">
                <button id="pulsador-${id}" onclick="tocarPulsador('${id}')" class="btn ${colorClass} w-100 shadow btn-pulsador bloqueado">
                    ${nombresEquipos[id].nombre}
                </button>
            </div>
        `;
    });
}

// --- 3. LÓGICA DEL JUEGO ---
function iniciarCategoria(cat) {
    cancionesDisponibles = [...listas[cat]];
    document.getElementById('seleccion-categoria').classList.add('d-none');
    document.getElementById('juego-musica').classList.remove('d-none');
    actualizarUI();
    prepararNuevaCancion();
}

function prepararNuevaCancion() {
    if (cancionesDisponibles.length === 0) {
        alert("¡Se terminaron las canciones!");
        finalizarJuego();
        return;
    }

    equipoActivo = null;
    equiposBloqueados = []; // Reiniciamos los bloqueados para que todos puedan jugar la nueva canción
    
    // Asegurarse de que los botones del DJ estén visibles
    document.getElementById('btn-incorrecto').classList.remove('d-none');
    document.getElementById('btn-correcto').classList.remove('d-none');
    
    controlesPresentador.classList.add('d-none');
    btnReproducir.classList.remove('d-none');
    mensajeEstado.innerText = "¡Toquen Reproducir cuando estén listos!";
    mensajeEstado.className = "text-info";
    contadorCanciones.innerText = `Faltan: ${cancionesDisponibles.length} canciones`;

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if(btn) {
            btn.classList.add('bloqueado');
            btn.classList.remove('ganador-ronda');
        }
    });

    const indice = Math.floor(Math.random() * cancionesDisponibles.length);
    const idVideo = cancionesDisponibles[indice];
    cancionesDisponibles.splice(indice, 1);

    if (player && player.loadVideoById) {
        player.loadVideoById(idVideo);
        player.pauseVideo();
    }
}

// Reproducir y HABILITAR pulsadores
btnReproducir.addEventListener('click', () => {
    if (player && player.playVideo) {
        player.playVideo();
        btnReproducir.classList.add('d-none');
        mensajeEstado.innerText = "🎵 Sonando... ¡El primero en saberlo, que pulse!";
        mensajeEstado.className = "text-warning";

        // Desbloqueamos a los que NO están en la lista negra
        Object.keys(nombresEquipos).forEach(id => {
            const btn = document.getElementById(`pulsador-${id}`);
            if(btn && !equiposBloqueados.includes(id)) {
                btn.classList.remove('bloqueado');
            }
        });
    }
});

// ¡ALGUIEN TOCÓ EL BOTÓN!
function tocarPulsador(idEquipo) {
    if(equipoActivo) return; 
    equipoActivo = idEquipo;

    if (player && player.pauseVideo) player.pauseVideo();

    mensajeEstado.innerText = `¡${nombresEquipos[idEquipo].nombre} tiene la palabra!`;
    mensajeEstado.className = "text-success display-6 fw-bold";

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if(id === idEquipo) {
            btn.classList.add('ganador-ronda');
        } else {
            btn.classList.add('bloqueado');
        }
    });

    controlesPresentador.classList.remove('d-none');
}

// --- 4. CONTROLES DEL PRESENTADOR ---
document.getElementById('btn-correcto').addEventListener('click', () => {
    puntajes[equipoActivo] += 10;
    actualizarUI();
    prepararNuevaCancion();
});

document.getElementById('btn-incorrecto').addEventListener('click', () => {
    // Mandamos al que se equivocó a la lista negra
    equiposBloqueados.push(equipoActivo);

    // Revisamos si ya erraron los 4 equipos
    if (equiposBloqueados.length >= 4) {
        mensajeEstado.innerText = "❌ ¡Nadie adivinó! Pasemos a la siguiente.";
        mensajeEstado.className = "text-danger fw-bold";
        equipoActivo = null;
        
        // Escondemos los botones de ✅ y ❌ para obligar al DJ a tocar Siguiente
        document.getElementById('btn-incorrecto').classList.add('d-none');
        document.getElementById('btn-correcto').classList.add('d-none');
        return;
    }

    // Si todavía quedan equipos, hay rebote
    mensajeEstado.innerText = "❌ Incorrecto... ¡REBOTE! Pueden robar los demás.";
    mensajeEstado.className = "text-danger fw-bold";
    
    equipoActivo = null;
    controlesPresentador.classList.add('d-none');
    
    // Acá está la magia: Desbloqueamos al resto, y dejamos bloqueados a los de la lista negra
    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if (btn) {
            btn.classList.remove('ganador-ronda');
            if (equiposBloqueados.includes(id)) {
                btn.classList.add('bloqueado'); // Se equivocó, queda castigado
            } else {
                btn.classList.remove('bloqueado'); // Puede robar
            }
        }
    });

    if (player && player.playVideo) player.playVideo();
});

document.getElementById('btn-siguiente').addEventListener('click', prepararNuevaCancion);

// --- 5. TERMINAR JUEGO Y PODIO ---
function finalizarJuego() {
    localStorage.setItem('puntajesUltimaPartida', JSON.stringify(puntajes));
    
    let maxPuntos = -1; let ganador = "";
    Object.keys(puntajes).forEach(id => {
        if(puntajes[id] > maxPuntos) {
            maxPuntos = puntajes[id];
            ganador = nombresEquipos[id].nombre;
        }
    });

    if(maxPuntos > 0) guardarGanador(ganador, maxPuntos, "Adivina la Canción");
    window.location.href = "podio.html";
}

document.getElementById('btn-finalizar').addEventListener('click', finalizarJuego);
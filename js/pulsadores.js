// --- CONFIGURACIÓN Y PUNTOS ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" }, equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" }, equipo4: { nombre: "Equipo 4" }
};

// --- SONIDOS ---
const sonidoCorrecto = new Audio('../assets/sounds/correcto.mp3');
const sonidoError = new Audio('../assets/sounds/incorrecto.mp3');

let cancionesDisponibles = [];
let player = null;
let equipoActivo = null;
let equiposBloqueados = [];

// --- VARIABLES MODO PLAYLIST (EL DJ JUEGA) ---
let esModoPlaylist = false;
let primerTemaCargado = false;

// --- VARIABLES DEL RELOJ ---
let tiempoRestante = 45;
let intervaloReloj = null;
let tiempoRespuesta = 15;
let intervaloRespuesta = null;

// --- ELEMENTOS ---
const btnReproducir = document.getElementById('btn-reproducir');
const mensajeEstado = document.getElementById('mensaje-estado');
const contenedorPulsadores = document.getElementById('contenedor-pulsadores');
const controlesPresentador = document.getElementById('controles-presentador');
const controlesTiempoAgotado = document.getElementById('controles-tiempo-agotado');
const temporizadorDisplay = document.getElementById('temporizador-display');
const miniPuntos = document.getElementById('mini-puntos');
const respuestaSecreta = document.getElementById('respuesta-secreta');
const contenedorReproductor = document.getElementById('contenedor-reproductor');

// --- INICIALIZACIÓN YOUTUBE (CON ANTI-TRAMPAS Y RELOJ AUTOMÁTICO) ---
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '315', width: '100%', videoId: '',
        playerVars: { 'playsinline': 1, 'controls': 0, 'disablekb': 1, 'showinfo': 0, 'rel': 0 },
        events: {
            'onStateChange': function(event) {
                // Arranca el reloj SOLO cuando el video realmente empieza a sonar
                if (event.data == YT.PlayerState.PLAYING && tiempoRestante == 45 && !equipoActivo) {
                    iniciarReloj();
                }
            }
        }
    });
}

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

// --- 1. MODO CLÁSICO ---
function iniciarCategoria(cat) {
    if (!listas[cat] || listas[cat].length === 0) {
        alert("Aún no hay canciones cargadas en esta categoría.");
        return;
    }
    esModoPlaylist = false;
    cancionesDisponibles = [...listas[cat]];
    document.getElementById('seleccion-categoria').classList.add('d-none');
    document.getElementById('juego-musica').classList.remove('d-none');
    actualizarUI();
    prepararNuevaCancion();
}

// --- 2. MODO PLAYLIST (Vos jugás) ---
function chequearPlaylistCargada() {
    if (player && player.getPlaylist && player.getPlaylist() && player.getPlaylist().length > 0) {
        player.setShuffle(true);
        player.nextVideo();
        setTimeout(() => {
            if (typeof player.pauseVideo === 'function') player.pauseVideo();
            primerTemaCargado = false;
            prepararNuevaCancion();
        }, 1000);
    } else {
        // Validación recursiva si el internet está lento
        setTimeout(chequearPlaylistCargada, 500);
    }
}

window.iniciarConPlaylist = function () {
    const url = document.getElementById('link-playlist').value;
    const match = url.match(/[?&]list=([^#\&\?]+)/);

    if (!match) {
        alert("El link no parece válido. Asegurate que tenga 'list=...' en la dirección.");
        return;
    }

    esModoPlaylist = true;
    primerTemaCargado = true;

    const modalElement = document.getElementById('modalPlaylist');
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.hide();

    document.getElementById('seleccion-categoria').classList.add('d-none');
    document.getElementById('juego-musica').classList.remove('d-none');
    actualizarUI();

    if(player && typeof player.loadPlaylist === 'function') {
        player.loadPlaylist({ list: match[1], listType: 'playlist' });
        mensajeEstado.innerText = "Preparando y mezclando lista secreta...";
        mensajeEstado.className = "text-warning";
        btnReproducir.classList.add('d-none');
        chequearPlaylistCargada();
    } else {
        alert("El reproductor de YouTube aún no ha cargado. Intenta de nuevo.");
    }
}

// --- PREPARAR LA CANCIÓN ---
function prepararNuevaCancion() {
    if (!esModoPlaylist && cancionesDisponibles.length === 0) {
        alert("¡Se terminaron las canciones!");
        finalizarJuego();
        return;
    }

    // --- NUEVO: Resetear el escudo anti-trampas ---
    const btnRevelarNombre = document.getElementById('btn-revelar-nombre');
    const contenedorRespuesta = document.getElementById('contenedor-respuesta-secreta');
    if(btnRevelarNombre && contenedorRespuesta) {
        btnRevelarNombre.classList.remove('d-none'); // Muestra el botón
        contenedorRespuesta.classList.add('d-none'); // Oculta el texto
    }

    contenedorReproductor.className = "reproductor-fantasma mb-3";
    equipoActivo = null;
    equiposBloqueados = [];
    pausarReloj();
    clearInterval(intervaloRespuesta);

    tiempoRestante = 45;
    temporizadorDisplay.innerText = tiempoRestante;
    temporizadorDisplay.classList.add('d-none');

    document.getElementById('btn-artista').classList.remove('d-none');
    document.getElementById('btn-melodia').classList.remove('d-none');
    controlesPresentador.classList.add('d-none');
    controlesTiempoAgotado.classList.add('d-none');

    if (!primerTemaCargado) {
        btnReproducir.classList.remove('d-none');
        mensajeEstado.innerText = "¡Toquen Reproducir cuando estén listos!";
        mensajeEstado.className = "text-info";
    }

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if (btn) {
            btn.classList.add('bloqueado');
            btn.classList.remove('ganador-ronda');
        }
    });

    if (esModoPlaylist) {
        if (respuestaSecreta) respuestaSecreta.innerText = "🎧 Modo Playlist Secreto\n(Tocá 'Mostrar Video' para revelar la respuesta).";

        if (!primerTemaCargado && typeof player.nextVideo === 'function') {
            player.nextVideo();
            setTimeout(() => { if(typeof player.pauseVideo === 'function') player.pauseVideo(); }, 500);
        }
    } else {
        const indice = Math.floor(Math.random() * cancionesDisponibles.length);
        const cancionActualInfo = cancionesDisponibles[indice];
        cancionesDisponibles.splice(indice, 1);

        let idVideo = typeof cancionActualInfo === 'object' ? cancionActualInfo.id : cancionActualInfo;
        let nombreParaMostrar = typeof cancionActualInfo === 'object' ? cancionActualInfo.nombre : `ID: ${idVideo}`;
        let tiempoInicio = (typeof cancionActualInfo === 'object' && cancionActualInfo.startSeconds) ? cancionActualInfo.startSeconds : 0;

        if (respuestaSecreta) respuestaSecreta.innerText = `${nombreParaMostrar}`;

        // Usamos cueVideoById para precargar sin que empiece a sonar ni un milisegundo
        if (player && typeof player.cueVideoById === 'function') {
            player.cueVideoById({ videoId: idVideo, startSeconds: tiempoInicio });
        }
    }
}

// BOTÓN MÁGICO: Revelar el video en pantalla
document.getElementById('btn-revelar-video').addEventListener('click', () => {
    contenedorReproductor.className = "reproductor-visible mb-3";
    if (player && typeof player.playVideo === 'function') player.playVideo();
    mensajeEstado.innerText = "¡AQUÍ ESTÁ LA RESPUESTA!";
    mensajeEstado.className = "text-info display-6 fw-bold";
});

// --- LÓGICA DE LOS RELOJES ---
function iniciarReloj() {
    clearInterval(intervaloReloj);
    temporizadorDisplay.classList.remove('d-none', 'text-danger');

    intervaloReloj = setInterval(() => {
        tiempoRestante--;
        temporizadorDisplay.innerText = tiempoRestante;

        if (tiempoRestante <= 10) temporizadorDisplay.classList.add('text-danger');
        if (tiempoRestante <= 0) dispararTiempoAgotado();
    }, 1000);
}

function pausarReloj() {
    clearInterval(intervaloReloj);
}

function dispararTiempoAgotado() {
    pausarReloj();
    clearInterval(intervaloRespuesta);

    if (player && typeof player.pauseVideo === 'function') player.pauseVideo();

    mensajeEstado.innerText = "¡SE ACABÓ EL TIEMPO!";
    mensajeEstado.className = "text-danger display-6 fw-bold";

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if (btn) btn.classList.add('bloqueado');
    });

    controlesPresentador.classList.add('d-none');
    btnReproducir.classList.add('d-none');

    document.getElementById('respuesta-tiempo-agotado').innerText = respuestaSecreta.innerText;

    const botonesCerca = document.getElementById('botones-mas-cerca');
    botonesCerca.innerHTML = "";
    Object.keys(nombresEquipos).forEach(id => {
        const colorClass = ["btn-outline-primary", "btn-outline-danger", "btn-outline-success", "btn-outline-warning"][Object.keys(nombresEquipos).indexOf(id)];
        botonesCerca.innerHTML += `<button class="btn ${colorClass} fs-3 p-3 shadow" onclick="asignarPuntosCerca('${id}')">${nombresEquipos[id].nombre}</button>`;
    });

    controlesTiempoAgotado.classList.remove('d-none');

    if (esModoPlaylist) {
        contenedorReproductor.className = "reproductor-visible mb-3";
    }
}

window.asignarPuntosCerca = function (idEquipo) {
    puntajes[idEquipo] += 2;
    actualizarUI();
    prepararNuevaCancion();
}

document.getElementById('btn-nadie-cerca').addEventListener('click', prepararNuevaCancion);

btnReproducir.addEventListener('click', () => {
    btnReproducir.classList.add('d-none');
    mensajeEstado.innerText = "🎵 Sonando... ¡El primero en saberlo, que pulse!";
    mensajeEstado.className = "text-warning";

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if (btn && !equiposBloqueados.includes(id)) {
            btn.classList.remove('bloqueado');
        }
    });

    setTimeout(() => {
        contenedorPulsadores.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);

    if (player && typeof player.playVideo === 'function') player.playVideo();
});

// ¡ALGUIEN TOCÓ EL BOTÓN!
function tocarPulsador(idEquipo) {
    if (equipoActivo) return;
    equipoActivo = idEquipo;

    pausarReloj();
    clearInterval(intervaloRespuesta);

    if (player && typeof player.pauseVideo === 'function') player.pauseVideo();

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if (id === idEquipo) {
            btn.classList.add('ganador-ronda');
        } else {
            btn.classList.add('bloqueado');
        }
    });

    controlesPresentador.classList.remove('d-none');
    tiempoRespuesta = 15;

    mensajeEstado.innerHTML = `¡${nombresEquipos[idEquipo].nombre} tiene la palabra!<br><span class="text-white display-3">⏳ <span id="reloj-respuesta">15</span></span>`;
    mensajeEstado.className = "text-success display-6 fw-bold";

    intervaloRespuesta = setInterval(() => {
        tiempoRespuesta--;
        const spanReloj = document.getElementById('reloj-respuesta');
        if (spanReloj) spanReloj.innerText = tiempoRespuesta;

        if (tiempoRespuesta <= 0) {
            procesarError();
        }
    }, 1000);

    setTimeout(() => {
        controlesPresentador.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
}

function procesarError() {
    clearInterval(intervaloRespuesta);
    sonidoError.play().catch(e => console.log(e));
    puntajes[equipoActivo] -= 2;
    actualizarUI();

    equiposBloqueados.push(equipoActivo);

    if (equiposBloqueados.length >= 4) {
        dispararTiempoAgotado();
        return;
    }

    mensajeEstado.innerHTML = "❌ Incorrecto o ¡Tiempo Agotado! (-2 pts)<br>¡REBOTE!";
    mensajeEstado.className = "text-danger fw-bold";

    equipoActivo = null;
    controlesPresentador.classList.add('d-none');

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if (btn) {
            btn.classList.remove('ganador-ronda');
            if (equiposBloqueados.includes(id)) {
                btn.classList.add('bloqueado');
            } else {
                btn.classList.remove('bloqueado');
            }
        }
    });

    if (player && typeof player.playVideo === 'function') player.playVideo();
}

// --- SISTEMA DE PUNTOS DINÁMICO ---
document.getElementById('btn-exacto').addEventListener('click', () => {
    clearInterval(intervaloRespuesta);
    sonidoCorrecto.play().catch(e => console.log(e));
    puntajes[equipoActivo] += 10;
    actualizarUI();
    prepararNuevaCancion();
});

function continuarRonda(puntos, botonId) {
    clearInterval(intervaloRespuesta);
    sonidoCorrecto.play().catch(e => console.log(e));
    puntajes[equipoActivo] += puntos;
    actualizarUI();

    document.getElementById(botonId).classList.add('d-none');

    mensajeEstado.innerText = "¡Bien! Pero falta el nombre... ¡Sigue sonando!";
    mensajeEstado.className = "text-warning";

    equipoActivo = null;
    controlesPresentador.classList.add('d-none');

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if (btn) {
            btn.classList.remove('ganador-ronda');
            if (!equiposBloqueados.includes(id)) {
                btn.classList.remove('bloqueado');
            }
        }
    });

    contenedorReproductor.className = "reproductor-fantasma mb-3";

    if (player && typeof player.playVideo === 'function') player.playVideo();
}

document.getElementById('btn-artista').addEventListener('click', () => continuarRonda(7, 'btn-artista'));
document.getElementById('btn-melodia').addEventListener('click', () => continuarRonda(5, 'btn-melodia'));
document.getElementById('btn-incorrecto').addEventListener('click', procesarError);
document.getElementById('btn-siguiente').addEventListener('click', prepararNuevaCancion);

// --- FINALIZAR ---
function finalizarJuego() {
    localStorage.setItem('puntajesUltimaPartida', JSON.stringify(puntajes));

    let maxPuntos = -1; let ganador = "";
    Object.keys(puntajes).forEach(id => {
        if (puntajes[id] > maxPuntos) {
            maxPuntos = puntajes[id];
            ganador = nombresEquipos[id].nombre;
        }
    });

    if (maxPuntos > 0) typeof guardarGanador === 'function' ? guardarGanador(ganador, maxPuntos, "Adivina la Canción") : null;
    window.location.href = "podio.html";
}

document.getElementById('btn-finalizar').addEventListener('click', finalizarJuego);

// --- ANTI-TRAMPA: Evento para revelar texto del nombre ---
// Se ejecuta al final para asegurar que el DOM cargó
const btnRevelarNombreDOM = document.getElementById('btn-revelar-nombre');
const contenedorRespuestaDOM = document.getElementById('contenedor-respuesta-secreta');

if (btnRevelarNombreDOM) {
    btnRevelarNombreDOM.addEventListener('click', () => {
        btnRevelarNombreDOM.classList.add('d-none');
        if (contenedorRespuestaDOM) contenedorRespuestaDOM.classList.remove('d-none');
    });
}
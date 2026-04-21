// --- NOMBRES DE EQUIPOS DESDE EL MENÚ ---
const datosGuardados = JSON.parse(localStorage.getItem('configJuego'));
if (datosGuardados) {
    document.querySelector('#btn-team-1 h2').innerText = datosGuardados.equipo1.nombre;
    document.querySelector('#btn-team-2 h2').innerText = datosGuardados.equipo2.nombre;
    document.querySelector('#btn-team-3 h2').innerText = datosGuardados.equipo3.nombre;
    document.querySelector('#btn-team-4 h2').innerText = datosGuardados.equipo4.nombre;
}

// --- EFECTO DE SONIDO ---
const sonidoAplausos = new Audio("../assets/sounds/corneta.wav");

// --- YOUTUBE Y SHUFFLE ---
function mezclar(lista) {
    let mezclada = [...lista];
    for (let i = mezclada.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mezclada[i], mezclada[j]] = [mezclada[j], mezclada[i]];
    }
    return mezclada;
}

const listas = {
    rock: ["dQw4w9WgXcQ"], 
    romantica: ["k2qgadSvNyU", "V_Yv-e1KkO4", "8h_7U-k8F_4", "VvP6GfM9Zk8", "8_896339798"],
    popAnglo: ["tQ0yjYUFKAE", "T4ncnt-Hl5U", "pB-5XG-DbAA", "pHHUv1n-U20", "f_896339798"],
    popArg: ["8_896339800", "R_0R_0R_0R_2", "w8896339801", "v8896339802", "f_896339799"]
};

let player;
let categoriaActual = 'rock';
let playlistYouTube = mezclar(listas[categoriaActual]);
let indiceCancion = 0;

window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('yt-player', {
        height: '200', 
        width: '300',
        videoId: playlistYouTube[indiceCancion],
        playerVars: {
            'playsinline': 1,
            'origin': window.location.origin 
        }
    });
}

// --- CONTROLES DEL DJ ---
const btnPlayMusica = document.getElementById('btn-play-musica');
const btnNextMusica = document.getElementById('btn-next-musica');
const selectorGenero = document.getElementById('selector-genero');

selectorGenero.addEventListener('change', (evento) => {
    categoriaActual = evento.target.value;
    playlistYouTube = mezclar(listas[categoriaActual]); 
    indiceCancion = 0;
    if (player) {
        player.loadVideoById(playlistYouTube[indiceCancion]);
        player.pauseVideo();
        btnPlayMusica.innerText = "▶️";
        reiniciarRondaCancion();
    }
});

btnPlayMusica.addEventListener('click', () => {
    if (!player) return; 
    
    if (player.getPlayerState() === 1) { 
        player.pauseVideo(); 
        btnPlayMusica.innerText = "▶️";
    } else {
        player.unMute();
        player.setVolume(100);
        player.playVideo(); 
        btnPlayMusica.innerText = "⏸️";
    }
});

btnNextMusica.addEventListener('click', () => {
    if (!player) return;
    indiceCancion++;
    if (indiceCancion >= playlistYouTube.length) indiceCancion = 0;
    player.loadVideoById(playlistYouTube[indiceCancion]);
    btnPlayMusica.innerText = "⏸️";
    reiniciarRondaCancion();
});

// --- LÓGICA DEL JUEGO Y PULSADORES ---
const pulsadores = document.querySelectorAll('.pulsador');
const btnCorrecto = document.getElementById('btn-correcto');
const btnIncorrecto = document.getElementById('btn-incorrecto');

let juegoPausado = false;
let jugadorActual = null;
let puntajes = { 'btn-team-1': 0, 'btn-team-2': 0, 'btn-team-3': 0, 'btn-team-4': 0 };

function actualizarPantallaPuntajes() {
    pulsadores.forEach(boton => { boton.querySelector('span').innerText = `${puntajes[boton.id]} pts`; });
}

function tocarPulsador(evento) {
    const botonPresionado = evento.currentTarget;
    if (juegoPausado || botonPresionado.classList.contains('eliminado')) return;

    juegoPausado = true;
    jugadorActual = botonPresionado;

    // Pausa la música si está sonando
    if (player && player.getPlayerState() === 1) {
        player.pauseVideo();
        btnPlayMusica.innerText = "▶️";
    }

    pulsadores.forEach(btn => { if (btn !== botonPresionado) btn.classList.add('bloqueado'); });
    botonPresionado.classList.add('respondiendo');
}

btnIncorrecto.addEventListener('click', () => {
    if (!jugadorActual) return;
    puntajes[jugadorActual.id] -= 5;
    actualizarPantallaPuntajes();
    jugadorActual.classList.remove('respondiendo');
    jugadorActual.classList.add('eliminado');
    juegoPausado = false;
    jugadorActual = null;
    pulsadores.forEach(btn => { if (!btn.classList.contains('eliminado')) btn.classList.remove('bloqueado'); });
});

btnCorrecto.addEventListener('click', () => {
    if (!jugadorActual) return;
    puntajes[jugadorActual.id] += 10;
    actualizarPantallaPuntajes();
    
    // Acá suenan los aplausos al darle al Correcto
    sonidoAplausos.play().catch(e => console.log("Error audio:", e));
    
    reiniciarRondaCancion();
});

function reiniciarRondaCancion() {
    juegoPausado = false;
    jugadorActual = null;
    pulsadores.forEach(btn => { btn.classList.remove('bloqueado', 'respondiendo', 'eliminado'); });
}

pulsadores.forEach(boton => boton.addEventListener('pointerdown', tocarPulsador));
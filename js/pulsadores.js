// --- CONFIGURACIÓN Y PUNTOS ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" }, equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" }, equipo4: { nombre: "Equipo 4" }
};

// --- BASE DE DATOS MUSICAL (ACEPTA OBJETOS O IDS SOLOS) ---
const listas = {
    rock: [
        { id: "5IR5CdvBQPY", nombre: "Foo Fighters - The Pretender" }, 
        { id: "PyTUcj1fGcs", nombre: "Red Hot Chili Peppers - Californication" },
        { id: "wvAIn53VhMA", nombre: "Soda Stereo - Profugos" },
        { id: "zd16sFhTUdg", nombre: "No Te Va Gustar - A Las 9" },
         "l-mBu_3rI8g", "YTex-t2cwyQ", "PORH8P2ylPA", "F3IVCSrj0CM", "7JlpB4YkB7s", "uJcbNtW-R3Y", "ezlpwCLgiE8", "P0kwvtEP59M", "kLzICexlPzU", "gflJjn2ZBcM", "NQA8wiPLUFU", "2Cql8mG4kWM", "zd16sFhTUdg", "Ng2hpTKrzHQ"
    ],
    pop: [
        "zgaCZOQCpp8", "lZEf_izPCfY", "lwOuEq_FoOo", "htk6MRjmcnQ", "Gq-ekgeVGaA", "uYgutBxT8ps", "XpjwYvRryCI", "d2Tu9ctifx4", "2I9eC2MRhto", "pUanlyF510I", "y1HpchKTO4k", "BHIpvqhydLo", "iawgB2CDCrw", "xzVO_1CcwvA", "ipLRRzJ9sWg", "dFp_b5DPIIo", "tdKmewyZPXE", "QC2FoaT7Yb8", "xzNliaWxdjM", "WHHkVUaOxe4", "QvvhiIevsX8", "KxnpFKZowcs", "mgT0N3tMP74", "u7XjPmN-tHw", "O1TFUEMzTvE", "0Ui-QzihJGo", "LhZ5GXCZtEw", "nNcDkT_AoHQ", "BerNfXSuvJ0", "UsuF4jJ4sgA"
    ], 
    los8090s: [
        "Gd6CtzYpDBs", "hGPL5rzd3tQ", "LtDlfPYzs38", "qoflJn7zkFM", "cZid3J36wH8", "LPr3N4AMXNQ", "l589L_xRycA", "aXf7Iw_hB14", "CP3sn7T0rxY"
    ],
    pendejada: [
        "TUsu2pm4294", "_n74F4xX69U", "yA8I9WId1pQ", "9_IAt4A4p6c", "rZ5W2D_hJm0", "2y-W_D1H4G0", "37aA5M_898g", "C2q6zX98R0g", "vzMQFScqsiY", "YVHQm41_A5g", "LV7szERrKPk", "XeqYwllPQyk", "S71L0V47p2o", "G9bF5X7d9aI", "Z8v4S7X2m9Q", "P2k5W4V1m8L", "L3v9S2M4p7X", "H4m8S3V2k1P", "J8n2V4M6k9L", "S4m1K9V2p3L", "P7v2M5X4k1L", "M2n8V4S1k3P", "K9m4S7V2p5L"
    ]
};

let cancionesDisponibles = [];
let player = null;
let equipoActivo = null;
let equiposBloqueados = []; 

// --- ELEMENTOS DE PANTALLA ---
const btnReproducir = document.getElementById('btn-reproducir');
const mensajeEstado = document.getElementById('mensaje-estado');
const contenedorPulsadores = document.getElementById('contenedor-pulsadores');
const controlesPresentador = document.getElementById('controles-presentador');
const btnSiguiente = document.getElementById('btn-siguiente');
const contadorCanciones = document.getElementById('contador-canciones');
const miniPuntos = document.getElementById('mini-puntos');
const respuestaSecreta = document.getElementById('respuesta-secreta');

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
    equiposBloqueados = []; 
    
    document.getElementById('btn-incorrecto').classList.remove('d-none');
    document.getElementById('btn-correcto').classList.remove('d-none');
    
    controlesPresentador.classList.add('d-none');
    btnReproducir.classList.remove('d-none'); // Muestra el botón de Play
    mensajeEstado.innerText = "¡Toquen Reproducir cuando estén listos!";
    mensajeEstado.className = "text-info";
    contadorCanciones.innerText = `Faltan: ${cancionesDisponibles.length} canciones`;

    // Bloqueamos los botones hasta que suene la música
    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if(btn) {
            btn.classList.add('bloqueado');
            btn.classList.remove('ganador-ronda');
        }
    });

    const indice = Math.floor(Math.random() * cancionesDisponibles.length);
    const cancionActualInfo = cancionesDisponibles[indice];
    cancionesDisponibles.splice(indice, 1);

    let idVideo = "";
    let nombreParaMostrar = "";

    if (typeof cancionActualInfo === 'object') {
        idVideo = cancionActualInfo.id;
        nombreParaMostrar = cancionActualInfo.nombre;
    } else {
        idVideo = cancionActualInfo;
        nombreParaMostrar = `ID: ${idVideo} (Sin nombre)`;
    }

    if (respuestaSecreta) {
        respuestaSecreta.innerText = `🎵 Respuesta: ${nombreParaMostrar}`;
    }

    console.log("-----------------------------------");
    console.log("🎶 REPRODUCIENDO: " + nombreParaMostrar);
    console.log("🔗 LINK YOUTUBE: https://www.youtube.com/watch?v=" + idVideo);
    console.log("-----------------------------------");

    if (player && player.loadVideoById) {
        player.loadVideoById(idVideo);
        player.pauseVideo();
    }
}

// BOTÓN REPRODUCIR (A prueba de fallos)
btnReproducir.addEventListener('click', () => {
    // 1. Ocultamos el botón de reproducir
    btnReproducir.classList.add('d-none');
    
    // 2. Cambiamos el texto
    mensajeEstado.innerText = "🎵 Sonando... ¡El primero en saberlo, que pulse!";
    mensajeEstado.className = "text-warning";

    // 3. Desbloqueamos los pulsadores de colores para que puedan jugar
    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if(btn && !equiposBloqueados.includes(id)) {
            btn.classList.remove('bloqueado');
        }
    });

    // 4. Le damos Play a YouTube
    try {
        if (player && player.playVideo) {
            player.playVideo();
        }
    } catch (e) {
        console.log("El reproductor aún no está listo.");
    }
});

// ¡ALGUIEN TOCÓ EL BOTÓN!
function tocarPulsador(idEquipo) {
    if(equipoActivo) return; 
    equipoActivo = idEquipo;

    try {
        if (player && player.pauseVideo) player.pauseVideo();
    } catch(e){}

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
    equiposBloqueados.push(equipoActivo);

    if (equiposBloqueados.length >= 4) {
        mensajeEstado.innerText = "❌ ¡Nadie adivinó! Pasemos a la siguiente.";
        mensajeEstado.className = "text-danger fw-bold";
        equipoActivo = null;
        document.getElementById('btn-incorrecto').classList.add('d-none');
        document.getElementById('btn-correcto').classList.add('d-none');
        return;
    }

    mensajeEstado.innerText = "❌ Incorrecto... ¡REBOTE! Pueden robar los demás.";
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

    try {
        if (player && player.playVideo) player.playVideo();
    } catch(e){}
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
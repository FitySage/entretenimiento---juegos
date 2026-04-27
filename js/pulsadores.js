// --- CONFIGURACIÓN Y PUNTOS ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" }, equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" }, equipo4: { nombre: "Equipo 4" }
};

// --- BASE DE DATOS MUSICAL ---
const listas = {
    rock: [
        { id: "5IR5CdvBQPY", nombre: "Los Abuelos De La Nada - Mil Horas" },
        { id: "wvAIn53VhMA", nombre: "Soda Stereo - Profugos" },
        { id: "zd16sFhTUdg", nombre: "No Te Va Gustar - A Las 9" },
        { id: "YTex-t2cwyQ", nombre: "Divididos - Spaghetti Del Rock" },
        { id: "kLzICexlPzU", nombre: "Callejeros - Una Nueva Noche Fría" },
        { id: "2Cql8mG4kWM", nombre: "Attaque 77 - Arrancacorazones" },
        { id: "PyTUcj1fGcs", nombre: "Charly García - Nos Siguen Pegando Abajo" },
        { id: "NQA8wiPLUFU", nombre: "Los Pericos - Complicado y Aturdido" },
        { id: "Ng2hpTKrzHQ", nombre: "Gustavo Cordera - La Bomba Loca" },
        { id: "P0kwvtEP59M", nombre: "Callejeros - 9 de Julio" },
        { id: "gflJjn2ZBcM", nombre: "La Mancha de Rolando - Arde la Ciudad" },
        { id: "PORH8P2ylPA", nombre: "Enanitos Verdes - Tu Carcel" },
        { id: "F3IVCSrj0CM", nombre: "Bersuit Vergarabat - Un pacto para vivir" },
        { id: "7JlpB4YkB7s", nombre: "Intoxicados - Nunca Quise" },
        { id: "ezlpwCLgiE8", nombre: "Callejeros - Creo" },
        { id: "uJcbNtW-R3Y", nombre: "Intoxicados - Está saliendo el Sol" },
        { id: "l-mBu_3rI8g", nombre: "Rata Blanca - Mujer Amante" },
        { id: "Jf_Ach2THWs", nombre: "Los Piojos - El Farolito" },
        { id: "Kg2mJM2K8eY", nombre: "Airbag - Cae el sol " },
        { id: "CKAm-6HpHlQ", nombre: "La Renga - La Balada del Diablo y La Muerte" },
        { id: "OYIozwmhYKk", nombre: "Catupecumachu - Eso Vive" },
        { id: "g6jTHRSaPPQ", nombre: "Maná - Rayando El Sol" },
        { id: "VwTQ6Mt2kt4", nombre: "Soda Stereo - De Música Ligera" },
        { id: "vZFAZbZeWsQ", nombre: "Hombres G - Devuélveme a mi chica" },
        { id: "zIW8uHgaghQ", nombre: "Enanitos Verdes - Lamento Boliviano" },
    ],
    pop: [
        { id: "WHHkVUaOxe4", nombre: "Ariana Grande - Into You" },
        { id: "QvvhiIevsX8", nombre: "Teddy Swim - Lose Control" },
        { id: "y1HpchKTO4k", nombre: "Benson Boone - Slow Down" },
        { id: "mgT0N3tMP74", nombre: "One Republic - Counting Stars" },
        { id: "xzNliaWxdjM", nombre: "Harry Styles - Adore You" },
        { id: "0Ui-QzihJGo", nombre: "Justin Timberlake - Can't Stop The Feeling" },
        { id: "LhZ5GXCZtEw", nombre: "Bruno Mars - 24K Magic" },
        { id: "u7XjPmN-tHw", nombre: "Bruno Mars - Just The Way You Are" },
        { id: "QC2FoaT7Yb8", nombre: "The Weeknd - I Can't Feel My Face" },
        { id: "zgaCZOQCpp8", nombre: "Bruno Mars & Lady Gaga -  Die With a Smile" },
        { id: "tdKmewyZPXE", nombre: "Jonas Brothers - Sucker" },
        { id: "nNcDkT_AoHQ", nombre: "Ariana Grande - No Tears Left To Cry" },
        { id: "xzVO_1CcwvA", nombre: "Marsmello & Halsey - Be Kind" },
        { id: "lwOuEq_FoOo", nombre: "Lady Gaga - Abracadabra" },
        { id: "O1TFUEMzTvE", nombre: "Dua Lipa - New Rules" },
        { id: "pUanlyF510I", nombre: "Ariana Grande - We Cant Be Friends" },
        { id: "BHIpvqhydLo", nombre: "Dua Lipa - Houdini" },
        { id: "iawgB2CDCrw", nombre: "Miley Cyrus - Flower" },
        { id: "d2Tu9ctifx4", nombre: "Taylor Swift - Opalite" },
        { id: "htk6MRjmcnQ", nombre: "Kpop Demon Hunters - Golden" },
        { id: "2I9eC2MRhto", nombre: "Sabrina Carpenter - Espresso" },
        { id: "XpjwYvRryCI", nombre: "Bruno Mars & Rosé - APT" },
        { id: "KxnpFKZowcs", nombre: "David Guetta & Sia - Titanium" },
        { id: "uYgutBxT8ps", nombre: "Sabrina Carpenter - Manchild" },
        { id: "ipLRRzJ9sWg", nombre: "Calvin Harris & Rihanna - This Is What You Came For" },
        { id: "BerNfXSuvJ0", nombre: "Justin Bieber - Sorry" },
        { id: "UsuF4jJ4sgA", nombre: "Imagine Dragons - Werever it Takes" },
        { id: "lZEf_izPCfY", nombre: "Taylor Swift - Fate of Ophelia" },
        { id: "Gq-ekgeVGaA", nombre: "Benson Boone - Beautiful Things" },
        { id: "dFp_b5DPIIo", nombre: "Shawn Mendes & Camila Cabello - Señorita" },
        { id: "nAQ_1lTDvPQ", nombre: "Taylor Swift - Blank Space" },
        { id: "liTfD88dbCo", nombre: "Ed Sheeran - Shape of You" },
        { id: "SyuRxUKDJjI", nombre: "Adele - Someone You Loved" },
        { id: "0pAkIrJfwao", nombre: "Justin Bieber - Yummy" },
        { id: "OED5AZhbskk", nombre: "Rihanna - Work" },
        { id: "8CLkVWB_Lj8", nombre: "Dua Lipa - Don't Start Now" },
        { id: "4-TbQnONe_w", nombre: "Billie Eilish - bad guy" },
        { id: "XwxLwG2_Sxk", nombre: "The Weeknd - Blinding Lights" },
        { id: "0xgaqhe5QiM", nombre: "Shawn Mendes - Treat You Better" },
        { id: "N1BcpzPGlYQ", nombre: "Maroon 5 - Sugar" },
        { id: "mwL1cohnHNE", nombre: "Katy Perry - Roar" },
        { id: "4S_vclBlGZo", nombre: "Lady Gaga - Born This Way" },
        { id: "W0DM5lcj6mw", nombre: "Imagine Dragons - Believer" },
        { id: "oovLd9xbr8Y", nombre: "Eminem - Mockingbird" },
        { id: "YmAQbZYu8Ho", nombre: "Linkin Park - In the End" },
        { id: "NNMUuJWRyxc", nombre: "Green Day - American Idiot" },
        { id: "tmIO0eSAXrw", nombre: "Olivia Rodrigo - Good for You" },
        { id: "47EG91_XHic", nombre: "Carly Rae Jepsen - Call Me Maybe" },
        { id: "U-3-bwPvfmg", nombre: "Eminem & Rihanna - Love The Way You Lie" },
        { id: "35fPCcsbZYU", nombre: "Vilma Palma e Vampiros - Bye Bye" },
        { id: "doJbORheLzw", nombre: "Gotye ft. Kimbra - Somebody That I Used Know" },
    ],
    los8090s: [
        { id: "hGPL5rzd3tQ", nombre: "A-ha - Take On Me" },
        { id: "igDP_5KqF_o", nombre: "Michael Jackson - Billie Jean" },
        { id: "RYPAmRgSnpY", nombre: "Cyndi Lauper - Girls Just Want To Have Fun" },
        { id: "NbSzTi0d6pQ", nombre: "Oasis - Wonderwall" },
        { id: "5xp4422MXIw", nombre: "R.E.M. - Losing My Religion" },
        { id: "sBspSJWRT2E", nombre: "Queen - Bohemian Rhapsody (1975/80s Hit)" },
        { id: "oKWPYxXkAS0", nombre: "Whitney Houston - I Wanna Dance With Somebody" },
        { id: "UvFiCV4g4K0", nombre: "Survivor - Eye of the Tiger" },
        { id: "qjlVAsvQLM8", nombre: "Backstreet Boys - I Want It That Way" },
        { id: "kAJz7c97Cyo", nombre: "Britney Spears - ...Baby One More Time" },
        { id: "cZid3J36wH8", nombre: "Europe - The Final Countdown" },
        { id: "Gd6CtzYpDBs", nombre: "Guns N' Roses - November Rain" },
        { id: "LPr3N4AMXNQ", nombre: "The Police - Every Breath You Take" },
        { id: "qoflJn7zkFM", nombre: "Guns N' Roses - Sweet Child O' Mine" },
        { id: "LtDlfPYzs38", nombre: "Nirvana - Smells Like Teen Spirit" },
        { id: "l589L_xRycA", nombre: "Aerosmith - Crazy" },
        { id: "CP3sn7T0rxY", nombre: "Guns N' Roses - Welcome To The Jungle" },
        { id: "aXf7Iw_hB14", nombre: "Extreme - More Than Words" }

    ],
    pendejada: [ 
    ],
    Disney: [
        { id: "8cZJ_wPpBJg", nombre: "El Rey León - El Ciclo Sin Fin" },
        { id: "2tKPGsm_5-Y", nombre: "Aladdin - Un Mundo Ideal" },
        { id: "kY7mwb3EhbM", nombre: "La Bella y la Bestia - Bella y Bestia son" },
        { id: "abvdJHtkf-Q", nombre: "Frozen - Libre Soy" },
        { id: "WpGMW-gLC2E", nombre: "Toy Story - Yo soy tu amigo fiel" },
        { id: "9x0AakpY0HE", nombre: "Mulan - Hombres de Acción" },
        { id: "tyhkJwkwLKg", nombre: "La Sirenita - Bajo el Mar" },
        { id: "ayhjqZW1Zto", nombre: "Moana - Cuán Lejos Voy" },
        { id: "CNom1oaNxyU", nombre: "Coco - Recuérdame" },
        { id: "A1AYx-qIdec", nombre: "Hércules - No Importa la Distancia" },
        { id: "uWJ1JPZ8xdA", nombre: "Encanto - No se habla de Bruno" },
        { id: "QczRVx2rtE4", nombre: "Tarzán - Hijo de Hombre" },
        { id: "iFr8JSel5ns", nombre: "Pocahontas - Colores en el Viento" },
        { id: "7WO2WVyfdgA", nombre: "Libro de la Selva - Busca lo más vital" },
        { id: "gdOVLQKn08w", nombre: "Hércules - De Cero a Héroe" },
        { id: "7YJ-hCw1vQg", nombre: "Tierra de Osos - En Marcha Estoy" },
        { id: "HC87GGoWh4U", nombre: "Enredados - ¿Cuándo Empezaré A Vivir?" },
        { id: "K6ZZJMT_p_w", nombre: "Volt - Ladrando a La Luna" },
        { id: "llFpeKSa_ZA", nombre: "El Extraño Mundo De Jack - Esto Es Halloween" },
        { id: "qnwMZkvMQSo", nombre: "Toy Story - Cuando Alguien Me Amaba" },
        { id: "qqBqAn3fJ2E", nombre: "El Rey León - Hakuna Matata" },
        { id: "23xNPVXZAWM", nombre: "El Rey León - Yo Quisiera Ya Ser El Rey" },
        { id: "RmziNXTmYA0", nombre: "La Sirenita - Parte de Él" },
        { id: "I-jj3ARkeCg", nombre: "Aladdin - Un Amigo Fiel" },
        { id: "zGGUekR0p6E", nombre: "Tarzán - En Mi Corazón Vivirás" },
        { id: "zjjzFHQOzs4", nombre: "La Princesa y el Sapo - Ya Llegaré" },
        { id: "MmRpo12Ykic", nombre: "Enredados - Veo En Ti La Luz" },
        { id: "m9MraeUdxnk", nombre: "Coco - Un Poco Loco" },
        { id: "kBoMutEdpX0", nombre: "Moana - De Nada" },
        { id: "XvJtgmeB7zU", nombre: "Phineas y Ferb - Gitchee Gitchee Ki" },
        { id: "jpqV3dzYOgk", nombre: "Zootopia - Try Everything" },
        { id: "O_6pOTCLSxA", nombre: "High School Musical - Together" },
        { id: "W8Pc1YMZ8gE", nombre: "Shrek 2 - Yo Quiero Un Héroe" },
        { id: "ZlvCpZlhRzE", nombre: "Frozen - Finalmente Y Como Nunca" },
        { id: "mRQRUplSDpU", nombre: "Madagascar - Quiero Mover El Bote" },
        { id: "dG6qgHI7wSs", nombre: "Enredados - Mi Sueño Ideal" },
        { id: "GMBI78VU6I4", nombre: "Spirit - Nadie Me Va A Dominar" },
        { id: "FNzLQOu7pWM", nombre: "La Familia Del Futuro - Pequeñas Maravillas" },
        { id: "IA0uSub1xy4", nombre: "El Planeta Del Tesoro - Sigo aquí" },
        { id: "ZsanLS4pUkQ", nombre: "High School Musical - Breaking Free" },
        { id: "_sphMFcFN2U", nombre: "High School Musical - What I've Been Looking For" },
        { id: "rIG8wi9yupg", nombre: "High School Musical 2 You Are The Music In Me" },
        { id: "UyqnRW-CZs4", nombre: "Sign 2 - Sky Full of Stars" },
        { id: "eSTnGifDG3g", nombre: "Sing - Shake it off" },
        { id: "q5PY4PzhKEA", nombre: "Hotel Transylvania - Hicimos Click" },
        { id: "zKLGTyqX13M", nombre: "Sing- I'm Still Standing" },
        { id: "sZxl4ljVCug", nombre: "Encanto - Inspiración" },


    ]
};

let cancionesDisponibles = [];
let player = null;
let equipoActivo = null;
let equiposBloqueados = []; 

// Variables del Reloj
let tiempoRestante = 45;
let intervaloReloj = null;

// --- ELEMENTOS ---
const btnReproducir = document.getElementById('btn-reproducir');
const mensajeEstado = document.getElementById('mensaje-estado');
const contenedorPulsadores = document.getElementById('contenedor-pulsadores');
const controlesPresentador = document.getElementById('controles-presentador');
const controlesTiempoAgotado = document.getElementById('controles-tiempo-agotado');
const temporizadorDisplay = document.getElementById('temporizador-display');
const miniPuntos = document.getElementById('mini-puntos');
const respuestaSecreta = document.getElementById('respuesta-secreta');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '10', width: '10', videoId: '',
        playerVars: { 'playsinline': 1, 'controls': 0 }
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

function iniciarCategoria(cat) {
    cancionesDisponibles = [...listas[cat]];
    document.getElementById('seleccion-categoria').classList.add('d-none');
    document.getElementById('juego-musica').classList.remove('d-none');
    actualizarUI();
    prepararNuevaCancion();
}

// --- LÓGICA DEL RELOJ ---
function iniciarReloj() {
    clearInterval(intervaloReloj);
    temporizadorDisplay.classList.remove('d-none', 'text-danger');
    
    intervaloReloj = setInterval(() => {
        tiempoRestante--;
        temporizadorDisplay.innerText = tiempoRestante;
        
        if(tiempoRestante <= 10) temporizadorDisplay.classList.add('text-danger');

        if (tiempoRestante <= 0) {
            dispararTiempoAgotado();
        }
    }, 1000);
}

function pausarReloj() {
    clearInterval(intervaloReloj);
}

function dispararTiempoAgotado() {
    pausarReloj();
    try { if (player && player.pauseVideo) player.pauseVideo(); } catch(e){}
    
    mensajeEstado.innerText = "¡SE ACABÓ EL TIEMPO!";
    mensajeEstado.className = "text-danger display-6 fw-bold";

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if(btn) btn.classList.add('bloqueado');
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
}

window.asignarPuntosCerca = function(idEquipo) {
    puntajes[idEquipo] += 2; 
    actualizarUI();
    prepararNuevaCancion();
}

document.getElementById('btn-nadie-cerca').addEventListener('click', prepararNuevaCancion);

function prepararNuevaCancion() {
    if (cancionesDisponibles.length === 0) {
        alert("¡Se terminaron las canciones!");
        finalizarJuego();
        return;
    }

    equipoActivo = null;
    equiposBloqueados = []; 
    pausarReloj();
    tiempoRestante = 45; 
    temporizadorDisplay.innerText = tiempoRestante;
    temporizadorDisplay.classList.add('d-none');
    
    // Restauramos botones parciales por si se ocultaron en la ronda anterior
    document.getElementById('btn-artista').classList.remove('d-none');
    document.getElementById('btn-melodia').classList.remove('d-none');

    controlesPresentador.classList.add('d-none');
    controlesTiempoAgotado.classList.add('d-none');
    btnReproducir.classList.remove('d-none');
    
    mensajeEstado.innerText = "¡Toquen Reproducir cuando estén listos!";
    mensajeEstado.className = "text-info";

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
        nombreParaMostrar = `ID: ${idVideo}`;
    }

    if (respuestaSecreta) respuestaSecreta.innerText = `${nombreParaMostrar}`;

    if (player && player.loadVideoById) {
        player.loadVideoById(idVideo);
        player.pauseVideo();
    }
}

btnReproducir.addEventListener('click', () => {
    btnReproducir.classList.add('d-none');
    mensajeEstado.innerText = "🎵 Sonando... ¡El primero en saberlo, que pulse!";
    mensajeEstado.className = "text-warning";

    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if(btn && !equiposBloqueados.includes(id)) {
            btn.classList.remove('bloqueado');
        }
    });

    try { if (player && player.playVideo) player.playVideo(); } catch (e) {}
    
    iniciarReloj(); 
});

function tocarPulsador(idEquipo) {
    if(equipoActivo) return; 
    equipoActivo = idEquipo;

    pausarReloj(); 

    try { if (player && player.pauseVideo) player.pauseVideo(); } catch(e){}

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

// --- SISTEMA DE PUNTOS DINÁMICO ---

// 1. Adivinan el NOMBRE (El juego avanza a la siguiente canción)
document.getElementById('btn-exacto').addEventListener('click', () => {
    puntajes[equipoActivo] += 10;
    actualizarUI();
    prepararNuevaCancion();
});

// 2. Adivinan parcial (Artista o Melodía): Suman puntos y la canción SIGUE
function continuarRonda(puntos, botonId) {
    puntajes[equipoActivo] += puntos;
    actualizarUI();
    
    // Ocultamos el botón para que no lo vuelvan a apretar
    document.getElementById(botonId).classList.add('d-none');
    
    mensajeEstado.innerText = "¡Bien! Pero falta el nombre... ¡Sigue sonando!";
    mensajeEstado.className = "text-warning";

    // Liberamos a los equipos para que puedan volver a pulsar
    equipoActivo = null;
    controlesPresentador.classList.add('d-none');
    
    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if (btn) {
            btn.classList.remove('ganador-ronda');
            // Desbloqueamos solo a los que NO están castigados por errar
            if (!equiposBloqueados.includes(id)) {
                btn.classList.remove('bloqueado');
            }
        }
    });

    // Reanudamos la tortura musical y el reloj
    try { if (player && player.playVideo) player.playVideo(); } catch(e){}
    iniciarReloj();
}

document.getElementById('btn-artista').addEventListener('click', () => continuarRonda(7, 'btn-artista'));
document.getElementById('btn-melodia').addEventListener('click', () => continuarRonda(5, 'btn-melodia'));

// 3. SE EQUIVOCAN (Restan 2 puntos y quedan bloqueados)
document.getElementById('btn-incorrecto').addEventListener('click', () => {
    puntajes[equipoActivo] -= 2; // Castigo
    actualizarUI();
    
    equiposBloqueados.push(equipoActivo);

    if (equiposBloqueados.length >= 4) {
        dispararTiempoAgotado();
        return;
    }

    mensajeEstado.innerText = "❌ Incorrecto (-2 pts)... ¡REBOTE!";
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

    try { if (player && player.playVideo) player.playVideo(); } catch(e){}
    iniciarReloj(); 
});

// Botón para que el DJ pase la canción si todos se rinden
document.getElementById('btn-siguiente').addEventListener('click', prepararNuevaCancion);

// --- FINALIZAR ---
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
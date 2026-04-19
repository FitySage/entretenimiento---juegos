const pulsadores = document.querySelectorAll('.pulsador');
const btnCorrecto = document.getElementById('btn-correcto');
const btnIncorrecto = document.getElementById('btn-incorrecto');

let rondaBloqueada = false;
let juegoPausado = false;
let jugadorActual = null; 

// Valores de los puntos y estado global de esta partida
const PUNTOS_POR_ACIERTO = 10;
const PUNTOS_POR_ERROR = 5;
let puntajes = {
    'btn-team-1': 0, 'btn-team-2': 0, 'btn-team-3': 0, 'btn-team-4': 0
};

// Cargar nombres desde LocalStorage (Opcional, para mostrarlos en los botones)
const datosGuardados = JSON.parse(localStorage.getItem('configJuego'));
if (datosGuardados) {
    document.querySelector('#btn-team-1 h2').innerText = datosGuardados.equipo1.nombre;
    document.querySelector('#btn-team-2 h2').innerText = datosGuardados.equipo2.nombre;
    document.querySelector('#btn-team-3 h2').innerText = datosGuardados.equipo3.nombre;
    document.querySelector('#btn-team-4 h2').innerText = datosGuardados.equipo4.nombre;
}

function actualizarPantallaPuntajes() {
    pulsadores.forEach(boton => {
        const id = boton.id;
        boton.querySelector('span').innerText = `${puntajes[id]} pts`;
    });
}

function tocarPulsador(evento) {
    const botonPresionado = evento.currentTarget;
    if (juegoPausado || botonPresionado.classList.contains('eliminado')) return;

    juegoPausado = true;
    rondaBloqueada = true;
    jugadorActual = botonPresionado;

    console.log("⏸️ Música pausada. ¡Responde el " + botonPresionado.querySelector('h2').innerText + "!");

    pulsadores.forEach(btn => {
        if (btn !== botonPresionado) btn.classList.add('bloqueado');
    });
    botonPresionado.classList.add('respondiendo');
}

btnIncorrecto.addEventListener('click', () => {
    if (!jugadorActual) return;
    puntajes[jugadorActual.id] -= PUNTOS_POR_ERROR;
    actualizarPantallaPuntajes();

    jugadorActual.classList.remove('respondiendo');
    jugadorActual.classList.add('eliminado');

    juegoPausado = false;
    jugadorActual = null;

    pulsadores.forEach(btn => {
        if (!btn.classList.contains('eliminado')) btn.classList.remove('bloqueado');
    });
});

btnCorrecto.addEventListener('click', () => {
    if (!jugadorActual) return;
    puntajes[jugadorActual.id] += PUNTOS_POR_ACIERTO;
    actualizarPantallaPuntajes();
    reiniciarRondaCancion();
});

function reiniciarRondaCancion() {
    juegoPausado = false;
    rondaBloqueada = false;
    jugadorActual = null;
    pulsadores.forEach(btn => {
        btn.classList.remove('bloqueado', 'respondiendo', 'eliminado');
    });
}

pulsadores.forEach(boton => {
    boton.addEventListener('pointerdown', tocarPulsador);
});
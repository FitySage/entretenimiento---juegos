const animales = [
    { nombre: "León", folder: "leon", prefijo: "leon_v" },
    { nombre: "Elefante", folder: "elefante", prefijo: "elefante_v" }
];

const txtAnimal = document.getElementById('nombre-animal');
const txtTiempo = document.getElementById('temporizador');
const btnSortear = document.getElementById('btn-sortear');
const btnRevelar = document.getElementById('btn-revelar');
const modalVotacion = new bootstrap.Modal(document.getElementById('modalVotacion'));

let tiempo = 20;
let intervaloTimer;
let animalSeleccionado = null; // Variable global para saber qué animal salió
const audioReal = new Audio();

btnSortear.addEventListener('click', () => {
    const indiceAzar = Math.floor(Math.random() * animales.length);
    
    // CORRECCIÓN: Faltaba guardar el animal para usarlo en el audio después
    animalSeleccionado = animales[indiceAzar]; 
    txtAnimal.innerText = animalSeleccionado.nombre;
    
    btnSortear.classList.add('d-none');
    
    tiempo = 20;
    txtTiempo.innerText = tiempo;
    txtTiempo.classList.remove('text-muted');
    txtTiempo.classList.add('text-danger');
    
    intervaloTimer = setInterval(() => {
        tiempo--;
        txtTiempo.innerText = tiempo;
        if (tiempo <= 0) {
            clearInterval(intervaloTimer);
            finalizarImitacion();
        }
    }, 1000);
});

function finalizarImitacion() {
    txtTiempo.innerText = "¡TIEMPO!";
    modalVotacion.show();
    btnRevelar.classList.remove('d-none');
}

// --- LOGICA DE VOTACIÓN ---
const panelVotos = document.getElementById('panel-votos');
const tituloModal = document.querySelector('#modalVotacion h2');

let equiposVotantes = ['Equipo 2', 'Equipo 3', 'Equipo 4']; 
let indiceVotanteActual = 0;
let puntajeAcumuladoRonda = 0;
let timerVotacion;

for (let i = 1; i <= 10; i++) {
    const btnVoto = document.createElement('button');
    btnVoto.className = 'btn btn-outline-primary flex-fill fs-1 py-3 fw-bold m-1';
    btnVoto.innerText = i;
    btnVoto.addEventListener('click', () => registrarVoto(i));
    panelVotos.appendChild(btnVoto);
}

// Al mostrar el modal de Bootstrap, arrancamos la votación automáticamente
document.getElementById('modalVotacion').addEventListener('shown.bs.modal', iniciarVotacion);

function iniciarVotacion() {
    indiceVotanteActual = 0;
    puntajeAcumuladoRonda = 0;
    siguienteVotante();
}

function siguienteVotante() {
    if (indiceVotanteActual >= equiposVotantes.length) {
        finalizarRondaVotacion();
        return;
    }

    const equipoActual = equiposVotantes[indiceVotanteActual];
    tituloModal.innerText = `Vota: ${equipoActual} (20s)`;
    
    let tiempoVoto = 20;
    clearInterval(timerVotacion); 
    
    timerVotacion = setInterval(() => {
        tiempoVoto--;
        tituloModal.innerText = `Vota: ${equipoActual} (${tiempoVoto}s)`;
        if (tiempoVoto <= 0) registrarVoto(0);
    }, 1000);
}

function registrarVoto(puntos) {
    clearInterval(timerVotacion); 
    puntajeAcumuladoRonda += puntos;
    indiceVotanteActual++;
    siguienteVotante();
}

function finalizarRondaVotacion() {
    modalVotacion.hide();
    console.log(`¡El equipo consiguió ${puntajeAcumuladoRonda} puntos!`);
}

// --- LOGICA DEL AUDIO ---
btnRevelar.addEventListener('click', () => {
    if (!animalSeleccionado) return;

    const variante = Math.floor(Math.random() * 3) + 1;
    const rutaAudio = `assets/sounds/animales/${animalSeleccionado.folder}/${animalSeleccionado.prefijo}${variante}.mp3`;
    
    audioReal.src = rutaAudio;
    audioReal.play().catch(err => console.error("Error al cargar el audio", err));
});
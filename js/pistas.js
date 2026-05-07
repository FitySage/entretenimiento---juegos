// --- CONFIGURACIÓN ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" }, equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" }, equipo4: { nombre: "Equipo 4" }
};

// --- BASE DE DATOS DE PALABRAS ---
const bancoPalabras = [
    {
        palabra: "SHERLOCK HOLMES",
        pistas: [
            "Famoso detective.",
            "Tiene un compañero muy fiel.",
            "Usa sombrero y fuma pipa.",
            "Su mayor enemigo es Moriarty.",
            "Vive en el 221B de Baker Street.",
            "Es un excelente tocando el violín.",
            "Su frase más famosa involucra a su amigo Watson."
        ]
    },
    {
        palabra: "HARRY POTTER",
        pistas: [
            "Un huérfano famoso.",
            "Recibe una carta misteriosa a los 11 años.",
            "Tiene una cicatriz muy particular.",
            "Sus mejores amigos son un pelirrojo y una sabelotodo.",
            "Juega a un deporte que se vuela en escobas.",
            "Su enemigo no puede ser nombrado.",
            "El niño que sobrevivió."
        ]
    },
    {
        palabra: "MURCIELAGO",
        pistas: [
            "Es un animal.",
            "Duerme colgado boca abajo.",
            "Se guía por el sonido (ecolocalización).",
            "Sale a cazar de noche.",
            "Mucha gente cree que chupan sangre.",
            "Es el único mamífero que puede volar.",
            "Inspiró a un superhéroe de Ciudad Gótica."
        ]
    }
];

// Variables del juego
let palabraActual = "";
let pistasActuales = [];
let rondaActual = 0; // 1 a 7
let equipoActivo = null;
let equiposBloqueados = [];
let letrasReveladas = []; 

// Tiempo inicial
let tiempo = 20; 
let intervaloReloj = null;

const puntosPorRonda = [0, 100, 80, 60, 40, 30, 20, 10]; 

// Elementos
const displayRonda = document.getElementById('ronda-display');
const displayTiempo = document.getElementById('tiempo-display');
const displayPista = document.getElementById('contenedor-pista');
const displayPalabra = document.getElementById('palabra-secreta');
const contenedorPulsadores = document.getElementById('contenedor-pulsadores');
const miniPuntos = document.getElementById('mini-puntos');
const btnIniciar = document.getElementById('btn-iniciar');
const btnSiguiente = document.getElementById('btn-siguiente-pista');
const btnOmitir = document.getElementById('btn-omitir-tiempo'); 
const zonaRespuesta = document.getElementById('zona-respuesta');
const inputPalabra = document.getElementById('input-palabra');

function iniciarJuego() {
    actualizarPuntajes();
    dibujarPulsadores();
    cargarNuevaPalabra();
}

function actualizarPuntajes() {
    miniPuntos.innerHTML = "";
    Object.keys(puntajes).forEach(id => {
        miniPuntos.innerHTML += `<div class="text-white fw-bold">${nombresEquipos[id].nombre}: <span class="text-warning">${puntajes[id]}</span></div>`;
    });
}

function dibujarPulsadores() {
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

function cargarNuevaPalabra() {
    if (bancoPalabras.length === 0) {
        alert("¡Se acabaron las palabras misteriosas! Vamos a ver quién ganó...");
        finalizarJuego(); // MANDA AL PODIO AUTOMÁTICAMENTE
        return;
    }
    
    const index = Math.floor(Math.random() * bancoPalabras.length);
    const seleccion = bancoPalabras.splice(index, 1)[0];
    
    palabraActual = seleccion.palabra;
    pistasActuales = seleccion.pistas;
    rondaActual = 1;
    equiposBloqueados = [];
    letrasReveladas = palabraActual.split('').map(char => char === ' ' ? true : false);

    prepararPantallaRonda();
}

function prepararPantallaRonda() {
    equipoActivo = null;
    zonaRespuesta.classList.add('d-none');
    inputPalabra.value = "";
    
    displayRonda.innerText = `Ronda ${rondaActual}/7 | Puntos: ${puntosPorRonda[rondaActual]}`;
    displayPista.innerText = pistasActuales[rondaActual - 1];

    actualizarPalabraVisual();

    btnIniciar.classList.remove('d-none');
    btnSiguiente.classList.add('d-none');
    btnOmitir.classList.add('d-none'); 
    
    tiempo = 20; 
    displayTiempo.innerText = tiempo;
    displayTiempo.classList.remove('text-danger');

    bloquearTodosPulsadores();
}

function actualizarPalabraVisual() {
    if (rondaActual === 1) {
        displayPalabra.innerText = "???  ???";
    } else {
        let textoAmostrar = "";
        for (let i = 0; i < palabraActual.length; i++) {
            if (palabraActual[i] === ' ') {
                textoAmostrar += "   "; 
            } else if (letrasReveladas[i]) {
                textoAmostrar += palabraActual[i] + " ";
            } else {
                textoAmostrar += "_ ";
            }
        }
        displayPalabra.innerText = textoAmostrar;
    }
}

// INICIAR O REANUDAR EL RELOJ
btnIniciar.addEventListener('click', () => {
    btnIniciar.classList.add('d-none');
    tiempo = 20; 
    desbloquearPulsadoresPermitidos();
    reanudarReloj();
});

function reanudarReloj() {
    displayTiempo.innerText = tiempo;
    btnOmitir.classList.remove('d-none'); 
    
    clearInterval(intervaloReloj);
    intervaloReloj = setInterval(() => {
        tiempo--;
        displayTiempo.innerText = tiempo;
        
        if(tiempo <= 5) displayTiempo.classList.add('text-danger');
        
        if (tiempo <= 0) {
            terminarTiempoRonda();
        }
    }, 1000);
}

function terminarTiempoRonda() {
    clearInterval(intervaloReloj);
    tiempo = 0;
    displayTiempo.innerText = tiempo;
    bloquearTodosPulsadores();
    btnOmitir.classList.add('d-none'); 
    
    if (equiposBloqueados.length >= 4) {
        displayPista.innerText = "¡Todos fallaron!";
    } else {
        displayPista.innerText = "¡Nadie adivinó!";
    }

    if(rondaActual < 7) {
        btnSiguiente.classList.remove('d-none');
    } else {
        displayPalabra.innerText = palabraActual;
        setTimeout(() => { 
            alert("Fin de las pistas. La palabra era: " + palabraActual); 
            cargarNuevaPalabra(); 
        }, 3000);
    }
}

btnOmitir.addEventListener('click', terminarTiempoRonda);

// TOCAR PULSADOR
function tocarPulsador(idEquipo) {
    if (equipoActivo) return;
    
    clearInterval(intervaloReloj); 
    btnOmitir.classList.add('d-none'); 
    
    equipoActivo = idEquipo;
    bloquearTodosPulsadores();
    document.getElementById(`pulsador-${idEquipo}`).classList.add('ganador-ronda');
    document.getElementById(`pulsador-${idEquipo}`).classList.remove('bloqueado');
    
    zonaRespuesta.classList.remove('d-none');
    
    const colorTexto = {"equipo1": "text-info", "equipo2": "text-danger", "equipo3": "text-success", "equipo4": "text-warning"}[idEquipo];
    document.getElementById('mensaje-responde').className = `mb-3 ${colorTexto}`;
    document.getElementById('mensaje-responde').innerText = `¡${nombresEquipos[idEquipo].nombre} responde!`;
    
    inputPalabra.focus();
}

// ENVIAR RESPUESTA
document.getElementById('btn-enviar-respuesta').addEventListener('click', procesarRespuesta);
inputPalabra.addEventListener('keypress', function (e) { if (e.key === 'Enter') procesarRespuesta(); });

function procesarRespuesta() {
    const intento = inputPalabra.value.trim().toUpperCase();
    if (!intento) return;

    if (intento === palabraActual.toUpperCase()) {
        puntajes[equipoActivo] += puntosPorRonda[rondaActual];
        actualizarPuntajes();
        displayPalabra.innerText = palabraActual;
        zonaRespuesta.classList.add('d-none');
        displayPista.innerText = "¡CORRECTO! 🎉";
        displayPista.className = "pista-texto text-success mb-4";
        
        setTimeout(() => {
            displayPista.className = "pista-texto mb-4";
            cargarNuevaPalabra();
        }, 4000);
    } else {
        puntajes[equipoActivo] -= 10;
        equiposBloqueados.push(equipoActivo);
        actualizarPuntajes();
        zonaRespuesta.classList.add('d-none');
        inputPalabra.value = ""; 
        
        if (equiposBloqueados.length >= 4) {
            terminarTiempoRonda(); 
        } else {
            equipoActivo = null;
            desbloquearPulsadoresPermitidos();
            reanudarReloj(); 
        }
    }
}

document.getElementById('btn-cancelar').addEventListener('click', () => {
    inputPalabra.value = "XXX"; 
    procesarRespuesta();
});

// PASAR A LA SIGUIENTE RONDA PISTA
btnSiguiente.addEventListener('click', () => {
    rondaActual++;
    equiposBloqueados = []; 
    
    if (rondaActual >= 3) {
        let letrasOcultasIndices = [];
        for (let i = 0; i < letrasReveladas.length; i++) {
            if (!letrasReveladas[i]) letrasOcultasIndices.push(i);
        }
        
        const letrasARevelar = Math.min(2, letrasOcultasIndices.length);
        for(let j=0; j < letrasARevelar; j++){
            const rnd = Math.floor(Math.random() * letrasOcultasIndices.length);
            const idxReal = letrasOcultasIndices.splice(rnd, 1)[0];
            letrasReveladas[idxReal] = true;
        }
    }
    
    prepararPantallaRonda();
});

function bloquearTodosPulsadores() {
    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if(btn) { btn.classList.add('bloqueado'); btn.classList.remove('ganador-ronda'); }
    });
}

function desbloquearPulsadoresPermitidos() {
    Object.keys(nombresEquipos).forEach(id => {
        const btn = document.getElementById(`pulsador-${id}`);
        if(btn) {
            btn.classList.remove('ganador-ronda');
            if(equiposBloqueados.includes(id)) {
                btn.classList.add('bloqueado');
            } else {
                btn.classList.remove('bloqueado');
            }
        }
    });
}

// --- FINALIZAR JUEGO Y MANDAR AL PODIO ---
function finalizarJuego() {
    // Guarda los puntajes en el almacenamiento para que podio.html los lea
    localStorage.setItem('puntajesUltimaPartida', JSON.stringify(puntajes));
    
    let maxPuntos = -1; 
    let ganador = "";
    
    // Calcular quién tiene más puntos
    Object.keys(puntajes).forEach(id => {
        if(puntajes[id] > maxPuntos) {
            maxPuntos = puntajes[id];
            ganador = nombresEquipos[id].nombre;
        }
    });

    // Guardar en el historial si tienen más de 0 puntos
    if(maxPuntos > 0 && typeof guardarGanador === "function") {
        guardarGanador(ganador, maxPuntos, "Pista a Pista");
    }
    
    // Redirigir a la pantalla del podio
    window.location.href = "podio.html";
}

// Evento para el botón manual de "Terminar" arriba a la derecha
document.getElementById('btn-finalizar').addEventListener('click', () => {
    if(confirm("¿Estás seguro que querés terminar el juego ahora?")) {
        finalizarJuego();
    }
});

// Inicializar al cargar
iniciarJuego();
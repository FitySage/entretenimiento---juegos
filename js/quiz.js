// --- CONFIGURACIÓN Y PUNTAJES ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" }, equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" }, equipo4: { nombre: "Equipo 4" }
};

// --- BASE DE DATOS DE PREGUNTAS ---
const basePreguntas = [
    {
        pregunta: "¿En qué año ganó Argentina su primer mundial de fútbol?",
        opciones: ["1978", "1986", "2022", "1990"],
        correcta: 0 // La posición 0 es "1978"
    },
    {
        pregunta: "¿Cuál es el planeta más grande del sistema solar?",
        opciones: ["Tierra", "Marte", "Júpiter", "Saturno"],
        correcta: 2 // La posición 2 es "Júpiter"
    },
    {
        pregunta: "¿Qué animal es conocido como el mejor amigo del hombre?",
        opciones: ["Gato", "Caballo", "Loro", "Perro"],
        correcta: 3
    },
    {
        pregunta: "¿De qué color es la bandera de Japón?",
        opciones: ["Roja y Azul", "Blanca y Roja", "Azul y Amarilla", "Verde y Blanca"],
        correcta: 1
    }
    // ¡Podés agregar las preguntas familiares que quieras!
];

// Variables del juego
let preguntasDisponibles = [...basePreguntas]; // Copia para no repetir
let preguntaActual = null;
let equipoActivo = null; 
let equiposBloqueados = []; // Los que respondieron mal en la ronda actual

// --- ELEMENTOS HTML ---
const textoPregunta = document.getElementById('texto-pregunta');
const mensajeEstado = document.getElementById('mensaje-estado');
const contenedorPulsadores = document.getElementById('contenedor-pulsadores');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const btnSiguiente = document.getElementById('btn-siguiente');
const contadorPreguntas = document.getElementById('contador-preguntas');
const miniPuntos = document.getElementById('mini-puntos');

// Sonidos (Opcional, si tenés los MP3 en tu carpeta, si no no pasa nada)
const sonidoCorrecto = new Audio('../assets/sounds/success.mp3'); 
const sonidoError = new Audio('../assets/sounds/error.mp3'); 

// --- INTERFAZ ---
function actualizarUI() {
    // 1. Mostrar puntos abajo
    miniPuntos.innerHTML = "";
    Object.keys(puntajes).forEach(id => {
        miniPuntos.innerHTML += `<div class="text-white fw-bold">${nombresEquipos[id].nombre}: <span class="text-warning">${puntajes[id]}</span></div>`;
    });

    // 2. Mostrar botones de equipos (Pulsadores)
    contenedorPulsadores.innerHTML = "";
    Object.keys(nombresEquipos).forEach((id, index) => {
        const colorClass = ["btn-primary", "btn-danger", "btn-success", "btn-warning"][index];
        // Si el equipo ya erró en esta ronda, le ponemos la clase 'bloqueado'
        const estaBloqueado = equiposBloqueados.includes(id) ? "bloqueado" : "";
        
        contenedorPulsadores.innerHTML += `
            <div class="col-6 col-md-3">
                <button onclick="darPalabra('${id}')" class="btn ${colorClass} w-100 btn-equipo shadow ${estaBloqueado}">
                    🔔 ${nombresEquipos[id].nombre}
                </button>
            </div>
        `;
    });
}

// --- LÓGICA DEL JUEGO ---
function nuevaRonda() {
    if (preguntasDisponibles.length === 0) {
        alert("¡No hay más preguntas! Veamos quién ganó...");
        finalizarJuego();
        return;
    }

    // Sortear pregunta sin repetir
    const indice = Math.floor(Math.random() * preguntasDisponibles.length);
    preguntaActual = preguntasDisponibles[indice];
    preguntasDisponibles.splice(indice, 1); // La sacamos de la lista

    // Reiniciar variables de la ronda
    equipoActivo = null;
    equiposBloqueados = [];
    
    // Preparar pantalla
    textoPregunta.innerText = preguntaActual.pregunta;
    contadorPreguntas.innerText = `Faltan: ${preguntasDisponibles.length}`;
    mensajeEstado.innerText = "¡Esperando que un equipo pulse! ⏳";
    mensajeEstado.className = "text-warning mb-3";

    // Cargar textos de las opciones
    for(let i=0; i<4; i++) {
        document.getElementById(`op-${i}`).innerText = preguntaActual.opciones[i];
        document.getElementById(`op-${i}`).className = "btn btn-light w-100 btn-opcion shadow"; // Resetear color
    }

    contenedorOpciones.classList.add('d-none'); // Ocultar opciones
    contenedorPulsadores.classList.remove('d-none'); // Mostrar botones de equipos
    btnSiguiente.classList.add('d-none'); // Ocultar botón siguiente
    
    actualizarUI();
}

function darPalabra(idEquipo) {
    equipoActivo = idEquipo;
    
    // Cambiamos el cartel
    mensajeEstado.innerText = `🎙️ ¡Responde: ${nombresEquipos[idEquipo].nombre}!`;
    mensajeEstado.className = "text-info mb-3 display-6 fw-bold";

    // Ocultamos los pulsadores y mostramos las opciones
    contenedorPulsadores.classList.add('d-none');
    contenedorOpciones.classList.remove('d-none');
}

function verificarRespuesta(indiceElegido) {
    if(!equipoActivo) return;

    if (indiceElegido === preguntaActual.correcta) {
        // RESPUESTA CORRECTA
        sonidoCorrecto.play().catch(e=>console.log(e));
        puntajes[equipoActivo] += 10; // Suma 10 puntos
        
        document.getElementById(`op-${indiceElegido}`).classList.replace('btn-light', 'btn-success');
        mensajeEstado.innerText = `✅ ¡CORRECTO! +10 puntos para ${nombresEquipos[equipoActivo].nombre}`;
        mensajeEstado.className = "text-success mb-3 display-6 fw-bold";
        
        // Finaliza la ronda, mostrar botón siguiente
        btnSiguiente.classList.remove('d-none');
        actualizarUI();
        equipoActivo = null;

    } else {
        // RESPUESTA INCORRECTA (REBOTE)
        sonidoError.play().catch(e=>console.log(e));
        
        document.getElementById(`op-${indiceElegido}`).classList.replace('btn-light', 'btn-danger'); // Marcar la mala en rojo
        
        // Bloquear equipo
        equiposBloqueados.push(equipoActivo);
        equipoActivo = null;

        if(equiposBloqueados.length >= 4) {
            // Si todos erraron
            mensajeEstado.innerText = `❌ Nadie acertó. La correcta era: ${preguntaActual.opciones[preguntaActual.correcta]}`;
            mensajeEstado.className = "text-danger mb-3 fw-bold";
            document.getElementById(`op-${preguntaActual.correcta}`).classList.replace('btn-light', 'btn-success');
            btnSiguiente.classList.remove('d-none');
        } else {
            // ¡Rebote!
            mensajeEstado.innerText = `❌ ¡Incorrecto! ¡Hay REBOTE!`;
            mensajeEstado.className = "text-danger mb-3 display-6 fw-bold";
            
            // Un segundo después, volvemos a mostrar los pulsadores
            setTimeout(() => {
                contenedorOpciones.classList.add('d-none');
                contenedorPulsadores.classList.remove('d-none');
                mensajeEstado.innerText = `⏳ ¡Rápido, los demás pueden robar los puntos!`;
                mensajeEstado.className = "text-warning mb-3 fw-bold";
                actualizarUI();
            }, 1500);
        }
    }
}

btnSiguiente.addEventListener('click', nuevaRonda);

// --- Cierre y Podio ---
function finalizarJuego() {
    localStorage.setItem('puntajesUltimaPartida', JSON.stringify(puntajes));
    
    let equipoGanador = ""; let puntajeMaximo = -1;
    Object.keys(puntajes).forEach(id => {
        if (puntajes[id] > puntajeMaximo) {
            puntajeMaximo = puntajes[id];
            equipoGanador = nombresEquipos[id].nombre;
        }
    });

    if (puntajeMaximo > 0) guardarGanador(equipoGanador, puntajeMaximo, "Trivia Familiar");
    window.location.href = "podio.html";
}

document.getElementById('btn-finalizar').addEventListener('click', finalizarJuego);

// Iniciar
nuevaRonda();
// --- CONFIGURACIÓN Y PUNTAJES ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" }, equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" }, equipo4: { nombre: "Equipo 4" }
};

// --- BASE DE DATOS DE PREGUNTAS ---
const preguntasTrivia = [
    // --- PELÍCULAS ---
    {
        pregunta: "¿Qué famoso actor de Hollywood interpreta a Iron Man en las películas de Marvel?",
        opciones: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál fue la primera película animada en ganar el premio Óscar a Mejor Película de Animación (año 2001)?",
        opciones: ["Toy Story", "Buscando a Nemo", "Shrek", "El Viaje de Chihiro"],
        correcta: 2
    },
    {
        pregunta: "En la saga de Star Wars, ¿cuál es el verdadero nombre de Darth Vader?",
        opciones: ["Luke Skywalker", "Anakin Skywalker", "Obi-Wan Kenobi", "Kylo Ren"],
        correcta: 1
    },
    {
        pregunta: "¿Qué película de ciencia ficción está protagonizada por un robot basurero en una Tierra abandonada?",
        opciones: ["Terminator", "Wall-E", "RoboCop", "Inteligencia Artificial"],
        correcta: 1
    },
    {
        pregunta: "¿Quién es el director de las películas 'Titanic' y 'Avatar'?",
        opciones: ["Steven Spielberg", "Quentin Tarantino", "Christopher Nolan", "James Cameron"],
        correcta: 3
    },

    // --- SERIES ---
    {
        pregunta: "¿Cuántas temporadas tiene la icónica serie de comedia 'Friends'?",
        opciones: ["8 temporadas", "10 temporadas", "12 temporadas", "15 temporadas"],
        correcta: 1
    },
    {
        pregunta: "En la serie 'La Casa de Papel', ¿cómo se llama el cerebro detrás del atraco a la Casa de la Moneda?",
        opciones: ["Berlín", "El Profesor", "Denver", "Arturito"],
        correcta: 1
    },
    {
        pregunta: "¿En qué ciudad ficticia combate el crimen Batman?",
        opciones: ["Metrópolis", "Star City", "Ciudad Gótica (Gotham)", "Central City"],
        correcta: 2
    },
    {
        pregunta: "¿Qué serie de televisión transcurre en la oficina de la papelera Dunder Mifflin?",
        opciones: ["Parks and Recreation", "The Office", "Brooklyn Nine-Nine", "Seinfeld"],
        correcta: 1
    },
    {
        pregunta: "En 'Los Simpson', ¿cómo se llama el jefe de la planta nuclear donde trabaja Homero?",
        opciones: ["Ned Flanders", "Alcalde Quimby", "Moe Szyslak", "Sr. Burns"],
        correcta: 3
    },

    // --- VIDEOJUEGOS ---
    {
        pregunta: "¿Cuál es la consola de videojuegos más vendida de toda la historia?",
        opciones: ["Nintendo Wii", "PlayStation 2", "Xbox 360", "PlayStation 4"],
        correcta: 1
    },
    {
        pregunta: "En la saga 'The Legend of Zelda', ¿cómo se llama el héroe protagonista que controlamos?",
        opciones: ["Zelda", "Ganondorf", "Link", "Navi"],
        correcta: 2
    },
    {
        pregunta: "¿Qué popular juego consiste en hacer encajar bloques que caen llamados Tetrominós?",
        opciones: ["Tetris", "Candy Crush", "Pac-Man", "Pang"],
        correcta: 0
    },
    {
        pregunta: "¿Qué estudio de videojuegos es el creador de la famosa saga 'Fifa' (ahora EA Sports FC)?",
        opciones: ["Konami", "Ubisoft", "Electronic Arts (EA)", "Epic Games"],
        correcta: 2
    },
    {
        pregunta: "¿Cómo se llama la moneda o dinero virtual que se utiliza en el juego Roblox?",
        opciones: ["V-Bucks", "Robux", "Minecoins", "Gemas"],
        correcta: 1
    },

    // --- CANTANTES Y MÚSICA ---
    {
        pregunta: "¿Qué cantante pop estadounidense se hizo mundialmente famosa con la canción 'Baby One More Time'?",
        opciones: ["Madonna", "Christina Aguilera", "Britney Spears", "Mariah Carey"],
        correcta: 2
    },
    {
        pregunta: "¿Qué mítica banda de rock británica estaba conformada por John, Paul, George y Ringo?",
        opciones: ["The Rolling Stones", "The Who", "Led Zeppelin", "The Beatles"],
        correcta: 3
    },
    {
        pregunta: "¿Cuál es la nacionalidad del cantante Justin Bieber?",
        opciones: ["Estadounidense", "Canadiense", "Británico", "Australiano"],
        correcta: 1
    },
    {
        pregunta: "¿Qué cantante puertorriqueño rompió récords globales con el éxito 'Despacito'?",
        opciones: ["Ricky Martin", "Chayanne", "Luis Fonsi", "Bad Bunny"],
        correcta: 2
    },
    {
        pregunta: "En la historia de la música pop, ¿quién es considerada universalmente como 'La Reina del Pop'?",
        opciones: ["Whitney Houston", "Céline Dion", "Madonna", "Lady Gaga"],
        correcta: 2
    },
    // --- ANIMALES ---
    {
        pregunta: "¿Cuál es el animal terrestre más rápido del mundo?",
        opciones: ["León", "Guepardo", "Avestruz", "Caballo"],
        correcta: 1 
    },
    {
        pregunta: "¿Cuántos corazones tiene un pulpo?",
        opciones: ["Uno", "Dos", "Tres", "Cuatro"],
        correcta: 2 
    },
    {
        pregunta: "¿Qué animal es el único mamífero capaz de volar?",
        opciones: ["Ardilla voladora", "Murciélago", "Colugo", "Lémur"],
        correcta: 1 
    },

    // --- CULTURA GENERAL ---
    {
        pregunta: "¿En qué país se encuentra la famosa Torre de Pisa?",
        opciones: ["Francia", "España", "Grecia", "Italia"],
        correcta: 3 
    },
    {
        pregunta: "¿Quién escribió la novela 'Cien años de soledad'?",
        opciones: ["Julio Cortázar", "Gabriel García Márquez", "Jorge Luis Borges", "Pablo Neruda"],
        correcta: 1 
    },
    {
        pregunta: "¿Cuál es el océano más grande del mundo?",
        opciones: ["Océano Atlántico", "Océano Índico", "Océano Pacífico", "Océano Ártico"],
        correcta: 2 
    },

    // --- CIENCIA ---
    {
        pregunta: "¿Cuál es el planeta más grande de nuestro sistema solar?",
        opciones: ["Saturno", "Júpiter", "Urano", "Neptuno"],
        correcta: 1 
    },
    {
        pregunta: "¿Qué elemento químico está representado por el símbolo 'O'?",
        opciones: ["Oro", "Osmio", "Oxígeno", "Oganesón"],
        correcta: 2 
    },
    {
        pregunta: "¿Cuál es el órgano más grande del cuerpo humano?",
        opciones: ["El hígado", "Los pulmones", "El intestino", "La piel"],
        correcta: 3 
    },
    {
        pregunta: "¿Qué gas absorben las plantas durante la fotosíntesis?",
        opciones: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Helio"],
        correcta: 1 
    },
    {
        pregunta: "¿En qué año ganó Argentina su primer mundial de fútbol?",
        opciones: ["1978", "1986", "2022", "1990"],
        correcta: 0 
    },
    {
        pregunta: "¿Cuál es el planeta más grande del sistema solar?",
        opciones: ["Tierra", "Marte", "Júpiter", "Saturno"],
        correcta: 2 
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
    },
    {
        pregunta: "¿Cuál es el río más largo del mundo?",
        opciones: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál de los siguientes animales no es un marsupial?",
        opciones: ["Canguro", "Walabi", "Wombat", "Oso Hormiguero"],
        correcta: 3
    }, {
        pregunta: "¿Cual es el animal más rápido del mundo?",
        opciones: ["Guepardo", "León", "Tigre", "Zebra"],
        correcta: 0
    }, {
        pregunta: "¿Cuantos continentes hay en el mundo?",
        opciones: ["5", "6", "7", "8"],
        correcta: 2
    }
];

// Variables del juego
// ¡AQUÍ ESTABA EL ERROR! (Cambié basePreguntas por preguntasTrivia)
let preguntasDisponibles = [...preguntasTrivia]; 
let preguntaActual = null;
let equipoActivo = null;
let equiposBloqueados = []; 

// --- ELEMENTOS HTML ---
const textoPregunta = document.getElementById('texto-pregunta');
const mensajeEstado = document.getElementById('mensaje-estado');
const contenedorPulsadores = document.getElementById('contenedor-pulsadores');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const btnSiguiente = document.getElementById('btn-siguiente');
const contadorPreguntas = document.getElementById('contador-preguntas');
const miniPuntos = document.getElementById('mini-puntos');

// Sonidos 
const sonidoCorrecto = new Audio('../assets/sounds/success.mp3');
const sonidoError = new Audio('../assets/sounds/error.mp3');

// --- INTERFAZ ---
function actualizarUI() {
    miniPuntos.innerHTML = "";
    Object.keys(puntajes).forEach(id => {
        miniPuntos.innerHTML += `<div class="text-white fw-bold">${nombresEquipos[id].nombre}: <span class="text-warning">${puntajes[id]}</span></div>`;
    });

    contenedorPulsadores.innerHTML = "";
    Object.keys(nombresEquipos).forEach((id, index) => {
        const colorClass = ["btn-primary", "btn-danger", "btn-success", "btn-warning"][index];
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

    const indice = Math.floor(Math.random() * preguntasDisponibles.length);
    preguntaActual = preguntasDisponibles[indice];
    preguntasDisponibles.splice(indice, 1); 

    equipoActivo = null;
    equiposBloqueados = [];

    textoPregunta.innerText = preguntaActual.pregunta;
    contadorPreguntas.innerText = `Faltan: ${preguntasDisponibles.length}`;
    mensajeEstado.innerText = "¡Esperando que un equipo pulse! ⏳";
    mensajeEstado.className = "text-warning mb-3";

    for (let i = 0; i < 4; i++) {
        document.getElementById(`op-${i}`).innerText = preguntaActual.opciones[i];
        document.getElementById(`op-${i}`).className = "btn btn-light w-100 btn-opcion shadow"; 
    }

    contenedorOpciones.classList.add('d-none'); 
    contenedorPulsadores.classList.remove('d-none'); 
    btnSiguiente.classList.add('d-none'); 

    actualizarUI();
}

function darPalabra(idEquipo) {
    equipoActivo = idEquipo;

    mensajeEstado.innerText = `🎙️ ¡Responde: ${nombresEquipos[idEquipo].nombre}!`;
    mensajeEstado.className = "text-info mb-3 display-6 fw-bold";

    contenedorPulsadores.classList.add('d-none');
    contenedorOpciones.classList.remove('d-none');
}

function verificarRespuesta(indiceElegido) {
    if (!equipoActivo) return;

    if (indiceElegido === preguntaActual.correcta) {
        sonidoCorrecto.play().catch(e => console.log(e));
        puntajes[equipoActivo] += 10; 

        document.getElementById(`op-${indiceElegido}`).classList.replace('btn-light', 'btn-success');
        mensajeEstado.innerText = `✅ ¡CORRECTO! +10 puntos para ${nombresEquipos[equipoActivo].nombre}`;
        mensajeEstado.className = "text-success mb-3 display-6 fw-bold";

        btnSiguiente.classList.remove('d-none');
        actualizarUI();
        equipoActivo = null;

    } else {
        sonidoError.play().catch(e => console.log(e));

        document.getElementById(`op-${indiceElegido}`).classList.replace('btn-light', 'btn-danger'); 

        equiposBloqueados.push(equipoActivo);
        equipoActivo = null;

        if (equiposBloqueados.length >= 4) {
            mensajeEstado.innerText = `❌ Nadie acertó. La correcta era: ${preguntaActual.opciones[preguntaActual.correcta]}`;
            mensajeEstado.className = "text-danger mb-3 fw-bold";
            document.getElementById(`op-${preguntaActual.correcta}`).classList.replace('btn-light', 'btn-success');
            btnSiguiente.classList.remove('d-none');
        } else {
            mensajeEstado.innerText = `❌ ¡Incorrecto! ¡Hay REBOTE!`;
            mensajeEstado.className = "text-danger mb-3 display-6 fw-bold";

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
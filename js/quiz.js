// --- CONFIGURACIÓN Y PUNTAJES (SISTEMA ANTI-ERRORES) ---
let nombresEquipos = {
    equipo1: { nombre: "Equipo 1" }, equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" }, equipo4: { nombre: "Equipo 4" }
};

// Intentamos cargar la configuración guardada de forma segura
try {
    const configGuardada = JSON.parse(localStorage.getItem('configJuego'));
    if (configGuardada && Object.keys(configGuardada).length > 0) {
        nombresEquipos = configGuardada;
    }
} catch (error) {
    console.log("Error al cargar equipos, usando los de por defecto.");
}

// Creamos los puntajes EXACTAMENTE para los equipos que existen, evitando bloqueos
let puntajes = {};
Object.keys(nombresEquipos).forEach(id => {
    puntajes[id] = 0;
});

// --- BASE DE DATOS DE PREGUNTAS (65 PREGUNTAS VARIADAS) ---
const preguntasTrivia = [
    // --- CINE Y SERIES ---
    { pregunta: "¿Qué famoso actor de Hollywood interpreta a Iron Man en las películas de Marvel?", opciones: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"], correcta: 1 },
    { pregunta: "¿Cuál fue la primera película animada en ganar el premio Óscar a Mejor Película de Animación (año 2001)?", opciones: ["Toy Story", "Buscando a Nemo", "Shrek", "El Viaje de Chihiro"], correcta: 2 },
    { pregunta: "En la saga de Star Wars, ¿cuál es el verdadero nombre de Darth Vader?", opciones: ["Luke Skywalker", "Anakin Skywalker", "Obi-Wan Kenobi", "Kylo Ren"], correcta: 1 },
    { pregunta: "¿Qué película de ciencia ficción está protagonizada por un robot basurero en una Tierra abandonada?", opciones: ["Terminator", "Wall-E", "RoboCop", "Inteligencia Artificial"], correcta: 1 },
    { pregunta: "¿Quién es el director de las películas 'Titanic' y 'Avatar'?", opciones: ["Steven Spielberg", "Quentin Tarantino", "Christopher Nolan", "James Cameron"], correcta: 3 },
    { pregunta: "¿Cuántas temporadas tiene la icónica serie de comedia 'Friends'?", opciones: ["8 temporadas", "10 temporadas", "12 temporadas", "15 temporadas"], correcta: 1 },
    { pregunta: "En la serie 'La Casa de Papel', ¿cómo se llama el cerebro detrás del atraco?", opciones: ["Berlín", "El Profesor", "Denver", "Arturito"], correcta: 1 },
    { pregunta: "¿En qué ciudad ficticia combate el crimen Batman?", opciones: ["Metrópolis", "Star City", "Ciudad Gótica (Gotham)", "Central City"], correcta: 2 },
    { pregunta: "En 'Los Simpson', ¿cómo se llama el jefe de la planta nuclear donde trabaja Homero?", opciones: ["Ned Flanders", "Alcalde Quimby", "Moe Szyslak", "Sr. Burns"], correcta: 3 },
    { pregunta: "¿Qué hechizo usa Harry Potter frecuentemente para desarmar a su oponente?", opciones: ["Avada Kedavra", "Lumos", "Expelliarmus", "Expecto Patronum"], correcta: 2 },
    { pregunta: "¿En qué película de Disney el villano es un león con una cicatriz en el ojo?", opciones: ["Tarzán", "El Libro de la Selva", "El Rey León", "Madagascar"], correcta: 2 },
    { pregunta: "¿Qué actor interpretó al excéntrico Jack Sparrow en Piratas del Caribe?", opciones: ["Brad Pitt", "Johnny Depp", "Tom Cruise", "Leonardo DiCaprio"], correcta: 1 },
    { pregunta: "¿Cómo se llama el parque donde conviven dinosaurios clonados en la famosa película de 1993?", opciones: ["Dino Park", "Mundo Jurásico", "Jurassic Park", "T-Rex Land"], correcta: 2 },
    { pregunta: "En Matrix, ¿qué color de pastilla elige Neo para conocer la verdad?", opciones: ["Azul", "Verde", "Roja", "Amarilla"], correcta: 2 },

    // --- VIDEOJUEGOS ---
    { pregunta: "¿Cuál es la consola de videojuegos más vendida de toda la historia?", opciones: ["Nintendo Wii", "PlayStation 2", "Xbox 360", "PlayStation 4"], correcta: 1 },
    { pregunta: "En la saga 'The Legend of Zelda', ¿cómo se llama el héroe protagonista que controlamos?", opciones: ["Zelda", "Ganondorf", "Link", "Navi"], correcta: 2 },
    { pregunta: "¿Qué popular juego consiste en hacer encajar bloques que caen llamados Tetrominós?", opciones: ["Tetris", "Candy Crush", "Pac-Man", "Pang"], correcta: 0 },
    { pregunta: "¿Qué estudio de videojuegos es el creador de la famosa saga 'Fifa' (ahora EA Sports FC)?", opciones: ["Konami", "Ubisoft", "Electronic Arts (EA)", "Epic Games"], correcta: 2 },
    { pregunta: "¿Cómo se llama la moneda o dinero virtual que se utiliza en el juego Roblox?", opciones: ["V-Bucks", "Robux", "Minecoins", "Gemas"], correcta: 1 },
    { pregunta: "¿Qué compañía japonesa creó al famosísimo erizo azul llamado Sonic?", opciones: ["Nintendo", "Sony", "Sega", "Capcom"], correcta: 2 },
    { pregunta: "¿Cuál es el material más valioso y resistente en Minecraft para hacer armaduras?", opciones: ["Diamante", "Hierro", "Esmeralda", "Netherita"], correcta: 3 },
    { pregunta: "¿Cómo se llama el hermano asustadizo de Mario Bros que viste de verde?", opciones: ["Wario", "Toad", "Yoshi", "Luigi"], correcta: 3 },
    { pregunta: "¿En qué exitoso juego los jugadores caen de un autobús volador para luchar en una isla?", opciones: ["Call of Duty", "Fortnite", "Free Fire", "PUBG"], correcta: 1 },
    { pregunta: "¿Cuál es el Pokémon número 25 de la Pokédex, famoso por sus ataques eléctricos?", opciones: ["Bulbasaur", "Charizard", "Pikachu", "Squirtle"], correcta: 2 },

    // --- MÚSICA ---
    { pregunta: "¿Qué cantante pop estadounidense se hizo mundialmente famosa con la canción 'Baby One More Time'?", opciones: ["Madonna", "Christina Aguilera", "Britney Spears", "Mariah Carey"], correcta: 2 },
    { pregunta: "¿Qué mítica banda de rock británica estaba conformada por John, Paul, George y Ringo?", opciones: ["The Rolling Stones", "The Who", "Led Zeppelin", "The Beatles"], correcta: 3 },
    { pregunta: "¿Cuál es la nacionalidad del famoso cantante Justin Bieber?", opciones: ["Estadounidense", "Canadiense", "Británico", "Australiano"], correcta: 1 },
    { pregunta: "¿Qué cantante puertorriqueño rompió récords globales con el éxito 'Despacito'?", opciones: ["Ricky Martin", "Chayanne", "Luis Fonsi", "Bad Bunny"], correcta: 2 },
    { pregunta: "En la historia de la música pop, ¿quién es considerada universalmente como 'La Reina del Pop'?", opciones: ["Whitney Houston", "Céline Dion", "Madonna", "Lady Gaga"], correcta: 2 },
    { pregunta: "¿A quién pertenecía el histórico apodo de 'El Rey del Pop'?", opciones: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"], correcta: 1 },
    { pregunta: "¿Qué legendaria banda de rock argentina canta el himno 'De Música Ligera'?", opciones: ["Los Redondos", "Soda Stereo", "Los Fabulosos Cadillacs", "Enanitos Verdes"], correcta: 1 },
    { pregunta: "¿Cómo se llamaba el increíble vocalista principal de la banda Queen?", opciones: ["Mick Jagger", "David Bowie", "Elton John", "Freddie Mercury"], correcta: 3 },
    { pregunta: "¿Qué artista colombiana cantó el pegadizo 'Waka Waka' en el mundial de Sudáfrica 2010?", opciones: ["Karol G", "Shakira", "Becky G", "Thalía"], correcta: 1 },
    { pregunta: "¿Qué instrumento musical tiene teclas blancas y negras y se toca con ambas manos?", opciones: ["Guitarra", "Violín", "Piano", "Batería"], correcta: 2 },

    // --- ANIMALES Y NATURALEZA ---
    { pregunta: "¿Cuál es el animal terrestre más rápido del mundo?", opciones: ["León", "Guepardo", "Avestruz", "Caballo"], correcta: 1 },
    { pregunta: "¿Cuántos corazones tiene un pulpo?", opciones: ["Uno", "Dos", "Tres", "Cuatro"], correcta: 2 },
    { pregunta: "¿Qué animal es el único mamífero capaz de volar activamente?", opciones: ["Ardilla voladora", "Murciélago", "Colugo", "Lémur"], correcta: 1 },
    { pregunta: "¿Qué animal es mundialmente conocido como 'El rey de la selva'?", opciones: ["El Tigre", "El Gorila", "El León", "El Elefante"], correcta: 2 },
    { pregunta: "¿Cuál es el ave más grande del mundo, que además no puede volar?", opciones: ["Pingüino emperador", "Cóndor", "Emú", "Avestruz"], correcta: 3 },
    { pregunta: "¿Qué insecto trabajador es el encargado de producir la miel?", opciones: ["Avispa", "Abeja", "Hormiga", "Mariposa"], correcta: 1 },
    { pregunta: "¿De qué color es realmente la piel de un oso polar debajo de su pelaje blanco?", opciones: ["Blanca", "Rosa", "Negra", "Gris"], correcta: 2 },
    { pregunta: "¿Qué mamífero acuático es conocido por su gran inteligencia y saltos increíbles?", opciones: ["Tiburón", "Delfín", "Ballena Azul", "Foca"], correcta: 1 },
    { pregunta: "¿Cuántas patas tiene una araña común?", opciones: ["Seis", "Ocho", "Diez", "Doce"], correcta: 1 },
    { pregunta: "¿Qué animal produce la tela de seda con la que se envuelve para convertirse en mariposa?", opciones: ["Oruga", "Lombriz", "Cienpiés", "Escarabajo"], correcta: 0 },
    { pregunta: "¿Cuál de los siguientes animales tiene una bolsa en su vientre para llevar a sus crías (es un marsupial)?", opciones: ["Oso Hormiguero", "Canguro", "Rinoceronte", "Hipopótamo"], correcta: 1 },

    // --- CULTURA GENERAL Y GEOGRAFÍA ---
    { pregunta: "¿En qué país de Europa se encuentra la famosa e inclinada Torre de Pisa?", opciones: ["Francia", "España", "Grecia", "Italia"], correcta: 3 },
    { pregunta: "¿Quién escribió la famosa novela 'Cien años de soledad'?", opciones: ["Julio Cortázar", "Gabriel García Márquez", "Jorge Luis Borges", "Pablo Neruda"], correcta: 1 },
    { pregunta: "¿Cuál es el océano más grande del mundo?", opciones: ["Atlántico", "Índico", "Pacífico", "Ártico"], correcta: 2 },
    { pregunta: "¿De qué colores es la bandera oficial de Japón?", opciones: ["Roja y Azul", "Blanca y Roja", "Azul y Amarilla", "Verde y Blanca"], correcta: 1 },
    { pregunta: "¿Cuál es el río considerado más largo y caudaloso del mundo?", opciones: ["Río Nilo", "Río Amazonas", "Río Yangtsé", "Río Misisipi"], correcta: 1 },
    { pregunta: "¿Cuál es la romántica capital de Francia, famosa por la Torre Eiffel?", opciones: ["Londres", "Madrid", "Roma", "París"], correcta: 3 },
    { pregunta: "¿En qué país africano se encuentran las famosas pirámides de Guiza?", opciones: ["Marruecos", "Egipto", "Sudáfrica", "Kenia"], correcta: 1 },
    { pregunta: "¿Qué idioma es el más hablado del mundo si contamos la cantidad de hablantes nativos?", opciones: ["Inglés", "Español", "Chino Mandarín", "Hindi"], correcta: 2 },
    { pregunta: "¿Cuál es el país más extenso (más grande por superficie) de todo el planeta?", opciones: ["Canadá", "Estados Unidos", "China", "Rusia"], correcta: 3 },
    { pregunta: "¿Quién pintó la famosísima obra de arte conocida como 'La Mona Lisa'?", opciones: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Miguel Ángel"], correcta: 2 },

    // --- CIENCIA, CUERPO HUMANO Y DEPORTES ---
    { pregunta: "¿Cuál es el planeta más grande de nuestro sistema solar?", opciones: ["Saturno", "Júpiter", "Urano", "Neptuno"], correcta: 1 },
    { pregunta: "En la tabla periódica, ¿qué elemento vital está representado por el símbolo 'O'?", opciones: ["Oro", "Osmio", "Oxígeno", "Oganesón"], correcta: 2 },
    { pregunta: "¿Cuál es el órgano más grande de todo el cuerpo humano?", opciones: ["El hígado", "Los pulmones", "El intestino", "La piel"], correcta: 3 },
    { pregunta: "¿Qué gas vital para el planeta absorben las plantas durante la fotosíntesis?", opciones: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Helio"], correcta: 1 },
    { pregunta: "¿En qué año ganó Argentina su primer mundial de fútbol de la mano de Kempes?", opciones: ["1978", "1986", "2022", "1990"], correcta: 0 },
    { pregunta: "¿Cuántos huesos aproximadamente tiene el cuerpo de un humano adulto?", opciones: ["150", "206", "300", "350"], correcta: 1 },
    { pregunta: "¿Qué planeta de nuestro sistema es conocido habitualmente como el 'Planeta Rojo'?", opciones: ["Venus", "Marte", "Mercurio", "Júpiter"], correcta: 1 },
    { pregunta: "¿En qué deporte de equipo se destaca internacionalmente Lionel Messi?", opciones: ["Básquet", "Tenis", "Rugby", "Fútbol"], correcta: 3 },
    { pregunta: "¿Qué vital órgano del cuerpo humano es el encargado de bombear la sangre?", opciones: ["Cerebro", "Estómago", "Corazón", "Hígado"], correcta: 2 },
    { pregunta: "¿Cuál es el nombre del único satélite natural que orbita la Tierra?", opciones: ["Titan", "La Luna", "Europa", "Fobos"], correcta: 1 }
];

// --- VARIABLES DEL JUEGO Y RELOJ ---
let preguntasDisponibles = [...preguntasTrivia];
let preguntaActual = null;
let equipoActivo = null;
let equiposBloqueados = [];

// Variables del reloj
let tiempoRespuesta = 15;
let intervaloRespuesta = null;

// --- ELEMENTOS HTML ---
const textoPregunta = document.getElementById('texto-pregunta');
const mensajeEstado = document.getElementById('mensaje-estado');
const contenedorPulsadores = document.getElementById('contenedor-pulsadores');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const btnSiguiente = document.getElementById('btn-siguiente');
const contadorPreguntas = document.getElementById('contador-preguntas');
const miniPuntos = document.getElementById('mini-puntos');
const contenedorReloj = document.getElementById('contenedor-reloj');
const relojTrivia = document.getElementById('reloj-trivia');

// --- SONIDOS ---
const sonidoCorrecto = new Audio('../assets/sounds/correcto.mp3'); 
const sonidoError = new Audio('../assets/sounds/incorrecto.mp3'); 
const sonidoTension = new Audio('../assets/sounds/tension-reloj.mp3'); 
sonidoTension.loop = true;
sonidoTension.volume = 0.4;

// --- INTERFAZ ---
function actualizarUI() {
    miniPuntos.innerHTML = "";
    Object.keys(puntajes).forEach(id => {
        miniPuntos.innerHTML += `<div class="text-white fw-bold">${nombresEquipos[id].nombre}: <span class="text-warning">${puntajes[id]}</span></div>`;
    });

    contenedorPulsadores.innerHTML = "";
    Object.keys(nombresEquipos).forEach((id, index) => {
        // Por si hay más de 4 equipos, el index % 4 repite los colores para no dar error
        const colorClass = ["btn-primary", "btn-danger", "btn-success", "btn-warning"][index % 4];
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
    
    // Frenar reloj y sonidos de forma segura
    clearInterval(intervaloRespuesta);
    if (contenedorReloj) contenedorReloj.classList.add('d-none');
    
    try {
        sonidoTension.pause();
        sonidoTension.currentTime = 0;
    } catch(e) {}

    textoPregunta.innerText = preguntaActual.pregunta;
    contadorPreguntas.innerText = `Faltan: ${preguntasDisponibles.length}`;
    mensajeEstado.innerText = "¡Esperando que un equipo pulse! ⏳";
    mensajeEstado.className = "text-warning mb-3";

    for (let i = 0; i < 4; i++) {
        const btnOpcion = document.getElementById(`op-${i}`);
        if(btnOpcion) {
            btnOpcion.innerText = preguntaActual.opciones[i];
            btnOpcion.className = "btn btn-light w-100 btn-opcion shadow";
        }
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
    
    // Auto-scroll a las opciones
    setTimeout(() => {
        contenedorOpciones.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);

    // --- LÓGICA DEL RELOJ Y SONIDO DE TENSIÓN ---
    tiempoRespuesta = 15;
    if (relojTrivia) relojTrivia.innerText = tiempoRespuesta;
    if (contenedorReloj) {
        contenedorReloj.classList.remove('d-none', 'text-danger');
        contenedorReloj.classList.add('text-white');
    }
    
    sonidoTension.play().catch(e => console.log("Bloqueado por el navegador", e));

    clearInterval(intervaloRespuesta);
    intervaloRespuesta = setInterval(() => {
        tiempoRespuesta--;
        if (relojTrivia) relojTrivia.innerText = tiempoRespuesta;

        // Cambia a rojo a los 5 segundos
        if (tiempoRespuesta <= 5 && contenedorReloj) {
            contenedorReloj.classList.replace('text-white', 'text-danger');
        }

        // Si se acaba el tiempo
        if (tiempoRespuesta <= 0) {
            tiempoAgotado();
        }
    }, 1000);
}

function verificarRespuesta(indiceElegido) {
    if (!equipoActivo) return;

    // FRENAR Y OCULTAR EL RELOJ Y LA MÚSICA DE TENSIÓN
    clearInterval(intervaloRespuesta);
    if (contenedorReloj) contenedorReloj.classList.add('d-none');
    try {
        sonidoTension.pause();
        sonidoTension.currentTime = 0;
    } catch(e) {}

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

        if (equiposBloqueados.length >= Object.keys(nombresEquipos).length) {
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

// Función cuando el contador llega a cero
function tiempoAgotado() {
    if (!equipoActivo) return;
    
    // Frena el reloj y los sonidos
    clearInterval(intervaloRespuesta);
    if (contenedorReloj) contenedorReloj.classList.add('d-none');
    try {
        sonidoTension.pause();
        sonidoTension.currentTime = 0;
    } catch(e) {}
    
    sonidoError.play().catch(e => console.log(e));

    equiposBloqueados.push(equipoActivo);
    equipoActivo = null;

    if (equiposBloqueados.length >= Object.keys(nombresEquipos).length) {
        mensajeEstado.innerText = `⏳ ¡Tiempo Agotado! Nadie acertó. La correcta era: ${preguntaActual.opciones[preguntaActual.correcta]}`;
        mensajeEstado.className = "text-danger mb-3 fw-bold";
        document.getElementById(`op-${preguntaActual.correcta}`).classList.replace('btn-light', 'btn-success');
        btnSiguiente.classList.remove('d-none');
    } else {
        mensajeEstado.innerText = `⏳ ¡Tiempo Agotado! ¡Hay REBOTE!`;
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

    if (puntajeMaximo > 0 && typeof guardarGanador === "function") {
        guardarGanador(equipoGanador, puntajeMaximo, "Trivia Familiar");
    }
    window.location.href = "podio.html";
}

document.getElementById('btn-finalizar').addEventListener('click', finalizarJuego);

// Iniciar
nuevaRonda();
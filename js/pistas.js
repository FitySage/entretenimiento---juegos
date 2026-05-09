// --- CONFIGURACIÓN ---
let puntajes = { equipo1: 0, equipo2: 0, equipo3: 0, equipo4: 0 };
const nombresEquipos = JSON.parse(localStorage.getItem('configJuego')) || {
    equipo1: { nombre: "Equipo 1" }, equipo2: { nombre: "Equipo 2" },
    equipo3: { nombre: "Equipo 3" }, equipo4: { nombre: "Equipo 4" }
};

// --- BASE DE DATOS DE PALABRAS ---
const bancoPalabras = [
    // --- PELÍCULAS ---
    {
        palabra: "MATRIX",
        pistas: [
            "Es una película de ciencia ficción de 1999.",
            "Sus directores son las hermanas Wachowski.",
            "La trama plantea que vivimos en una simulación virtual.",
            "El protagonista debe elegir entre una pastilla roja o una azul.",
            "Popularizó el efecto visual de esquivar balas en cámara lenta.",
            "Su estética incluye gafas de sol oscuras y lluvia de código verde.",
            "El personaje principal es Neo, interpretado por Keanu Reeves."
        ]
    },
    {
        palabra: "EL REY LEON",
        pistas: [
            "Es una de las películas animadas más exitosas de la historia.",
            "La banda sonora incluye canciones compuestas por Elton John.",
            "La historia está fuertemente inspirada en 'Hamlet' de Shakespeare.",
            "Ocurre en la sabana africana.",
            "Un tío malvado llamado Scar usurpa el trono.",
            "Dos de sus personajes cantan la filosofía 'Hakuna Matata'.",
            "El protagonista es un cachorro llamado Simba."
        ]
    },
    {
        palabra: "VOLVER AL FUTURO",
        pistas: [
            "Es un clásico del cine de los años 80.",
            "Su director es Robert Zemeckis.",
            "Todo ocurre en el pueblo ficticio de Hill Valley.",
            "El medio de transporte clave necesita alcanzar las 88 millas por hora.",
            "Presenta inventos icónicos como zapatillas que se atan solas y patinetas voladoras.",
            "La máquina del tiempo es un auto DeLorean.",
            "Los protagonistas son Marty McFly y el Doc Brown."
        ]
    },
    {
        palabra: "JURASSIC PARK",
        pistas: [
            "Película de 1993 basada en un libro de Michael Crichton.",
            "Dirigida por Steven Spielberg.",
            "El logo de este lugar tiene un esqueleto rojo y negro.",
            "El caos comienza cuando un empleado apaga las vallas de seguridad.",
            "El secreto científico fue extraer sangre de un mosquito atrapado en ámbar.",
            "La frase icónica es 'No escatimé en gastos'.",
            "Trata sobre un parque de atracciones lleno de dinosaurios."
        ]
    },
    {
        palabra: "TITANIC",
        pistas: [
            "Es una de las películas más premiadas en la historia de los Óscar.",
            "Incluye la exitosa canción 'My Heart Will Go On' de Céline Dion.",
            "La trama ocurre en el año 1912.",
            "Gira en torno a un collar conocido como 'El Corazón del Mar'.",
            "Al final, se debate si cabían dos personas en la tabla de madera.",
            "Cuenta la historia de amor entre una joven rica y un artista pobre.",
            "Los protagonistas son Jack (Leo DiCaprio) y Rose (Kate Winslet)."
        ]
    },

    // --- SERIES ---
    {
        palabra: "BREAKING BAD",
        pistas: [
            "Es una serie de televisión estadounidense aclamada por la crítica.",
            "Se desarrolla en Albuquerque, Nuevo México.",
            "El protagonista usa el seudónimo 'Heisenberg'.",
            "El producto que fabrican se vuelve famoso por su inusual color azul.",
            "Su co-protagonista dice la frase 'Yeah, science, bitch!'.",
            "Trata sobre un profesor de química diagnosticado con cáncer.",
            "Los personajes principales son Walter White y Jesse Pinkman."
        ]
    },
    {
        palabra: "STRANGER THINGS",
        pistas: [
            "Es una de las series más vistas en la historia de Netflix.",
            "Está fuertemente inspirada en la cultura pop, el cine y la música de los años 80.",
            "Sus personajes juegan frecuentemente a 'Calabozos y Dragones'.",
            "En el pueblo de Hawkins existe una dimensión paralela llamada 'Upside Down'.",
            "Uno de los monstruos principales se llama Demogorgon.",
            "La protagonista es una niña con poderes telequinéticos a la que le encantan los waffles.",
            "El personaje principal se llama Eleven (Once)."
        ]
    },
    {
        palabra: "LOS SIMPSON",
        pistas: [
            "Es la serie de comedia animada de mayor duración en Estados Unidos.",
            "Su creador es Matt Groening.",
            "Transcurre en la ciudad de Springfield.",
            "El bar local es atendido por un personaje llamado Moe.",
            "Sus personajes se caracterizan por tener la piel de color amarillo.",
            "El padre de la familia trabaja en una planta nuclear y ama las donas.",
            "Los miembros de la familia son Homero, Marge, Bart, Lisa y Maggie."
        ]
    },
    {
        palabra: "EL CHAVO DEL OCHO",
        pistas: [
            "Es una serie de comedia icónica de la televisión latinoamericana.",
            "Su creador y protagonista es Roberto Gómez Bolaños.",
            "Gran parte de los problemas surgen por un cobro de renta de '14 meses'.",
            "El protagonista suele esconderse adentro de un barril.",
            "Una de las frases famosas es 'Fue sin querer queriendo'.",
            "La comida favorita del personaje principal es la torta de jamón.",
            "Otros personajes incluyen a Quico, Doña Florinda y Don Ramón."
        ]
    },
    {
        palabra: "GAME OF THRONES",
        pistas: [
            "Es una serie basada en los libros de George R. R. Martin.",
            "Fue producida y transmitida por la cadena HBO.",
            "Ocurre en los continentes ficticios de Westeros y Essos.",
            "Su frase más famosa es 'El invierno se acerca' (Winter is coming).",
            "Hay un enorme muro de hielo que protege a los reinos del norte.",
            "Una de las protagonistas es conocida como 'La Madre de Dragones'.",
            "Todos luchan por sentarse en el Trono de Hierro."
        ]
    },

    // --- VIDEOJUEGOS ---
    {
        palabra: "MINECRAFT",
        pistas: [
            "Es el videojuego más vendido de todos los tiempos.",
            "Fue creado originalmente por Markus Persson (Notch).",
            "Tiene un modo 'Supervivencia' y un modo 'Creativo'.",
            "Uno de sus enemigos más icónicos explota al acercarse (Creeper).",
            "El objetivo final es viajar a la dimensión 'El Fin' y derrotar al dragón.",
            "Su mundo está formado enteramente por cubos.",
            "Tenés que picar materiales como madera, piedra, hierro y diamante."
        ]
    },
    {
        palabra: "SUPER MARIO BROS",
        pistas: [
            "Es un juego de plataformas que revolucionó la industria en los años 80.",
            "Fue creado por la compañía japonesa Nintendo.",
            "El protagonista consume champiñones mágicos para crecer.",
            "El enemigo principal es una tortuga gigante con pinchos llamada Bowser.",
            "El objetivo es rescatar a la Princesa Peach.",
            "Su protagonista lleva gorra roja, jardinero azul y tiene bigote.",
            "Su hermano viste de verde y se llama Luigi."
        ]
    },
    {
        palabra: "PAC MAN",
        pistas: [
            "Es uno de los juegos arcade más famosos de la historia.",
            "Salió al mercado en el año 1980.",
            "El jugador debe navegar por un laberinto cerrado.",
            "Se deben comer puntos pequeños y frutas para ganar puntaje.",
            "Los enemigos son cuatro fantasmas: Blinky, Pinky, Inky y Clyde.",
            "Si comes una píldora grande, los fantasmas se vuelven azules y comestibles.",
            "El protagonista es un círculo amarillo con una boca que se abre y cierra."
        ]
    },
    {
        palabra: "POKEMON",
        pistas: [
            "Es una franquicia que empezó en las consolas portátiles Game Boy.",
            "Los jugadores asumen el rol de 'Entrenadores'.",
            "Al principio del viaje debés elegir entre planta, fuego o agua.",
            "Su lema principal es '¡Atrápalos a todos!'.",
            "Para capturar criaturas se utilizan unas esferas rojas y blancas.",
            "El protagonista del anime basado en el juego es Ash Ketchum.",
            "El personaje más famoso es un ratón amarillo llamado Pikachu."
        ]
    },
    {
        palabra: "GRAND THEFT AUTO",
        pistas: [
            "Es una saga de juegos conocida por su libertad de mundo abierto.",
            "Desarrollado por la compañía Rockstar Games.",
            "Ha generado múltiples polémicas por su violencia explícita.",
            "Una de sus entregas más famosas ocurre en el estado ficticio de 'San Andreas'.",
            "Su quinta entrega (la V) rompió todos los récords de ganancias.",
            "El jugador puede robar autos, pilotar aviones y usar armas libremente.",
            "También se la conoce por sus siglas: GTA."
        ]
    },

    // --- CANTANTES / BANDAS ---
    {
        palabra: "MICHAEL JACKSON",
        pistas: [
            "Fue un cantante, compositor y bailarín estadounidense.",
            "Comenzó su carrera en un grupo musical junto a sus hermanos.",
            "Su rancho y parque de diversiones se llamaba 'Neverland'.",
            "Popularizó el paso de baile conocido como 'Moonwalk' (Caminata lunar).",
            "Solía usar sombreros fedora y un solo guante blanco brillante.",
            "Su video musical de zombies revolucionó la industria.",
            "Es mundialmente conocido como 'El Rey del Pop'."
        ]
    },
    {
        palabra: "SHAKIRA",
        pistas: [
            "Es una cantante, compositora y bailarina latinoamericana.",
            "En sus inicios, uno de sus álbumes más exitosos fue 'Pies Descalzos'.",
            "Es famosa por su habilidad para la danza del vientre.",
            "Interpretó la canción oficial del Mundial de Sudáfrica 2010 (Waka Waka).",
            "Tiene una canción reciente muy famosa que menciona relojes Casio y Twingos.",
            "Una de sus frases icónicas en inglés es 'Hips Don't Lie' (Las caderas no mienten).",
            "Es oriunda de Barranquilla, Colombia."
        ]
    },
    {
        palabra: "FREDDIE MERCURY",
        pistas: [
            "Fue un cantante y compositor británico de origen parsi.",
            "Tenía un rango vocal excepcional y una increíble presencia escénica.",
            "Lideró el histórico concierto Live Aid en el estadio de Wembley en 1985.",
            "Compuso himnos del rock como 'We Are the Champions'.",
            "Su rasgo físico más característico era su bigote.",
            "Su obra maestra mezcla rock con ópera y se titula 'Bohemian Rhapsody'.",
            "Fue el legendario cantante de la banda Queen."
        ]
    },
    {
        palabra: "SODA STEREO",
        pistas: [
            "Es una de las bandas más influyentes de la historia de Latinoamérica.",
            "Se formó en Buenos Aires, Argentina, en 1982.",
            "Su gira de despedida en 1997 se inmortalizó con la frase 'Gracias totales'.",
            "El bajista es Zeta Bosio y el baterista es Charly Alberti.",
            "Algunos de sus hits son 'Persiana Americana' y 'En la ciudad de la furia'.",
            "Fueron el sonido principal de la frase 'De música ligera'.",
            "Su histórico cantante y líder fue Gustavo Cerati."
        ]
    },
    {
        palabra: "LUIS MIGUEL",
        pistas: [
            "Es un cantante nacido en Puerto Rico, pero criado y nacionalizado en otro país.",
            "Empezó su carrera siendo tan solo un niño.",
            "Es conocido por cantar baladas, mariachi y boleros clásicos.",
            "Su vida personal estuvo marcada por la misteriosa desaparición de su madre, Marcela.",
            "Algunos de sus éxitos son 'La incondicional' y 'Culpable o no'.",
            "Tiene una serie súper exitosa en Netflix protagonizada por Diego Boneta.",
            "Es apodado 'El Sol de México'."
        ]
    },
    // --- ANIMALES ---
    {
        palabra: "ELEFANTE",
        pistas: [
            "Es un mamífero de gran tamaño.",
            "Es herbívoro y vive en manadas.",
            "Su piel es gruesa y de color grisáceo.",
            "Posee orejas muy grandes para regular su temperatura.",
            "Tiene colmillos de marfil.",
            "El mito dice que le tiene terror a los ratones.",
            "Su característica principal es su larga trompa."
        ]
    },
    {
        palabra: "PINGUINO",
        pistas: [
            "Es un animal ovíparo.",
            "Vive principalmente en el hemisferio sur.",
            "Su dieta se basa en peces y krill.",
            "Aunque es un ave, no puede volar.",
            "Es un nadador extremadamente rápido y ágil.",
            "Su plumaje blanco y negro parece un elegante esmoquin.",
            "Camina dando pasos cortos y torpes sobre el hielo."
        ]
    },
    {
        palabra: "CAMELLO",
        pistas: [
            "Es un mamífero artiodáctilo.",
            "Es conocido por su gran resistencia física.",
            "Puede beber más de 100 litros de agua en pocos minutos.",
            "Sus pestañas son largas para protegerse de las tormentas.",
            "Se lo utiliza como transporte en el Medio Oriente.",
            "A diferencia del dromedario, este tiene dos jorobas.",
            "Es el animal icónico del desierto."
        ]
    },

    // --- CULTURA GENERAL ---
    {
        palabra: "TITANIC",
        pistas: [
            "Es el nombre de un medio de transporte.",
            "Se construyó a principios del siglo XX.",
            "En su época, fue la máquina en movimiento más grande del mundo.",
            "Zarpó desde Inglaterra hacia Nueva York.",
            "Protagonizó la tragedia marítima más famosa de la historia.",
            "Se hundió tras chocar contra un iceberg.",
            "James Cameron hizo una película sobre esto con Leonardo DiCaprio."
        ]
    },
    {
        palabra: "MONA LISA",
        pistas: [
            "Es un objeto de un valor incalculable.",
            "Fue creada a principios del siglo XVI.",
            "Ha sido objeto de múltiples robos y ataques de vandalismo.",
            "Actualmente se exhibe protegida por un cristal en París.",
            "Se encuentra en el Museo del Louvre.",
            "La sonrisa de la mujer retratada es considerada 'enigmática'.",
            "Es la pintura más famosa de Leonardo da Vinci."
        ]
    },
    {
        palabra: "COLISEO",
        pistas: [
            "Es una estructura arquitectónica muy antigua.",
            "Fue construido en el siglo I d.C.",
            "Originalmente se lo conocía como Anfiteatro Flavio.",
            "Tenía capacidad para unos 65.000 espectadores.",
            "Fue escenario de ejecuciones, cazas de animales y batallas navales.",
            "Es el monumento más icónico de Italia.",
            "Era el lugar donde peleaban los gladiadores romanos."
        ]
    },

    // --- CIENCIA Y TECNOLOGÍA ---
    {
        palabra: "AGUJERO NEGRO",
        pistas: [
            "Es un fenómeno estudiado por la física y la astronomía.",
            "No se puede observar a simple vista.",
            "Stephen Hawking dedicó gran parte de su vida a estudiarlos.",
            "Suele formarse cuando una estrella masiva colapsa sobre sí misma.",
            "Deforma el espacio y el tiempo a su alrededor.",
            "Su gravedad es tan extrema que absorbe todo lo que se le acerca.",
            "Ni siquiera la luz puede escapar de él."
        ]
    },
    {
        palabra: "GRAVEDAD",
        pistas: [
            "Es un concepto fundamental de la física.",
            "Es una de las cuatro interacciones fundamentales de la naturaleza.",
            "Mantiene a los planetas en órbita alrededor del sol.",
            "Albert Einstein la describió en su Teoría de la Relatividad General.",
            "En la luna, su efecto es 6 veces menor que en la Tierra.",
            "Isaac Newton la formuló matemáticamente (supuestamente por una manzana).",
            "Es la fuerza que hace que las cosas caigan al suelo."
        ]
    },
    {
        palabra: "ADN",
        pistas: [
            "Es una molécula muy compleja.",
            "Se encuentra en el interior del núcleo de las células.",
            "Su estructura tiene forma de doble hélice.",
            "Contiene cuatro bases: adenina, timina, citosina y guanina.",
            "Es considerado el 'manual de instrucciones' de los seres vivos.",
            "Sus siglas significan Ácido Desoxirribonucleico.",
            "Determina tus rasgos genéticos, como el color de ojos y cabello."
        ]
    },

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
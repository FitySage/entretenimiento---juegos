// ==========================================
//   SISTEMA DE HISTORIAL DE GANADORES
// ==========================================

// Clave con la que guardaremos los datos en el navegador
const CLAVE_HISTORIAL = 'historial_juegos_familia';

/**
 * Guarda un nuevo ganador en el historial
 * @param {string} nombreEquipo - El nombre del jugador o equipo ganador
 * @param {number} puntos - Puntos con los que ganó
 * @param {string} juego - Nombre del juego (ej: "Pulsadores", "Adivina el Animal")
 */
function guardarGanador(nombreEquipo, puntos, juego) {
    // 1. Obtenemos el historial actual (si no hay, creamos una lista vacía)
    let historial = obtenerHistorial();

    // 2. Creamos el registro del nuevo ganador con la fecha actual
    const fechaActual = new Date();
    const nuevoRegistro = {
        equipo: nombreEquipo,
        puntos: puntos,
        juego: juego,
        fecha: fechaActual.toLocaleDateString('es-AR') + ' ' + fechaActual.getHours() + ':' + (fechaActual.getMinutes()<10?'0':'') + fechaActual.getMinutes()
    };

    // 3. Lo agregamos al principio de la lista
    historial.unshift(nuevoRegistro);

    // 4. Guardamos la lista convertida a texto en localStorage
    localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));
    
    console.log("¡Ganador guardado en el historial!", nuevoRegistro);
}

/**
 * Obtiene la lista completa de ganadores
 * @returns {Array} Lista de objetos con los ganadores
 */
function obtenerHistorial() {
    const datosGuardados = localStorage.getItem(CLAVE_HISTORIAL);
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    } else {
        return []; // Retorna lista vacía si es la primera vez
    }
}

/**
 * Borra todo el historial
 */
function borrarHistorial() {
    if(confirm("¿Estás seguro de que querés borrar todo el historial de ganadores?")) {
        localStorage.removeItem(CLAVE_HISTORIAL);
        alert("Historial borrado.");
        // Si hay una tabla mostrándose, la actualizamos
        const contenedor = document.getElementById('tabla-historial');
        if(contenedor) renderizarHistorial('tabla-historial');
    }
}

/**
 * Dibuja el historial en la pantalla (HTML)
 * @param {string} idContenedor - El ID del <tbody> donde se insertarán las filas
 */
function renderizarHistorial(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    const historial = obtenerHistorial();
    contenedor.innerHTML = ""; // Limpiamos antes de dibujar

    if (historial.length === 0) {
        contenedor.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">Todavía no hay campeones registrados. ¡A jugar!</td></tr>`;
        return;
    }

    // Dibujamos una fila por cada ganador
    historial.forEach((registro, index) => {
        // Agregamos una medallita al top 3
        let medalla = "";
        if(index === 0) medalla = "🥇 ";
        if(index === 1) medalla = "🥈 ";
        if(index === 2) medalla = "🥉 ";

        contenedor.innerHTML += `
            <tr>
                <td class="fw-bold text-warning">${medalla}</td>
                <td class="fw-bold">${registro.equipo}</td>
                <td><span class="badge bg-success fs-6">${registro.puntos} pts</span></td>
                <td class="text-muted">${registro.juego}</td>
                <td class="text-muted small">${registro.fecha}</td>
            </tr>
        `;
    });
}
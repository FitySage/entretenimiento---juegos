// Solo maneja el guardado de los nombres de los equipos
function guardarConfiguracion() {
    const config = {
        equipo1: { 
            nombre: document.getElementById('name-1').value || "Equipo 1", 
            integrantes: document.getElementById('members-1').value 
        },
        equipo2: { 
            nombre: document.getElementById('name-2').value || "Equipo 2", 
            integrantes: document.getElementById('members-2').value 
        },
        equipo3: { 
            nombre: document.getElementById('name-3').value || "Equipo 3", 
            integrantes: document.getElementById('members-3').value 
        },
        equipo4: { 
            nombre: document.getElementById('name-4').value || "Equipo 4", 
            integrantes: document.getElementById('members-4').value 
        }
    };
    
    localStorage.setItem('configJuego', JSON.stringify(config));
    alert("¡Configuración guardada! Ya pueden elegir un juego.");
}

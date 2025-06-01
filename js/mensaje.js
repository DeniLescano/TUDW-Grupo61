export function guardarMensaje(mensaje) {
    const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
    mensajes.push(mensaje);
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
}

export function obtenerMensajes() {
    return JSON.parse(localStorage.getItem('mensajes')) || [];
}
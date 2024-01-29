// Enviar el nombre de usuario al cargar la página
const socket = io();
socket.emit('usuario_conectado', $('#nombre').val());

document.querySelector('#loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombreUsuario = document.getElementById('nombre').value;

    // Enviar el nombre de usuario al servidor de sockets al enviar el formulario
    socket.emit('usuario_conectado', nombreUsuario);

    // Redireccionar después de enviar el formulario
    window.location.href = '/';
});

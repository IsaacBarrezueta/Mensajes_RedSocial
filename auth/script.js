// Comentaremos la línea que emite el nombre de usuario al cargar la página
// socket.emit('usuario_conectado', $('#nombre').val());

document.querySelector('#loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombreUsuario = document.getElementById('nombre').value;
    const userID = document.getElementById('ID').value;

    // Enviar el nombre de usuario y el ID al servidor de sockets al enviar el formulario
    socket.emit('usuario_conectado', { nombreUsuario, userID });

    // Redireccionar después de enviar el formulario
    window.location.href = '/';
});

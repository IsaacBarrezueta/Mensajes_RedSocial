const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Manejar conexiones de WebSockets
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Manejar eventos de chat
    socket.on('mensaje', (mensaje) => {
        console.log('Mensaje recibido:', mensaje);

        // Enviar el mensaje a todos los clientes conectados
        io.emit('mensaje', mensaje);
    });
});

// Añadir soporte para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Manejar solicitudes POST para mensajes AJAX
app.post('/enviar-mensaje', (req, res) => {
    const mensaje = req.body.mensaje;
    console.log('Mensaje recibido (AJAX):', mensaje);

    // Enviar el mensaje a todos los clientes conectados
    io.emit('mensaje', mensaje);

    res.send('Mensaje enviado correctamente');
});


// Servir la página HTML estática
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
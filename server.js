const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.json());

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    socket.on('usuario_conectado', (nombreUsuario) => {
        console.log(`Usuario ${nombreUsuario} conectado`);
        socket.nombreUsuario = nombreUsuario;
        io.emit('mensaje', { nombreUsuario: 'Sistema', mensaje: `Bienvenido, ${nombreUsuario}!` });
    });

    socket.on('mensaje', (mensaje) => {
        console.log('Mensaje recibido:', mensaje);
        io.emit('mensaje', { nombreUsuario: socket.nombreUsuario, mensaje: mensaje });
    });
    
});

app.post('/enviar-mensaje', (req, res) => {
    const mensaje = req.body.mensaje;
    const nombreUsuario = req.body.nombreUsuario;

    console.log('Mensaje recibido (AJAX):', mensaje);

    io.emit('mensaje', { nombreUsuario, mensaje });

    res.send('Mensaje enviado correctamente');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chats/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/auth/login.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

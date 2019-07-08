const express = require('express');
const path = require('path');

const todos = require('./routes/api/todos');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// Middleware de Bodyparser
app.use(express.json());

// Rutas
app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/api/auth', auth);


// Configuracion para produccion
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`El servidor esta corriendo en el puerto ${port}`));




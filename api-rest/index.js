import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';


//agragamos el modulo de mongoose
const app = express();
//declaracion de puertos
const PORT = 3210;

app.use(cors());
app.use(bodyParser.json());

//funciones flecha para ver que puerto 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Esta es la api del caso de estudio 12 para viajes, usuarios y destinos');
});

app.get('/', (req, res) => {
    res.send('En consruccion');
});

//conectar a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'dbViajesDestinosUsuarios'
});
//bd coneccion parte 2 
db.connect((err) => {
    if (err) {
        console.log('Mysql  no se pudo conectar conectado');
        throw err;
    }
    console.log('Mysql conectado');
});
//////////////////////////////////////////////
// Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    const { nombre, correo } = req.body;
    const query = 'INSERT INTO Usuarios (nombre, correo) VALUES (?, ?)';
    db.query(query, [nombre, correo], (error, results) => {
        if (error) {
            res.status(500).send('Error al crear el usuario');
            return;
        }
        res.status(200).json('Usuario creado exitosamente');
    });
});
// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM Usuarios';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener los usuarios');
            return;
        }
        res.status(200).json(results);
    });
});
// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Usuarios WHERE id_usuario = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el usuario');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Usuario no encontrado');
            return;
        }
        res.status(200).json('Usuario eliminado exitosamente');
    });
});

//////////////////////////////////////////////
// Crear un nuevo destino
app.post('/destinos', (req, res) => {
    const { nombre, ubicacion } = req.body;
    const query = 'INSERT INTO Destinos (nombre, ubicacion) VALUES (?, ?)';
    db.query(query, [nombre, ubicacion], (error, results) => {
        if (error) {
            res.status(500).send('Error al crear el destino');
            return;
        }
        res.status(200).json('Destino creado exitosamente');
    });
});
// Obtener todos los destinos
app.get('/destinos', (req, res) => {
    const query = 'SELECT * FROM Destinos';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener los destinos');
            return;
        }
        res.status(200).json(results);
    });
});
// Eliminar un destino
app.delete('/destinos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Destinos WHERE id_destino = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el destino');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Destino no encontrado');
            return;
        }
        res.status(200).json('Destino eliminado exitosamente');
    });
});
// Crear un nuevo favorito
app.post('/favoritos', (req, res) => {
    const { id_usuario, id_destino } = req.body;
    const query = 'INSERT INTO Favoritos (id_usuario, id_destino) VALUES (?, ?)';
    db.query(query, [id_usuario, id_destino], (error, results) => {
        if (error) {
            res.status(500).send('Error al crear el favorito');
            return;
        }
        res.status(200).json('Favorito creado exitosamente');
    });
});
// Obtener todos los favoritos
app.get('/favoritos', (req, res) => {
    const query = 'SELECT * FROM Favoritos';
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener los favoritos');
            return;
        }
        res.status(200).json(results);
    });
});
// Eliminar un favorito
app.delete('/favoritos', (req, res) => {
    const { id_usuario, id_destino } = req.body;
    const query = 'DELETE FROM Favoritos WHERE id_usuario = ? AND id_destino = ?';
    db.query(query, [id_usuario, id_destino], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el favorito');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Favorito no encontrado');
            return;
        }
        res.status(200).json('Favorito eliminado exitosamente');
    });
});
//////////////////////////////////////////////
app.get('/libros', (req, res) => {
    const query = 'SELECT * FROM Usuarios';
    db.query(query, (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los Usuarios');
            return;
        }else{
            res.status(200).json(rows);
        }
    });
});

app.get('/destinos', (req, res) => {
    const query = 'SELECT * FROM Destinos';
    db.query(query, (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los destinos');
            return;
        }else{
            res.status(200).json(rows);
        }
    });
});



//actualizar un libro
app.put('/libros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, paginas } = req.body;
    const query = `UPDATE libros SET titulo = ?, autor = ?, paginas = ? WHERE id = ?`;
    db.query(query, [titulo, autor, paginas, id], (err, results) => {
        if (results.affectedRows === 0) {
            res.status(404).send('Libro no encontrado');
            return;
        }
        if (err) {
            res.status(500).send('Error al actualizar un libro');
            return;
        }else{
            res.status(200).send('Libro actualizado');
        }
    });
});
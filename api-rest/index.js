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

//creando apartado de create para un crud
app.post('/usuarios/', (req, res) => {
    const { titulo, autor, editorial, no_paginas, anio_publicacion, stock, estado } = req.body;
    const query = 'INSERT INTO libros (titulo, autor, editorial, no_paginas, anio_publicacion, stock, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [titulo, autor, editorial, no_paginas, anio_publicacion, stock, estado],
        (error, results) => {
            if (error) {
                res.status(500).send('Error al ejecutar la consulta');
                return;
            } else {
                res.status(200).json('Libro creado exitosamente');
            }
        }
    );
});
//aramndo parte del delete
app.delete('/libros/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM libros WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el libro');
            return;
        } 
        if (results.affectedRows === 0) {
            res.status(404).send('Libro no encontrado');
        } 
            res.status(200).json('Libro eliminado exitosamente');
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
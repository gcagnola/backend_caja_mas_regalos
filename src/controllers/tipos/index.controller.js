const { Pool } = require('pg');

const pool = new Pool({
    user: 'gcagnola',
    host: '192.168.0.60',
    password: 'jumanji',
    database: 'cajas-mas-regalos',
    port: '5432'
});

const getTipos = async ( req, res ) => {
    try {
        const respuesta = await pool.query('SELECT * FROM tipos ORDER BY id_tipo ASC');
        res.json(respuesta.rows);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const createTipo= async (req, res) => {
    try {
        const { nombre } = req.body;
        const response = await pool.query('INSERT INTO tipos (nombre) VALUES ($1)', [nombre]);
        res.json({
            message: 'Tipo creado',
            body: {
                tipos: {nombre}
            }
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getTipoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('SELECT * FROM tipos WHERE id_tipo = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }    
};

const deleteTipo = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM tipos where id_tipo = $1', [id]);
        res.json(`Id_Tipo ${id} eliminado`);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }    
};

const updateTipo = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre } = req.body;
        const response = await pool.query('UPDATE tipos SET nombre = $1 WHERE id_tipo = $2', [
            nombre,
            id
        ]);
        res.json('Tipo actualizado');
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }    
};

module.exports = {
    getTipos,
    createTipo,
    getTipoById,
    deleteTipo,
    updateTipo
};
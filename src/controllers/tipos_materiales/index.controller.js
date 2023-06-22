const { Pool } = require('pg');

const pool = new Pool({
    user: 'gcagnola',
    host: '192.168.0.60',
    password: 'jumanji',
    database: 'cajas-mas-regalos',
    port: '5432'
});

const getTiposMateriales = async ( req, res ) => {
    try {
        const respuesta = await pool.query('SELECT * FROM tipos_materiales ORDER BY id_tipo_material ASC');
        res.json(respuesta.rows);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const createTipoMaterial = async (req, res) => {
    try {
        const { nombre } = req.body;
        const response = await pool.query('INSERT INTO tipos_materiales (nombre) VALUES ($1)', [nombre]);
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

const getTipoByIdMaterial = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('SELECT * FROM tipos_materiales WHERE id_tipo_material = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }    
};

const deleteTipoMaterial = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM tipos_materiales where id_tipo_material = $1', [id]);
        res.json(`Id_Tipo ${id} eliminado`);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }    
};

const updateTipoMaterial = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre } = req.body;
        const response = await pool.query('UPDATE tipos_materiales SET nombre = $1 WHERE id_tipo_material = $2', [
            nombre,
            id
        ]);
        res.json('Tipo actualizado');
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }    
};

module.exports = {
    getTiposMateriales,
    createTipoMaterial,
    getTipoByIdMaterial,
    deleteTipoMaterial,
    updateTipoMaterial
};
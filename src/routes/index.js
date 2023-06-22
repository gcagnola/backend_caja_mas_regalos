const { Router } = require('express');
const rutas = Router();

const { 
    getTipos,
    createTipo,
    getTipoById,
    deleteTipo,
    updateTipo
} = require('../controllers/tipos/index.controller.js');


const { 
    getTiposMateriales,
    createTipoMaterial,
    getTipoByIdMaterial,
    deleteTipoMaterial,
    updateTipoMaterial
} = require('../controllers/tipos_materiales/index.controller.js');

rutas.get('/tipos', getTipos);
rutas.post('/tipos', createTipo);
rutas.get('/tipos/:id', getTipoById);
rutas.delete('/tipos/:id', deleteTipo);
rutas.put('/tipos/:id', updateTipo)


rutas.get('/tipos_materiales', getTiposMateriales);
rutas.post('/tipos_materiales', createTipoMaterial);
rutas.get('/tipos_materiales/:id', getTipoByIdMaterial);
rutas.delete('/tipos_materiales/:id', deleteTipoMaterial);
rutas.put('/tipos_materiales/:id', updateTipoMaterial);

module.exports = rutas;
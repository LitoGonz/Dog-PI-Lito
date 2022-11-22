const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogs = require('./dogs')
const temperaments = require('./temperaments')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', dogs)
router.use('/',temperaments)



module.exports = router;

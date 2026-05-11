import express from 'express';

const {
    getAllPembicara,
    createPembicara
} = require('../controllers/pembicaraController');

const router = express.Router();

router.get('/', getAllPembicara);
router.post('/', createPembicara);
router.get('/:id', getAllPembicara);
router.put('/:id', createPembicara);
router.delete('/:id', createPembicara);


export default router;
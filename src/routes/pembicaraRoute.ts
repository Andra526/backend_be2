import express from 'express';
// Ganti require menjadi import
import {
    getAllPembicara,
    createPembicara
} from '../controllers/pembicaraController.js'; // Tambahkan .js di akhir jika pakai type: module

const router = express.Router();

router.get('/', getAllPembicara);
router.post('/', createPembicara);
// Tip: Pastikan di controller sudah ada fungsi getById, update, dan delete ya
router.get('/:id', getAllPembicara); 
router.put('/:id', createPembicara);
router.delete('/:id', createPembicara);

export default router;
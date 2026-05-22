import express from 'express';
import {
    getAllPembicara,
    createPembicara,
    getPembicaraById,    // Tambahkan ini
    updatePembicaraById, // Tambahkan ini
    deletePembicaraById  // Tambahkan ini
} from '../controllers/pembicaraController.js'; 

const router = express.Router();

router.get('/', getAllPembicara);
router.post('/', createPembicara);
router.get('/:id', getPembicaraById);     // Harus memanggil getPembicaraById
router.put('/:id', updatePembicaraById);  // Harus memanggil updatePembicaraById
router.delete('/:id', deletePembicaraById); // Harus memanggil deletePembicaraById

export default router;
// src/routes/userRoute.ts
import express from 'express';
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    login, 
    updateUser, 
    deleteUser 
} from '../controllers/UserController.js';

const router = express.Router();

// Route untuk manajemen user
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Route untuk Auth (Registrasi dan Login)
router.post('/', createUser);      // Gunakan ini untuk mendaftar (Registrasi)
router.post('/login', login);      // Gunakan ini untuk masuk (Login)

// Route untuk update dan hapus
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
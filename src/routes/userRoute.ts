// src/routes/userRoute.ts
import express from 'express';
// Tambahkan updateUser di dalam kurung kurawal ini:
import { getAllUsers, createUser, deleteUser, updateUser, getUserById } from '../controllers/UserController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser); // Sekarang error akan hilang karena updateUser sudah diimpor
router.get('/:id', getUserById);

export default router;
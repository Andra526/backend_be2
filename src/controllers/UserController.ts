import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// GET: Mengambil semua user
export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// GET: Mengambil satu user berdasarkan ID (PENTING UNTUK EDIT PAGE)
export const getUserById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    });
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data user" });
  }
};

// POST: Membuat user baru (dengan password hashing)
export const createUser = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { 
        username, 
        password: hashedPassword 
      }
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal membuat user" });
  }
};

// PUT: Update user (password hanya diupdate jika diisi)
export const updateUser = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  
  try {
    let dataUpdate: any = { username };

    // Hanya hash dan update password jika user mengirim password baru
    if (password && password !== "") {
      dataUpdate.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataUpdate
    });
    
    res.json({ message: "User berhasil diupdate", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengupdate user" });
  }
};

// DELETE: Hapus user
export const deleteUser = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ 
      where: { id: Number(id) } 
    });
    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus user" });
  }
};
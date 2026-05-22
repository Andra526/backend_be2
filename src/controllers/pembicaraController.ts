import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper validasi ID
const validateId = (id: string) => {
    const parsedId = parseInt(id);
    return isNaN(parsedId) ? null : parsedId;
};

// 1. Menampilkan semua pembicara
export const getAllPembicara = async (req: Request, res: Response) => {
    try {
        const pembicara = await prisma.pembicara.findMany();
        res.json(pembicara);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data pembicara", error });
    }
};

// 2. Menyimpan pembicara baru
export const createPembicara = async (req: Request, res: Response) => {
    try {
        const { nama, keahlian } = req.body;
        if (!nama) return res.status(400).json({ message: "Nama wajib diisi" });

        const newPembicara = await prisma.pembicara.create({
            data: { nama, keahlian },
        });
        res.status(201).json(newPembicara);
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan pembicara", error });
    }
};

// 3. Menampilkan pembicara berdasarkan id
export const getPembicaraById = async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) return res.status(400).json({ message: "ID tidak valid" });

        const pembicara = await prisma.pembicara.findUnique({ where: { id } });
        if (!pembicara) return res.status(404).json({ message: "Pembicara tidak ditemukan" });

        res.json(pembicara);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil pembicara", error });
    }
};

// 4. Update pembicara
export const updatePembicaraById = async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) return res.status(400).json({ message: "ID tidak valid" });
        
        const { nama, keahlian } = req.body;
        const updated = await prisma.pembicara.update({
            where: { id },
            data: { nama, keahlian },
        });
        res.json(updated);
    } catch (error) {
        res.status(404).json({ message: "Pembicara tidak ditemukan/Gagal update", error });
    }
};

// 5. Hapus pembicara
export const deletePembicaraById = async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) return res.status(400).json({ message: "ID tidak valid" });

        await prisma.pembicara.delete({ where: { id } });
        res.json({ message: "Pembicara berhasil dihapus" });
    } catch (error) {
        res.status(404).json({ message: "Pembicara tidak ditemukan", error });
    }
};
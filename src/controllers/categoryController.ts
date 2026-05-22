import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper untuk validasi ID
const validateId = (id: string) => {
    const parsedId = parseInt(id);
    return isNaN(parsedId) ? null : parsedId;
};

// 3. Menampilkan data category berdasarkan id
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) return res.status(400).json({ message: "ID tidak valid" });

        const category = await prisma.category.findUnique({ where: { id } });
        
        if (!category) return res.status(404).json({ message: "Category tidak ditemukan" });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil category", error });
    }
};

// 4. Mengupdate data category berdasarkan id
export const updateCategoryById = async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) return res.status(400).json({ message: "ID tidak valid" });
        
        const { nama } = req.body;
        if (!nama) return res.status(400).json({ message: "Nama harus diisi" });
        
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: { nama },
        });
        res.json(updatedCategory);
    } catch (error) {
        // Cek apakah error karena ID tidak ditemukan (Prisma Error Code P2025)
        res.status(404).json({ message: "Category tidak ditemukan atau gagal update", error });
    }
};

// 5. Menghapus data category
export const deleteCategoryById = async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) return res.status(400).json({ message: "ID tidak valid" });

        await prisma.category.delete({ where: { id } });
        res.json({ message: "Category berhasil dihapus" });
    } catch (error) {
        res.status(404).json({ message: "Category tidak ditemukan atau gagal hapus", error });
    }
};
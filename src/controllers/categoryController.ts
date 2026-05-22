import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Menampilkan semua category
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 2. Menyimpan data category baru
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { nama } = req.body;
        if (!nama) return res.status(400).json({ message: "Nama harus diisi" });

        const newCategory = await prisma.category.create({
            data: { nama },
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan", error });
    }
};

// 3. Menampilkan data category berdasarkan id
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
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
        const id = parseInt(req.params.id);
        const { nama } = req.body;
        
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: { nama },
        });
        res.json(updatedCategory);
    } catch (error) {
        res.status(404).json({ message: "Category tidak ditemukan/Gagal update", error });
    }
};

// 5. Menghapus data category
export const deleteCategoryById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.category.delete({ where: { id } });
        res.json({ message: "Category berhasil dihapus" });
    } catch (error) {
        res.status(404).json({ message: "Category tidak ditemukan", error });
    }
};
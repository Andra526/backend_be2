import type { Request, Response } from "express";
import type { Category } from "../types/category";

let categories: Category[] = []; // In-memory array to store categories

//1.menampilkan semua category
export const getAllCategories = (req: Request, res: Response) => {
    res.json(categories);
};
//2.menyimpan data category baru
export const createCategory = (req: Request, res: Response) => {
    try {
        const { nama } = req.body;  
        //validasi jika data belum disii
        if (!nama) {
            return res.status(400).json({ message: "Nama harus diisi" });
        }
        //jika data sudah sudah valid
        const newCategory: Category = {
            id: categories.length + 1, //generate id secara sederhana
            nama
        };  
        //simpan category baru ke array
        categories.push(newCategory);
        //kirim response dengan category yang baru dibuat
        res.status(201).json(newCategory);
    } catch (error) {
        //jika terjadi error, kirim response error
        res
        .status(500)
        .json({ message: "Terjadi kesalahan saat membuat category", error });   
    }
};  

//3.menampilkan data category berdasarkan id
export const getCategoryById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const category = categories.find(c => c.id === id); 
        if (!category) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }   
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil category", error });
    }
};

//4.mengupdate data category berdasarkan id
export const updateCategoryById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { nama } = req.body;
        const categoryIndex = categories.findIndex(c => c.id === id);   
        if (categoryIndex === -1) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }
        if (!nama) {
            return res.status(400).json({ message: "Nama harus diisi" });
        }
        categories[categoryIndex].nama = nama; //update nama category
        res.json(categories[categoryIndex]);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengupdate category", error });
    }
};

//5.menghapus data category berdasarkan id
export const deleteCategoryById = (req: Request, res: Response) => {  
    try {
        const id = parseInt(req.params.id);
        const categoryIndex = categories.findIndex(c => c.id === id);
        if (categoryIndex === -1) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }
        categories.splice(categoryIndex, 1); //hapus category dari array
        res.json({ message: "Category berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus category", error });
    }   
};


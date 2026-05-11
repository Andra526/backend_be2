import express from "express";

import { 
    getAllCategories, 
    createCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} from "../controllers/categoryController"; 

const router = express.Router();

router.get("/", getAllCategories); //1.menampilkan semua category
router.post("/", createCategory); //2.menyimpan data category baru
router.get("/:id", getCategoryById); //3.menampilkan data category berdasarkan id
router.put("/:id", updateCategoryById); //4.mengupdate data category berdasarkan id
router.delete("/:id", deleteCategoryById); //5.menghapus data category berdasarkan id

export default router;

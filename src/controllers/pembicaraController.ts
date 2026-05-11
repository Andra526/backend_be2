import type { Request, Response } from 'express';
import type { Category } from '../types/category';   

// Menggunakan nama variabel 'dataPembicara' agar tidak bentrok dengan nama fungsi/logic
let dataPembicara: any[] = []; 

// 1. Menampilkan semua pembicara
export const getAllPembicara = (req: Request, res: Response) => {
    res.json(dataPembicara);
};  

// 2. Menyimpan data pembicara baru
export const createPembicara = (req: Request, res: Response) => {
    try {
        // Tambahkan topik dan eventId dari req.body
        const { nama, topik, eventId } = req.body;

        // Validasi: pastikan semua field diisi
        if (!nama || !topik || !eventId) {
            return res.status(400).json({ 
                message: "Nama, topik, dan event ID harus diisi" 
            });
        }

        const newPembicara = {
            id: dataPembicara.length + 1,
            nama,
            topik,
            eventId
        };

        // Simpan ke array
        dataPembicara.push(newPembicara);

        // Kirim response sukses
        res.status(201).json(newPembicara);
    } catch (error) {
        res.status(500).json({ 
            message: "Terjadi kesalahan saat membuat pembicara", 
            error 
        });   
    }
};

// 3. Menampilkan data pembicara berdasarkan id
export const getPembicaraById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const findPembicara = dataPembicara.find((p) => p.id === id);

        if (!findPembicara) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }

        res.json(findPembicara);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data pembicara", error });
    }
};

// 4. Mengupdate data pembicara berdasarkan id
export const updatePembicaraById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { nama, topik, eventId } = req.body;
        const index = dataPembicara.findIndex((p) => p.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }

        // Update data yang ada
        dataPembicara[index] = { 
            ...dataPembicara[index], 
            nama: nama || dataPembicara[index].nama,
            topik: topik || dataPembicara[index].topik,
            eventId: eventId || dataPembicara[index].eventId
        };

        res.json(dataPembicara[index]);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengupdate data pembicara", error });
    }
};

// 5. Menghapus data pembicara berdasarkan id
export const deletePembicaraById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const index = dataPembicara.findIndex((p) => p.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }

        dataPembicara.splice(index, 1);
        res.json({ message: "Pembicara berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus data pembicara", error });
    }
};
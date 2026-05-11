import type { Request, Response } from "express";
import type { Event } from "../types/event";  

let events: Event[] = []; // In-memory array to store events

//1.menampilkan semua event 
export const getAllEvents = (req: Request, res: Response) => {
    res.json(events);
};
    ``
//2.menyimpan data event baru
export const createEvent = (req: Request, res: Response) => {
    try {
        const { nama, tanggal, lokasi } = req.body;     
        //validasi jika data belum disii
        if (!nama || !tanggal || !lokasi) {
            return res.status(400).json({ message: "Nama, tanggal, dan lokasi harus diisi" });
        }
        //jika data sudah sudah valid
        const newEvent: Event = {
            id: events.length + 1, //generate id secara sederhana
            nama,
            tanggal: new Date(tanggal), //konversi string ke Date
            location: lokasi
        };
        //simpan event baru ke array
        events.push(newEvent);
        //kirim response dengan event yang baru dibuat
        res.status(201).json(newEvent);
    }
    catch (error) {
        //jika terjadi error, kirim response error
        res       .status(500)  
        .json({ message: "Terjadi kesalahan saat membuat event", error });
    }   
};

//3.menampilkan data event berdasarkan id
export const getEventById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const event = events.find(e => e.id === id);
        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data event", error });
    }
};

//4.mengupdate data event berdasarkan id
export const updateEventById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { nama, tanggal, lokasi } = req.body;
        const eventIndex = events.findIndex(e => e.id === id);  
        if (eventIndex === -1) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }
        if (!nama || !tanggal || !lokasi) {
            return res.status(400).json({ message: "Nama, tanggal, dan lokasi harus diisi" });
        }
        events[eventIndex] = {
            ...events[eventIndex],
            nama,
            tanggal: new Date(tanggal),
            location: lokasi
        };
        res.json(events[eventIndex]);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengupdate data event", error });
    }       
};

//5.menghapus data event berdasarkan id
export const deleteEventById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const eventIndex = events.findIndex(e => e.id === id);  
        if (eventIndex === -1) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }
        events.splice(eventIndex, 1); //hapus event dari array
        res.json({ message: "Event berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus data event", error });
    }
};
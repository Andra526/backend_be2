import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper validasi ID
const validateId = (id: string) => {
    const parsedId = parseInt(id);
    return isNaN(parsedId) ? null : parsedId;
};

// 1. Menampilkan semua event
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data event", error });
    }
};

// 2. Menyimpan event baru
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { nama, tanggal, lokasi } = req.body;
        if (!nama || !tanggal) {
            return res.status(400).json({ message: "Nama dan tanggal harus diisi" });
        }

        const newEvent = await prisma.event.create({
            data: { nama, tanggal, lokasi },
        });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan event", error });
    }
};

// 3. Menampilkan event berdasarkan id
export const getEventById = async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) return res.status(400).json({ message: "ID tidak valid" });

        const event = await prisma.event.findUnique({ where: { id } });
        if (!event) return res.status(404).json({ message: "Event tidak ditemukan" });

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil event", error });
    }
};

// 4. Update event
export const updateEventById = async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) return res.status(400).json({ message: "ID tidak valid" });
        
        const { nama, tanggal, lokasi } = req.body;
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: { nama, tanggal, lokasi },
        });
        res.json(updatedEvent);
    } catch (error) {
        res.status(404).json({ message: "Event tidak ditemukan/Gagal update", error });
    }
};

// 5. Hapus event
export const deleteEventById = async (req: Request, res: Response) => {
    try {
        const id = validateId(req.params.id);
        if (id === null) return res.status(400).json({ message: "ID tidak valid" });

        await prisma.event.delete({ where: { id } });
        res.json({ message: "Event berhasil dihapus" });
    } catch (error) {
        res.status(404).json({ message: "Event tidak ditemukan", error });
    }
};
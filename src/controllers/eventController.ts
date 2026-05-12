import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Menampilkan semua event dari database
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: { createdAt: 'desc' } // Urutkan dari yang terbaru
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data event", error });
    }
};

// 2. Menyimpan data event baru ke database
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, categoryId, location, dateEvent, description } = req.body;

        if (!name || !location || !dateEvent) {
            return res.status(400).json({ message: "Nama, lokasi, dan tanggal harus diisi" });
        }

        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId,
                location,
                dateEvent: new Date(dateEvent),
                description
            }
        });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat membuat event", error });
    }
};

// 3. Menampilkan data event berdasarkan ID
export const getEventById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const event = await prisma.event.findUnique({
            where: { id }
        });

        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data event", error });
    }
};

// 4. Mengupdate data event berdasarkan ID
export const updateEventById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, categoryId, location, dateEvent, description } = req.body;

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name,
                categoryId,
                location,
                dateEvent: dateEvent ? new Date(dateEvent) : undefined,
                description
            }
        });

        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate event. Pastikan ID benar.", error });
    }
};

// 5. Menghapus data event berdasarkan ID
export const deleteEventById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.event.delete({
            where: { id }
        });
        res.json({ message: "Event berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus event. Pastikan ID benar.", error });
    }
};
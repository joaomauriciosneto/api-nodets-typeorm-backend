import { Request, Response } from "express";
import { roomRepository } from "../repositories/room.Repository";
import { subjectRepository } from "../repositories/subject.Repository";
import { videoRepository } from "../repositories/video.Repository";

export class RoomController {

    async create(req: Request, res: Response) {

        const {name, description} = req.body;

        if(!name) {
            return res.status(400).send({
                ok: false,
                message: 'Name not provided!'
            })
        }

        if(!description) {
            return res.status(400).send({
                ok: false,
                message: 'Description not provided!'
            })
        }

        try {

            const newRoom = roomRepository.create({
                name,
                description
            })

            await roomRepository.save(newRoom);

            return res.status(201).send({
                ok: true,
                message: 'Room created successfully!',
                data: newRoom
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    async createVideo(req: Request, res: Response) {

        const {title, url} = req.body;
        const {idRoom} = req.params;

        if(!title) {
            return res.status(400).send({
                ok: false,
                message: 'Title not provided!'
            })
        }

        if(!url) {
            return res.status(400).send({
                ok: false,
                message: 'Url not provided!'
            })
        }

        try {

            const room = await roomRepository.findOneBy({id: Number(idRoom)})

            if(!room) {
                return res.status(404).send({
                    ok: false,
                    message: 'Room not found!'
                })
            }

            const newVideo = videoRepository.create({
                title,
                url,
                room
            })
            
            await videoRepository.save(newVideo);

            return res.status(201).send({
                ok: true,
                messae: 'Video created successfully!',
                data: newVideo
            })

        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    async roomSubjectCreate(req: Request, res: Response) {

        const {subject_id} = req. body;
        const {idRoom } = req.params;

        try {

            const room = await roomRepository.findOneBy({id: Number(idRoom)})

            if(!room) {
                return res.status(404).send({
                    ok: false,
                    message: 'Room not found!'
                })
            }

            const subject = await subjectRepository.findOneBy({id: Number(subject_id)})

            if(!subject) {
                return res.status(404).send({
                    ok: false,
                    message: 'Subject not found!'
                })
            }

            const roomUpdate = {
                ...room,
                subjects: [subject]
            }

            await roomRepository.save(roomUpdate)

            return res.status(204).send({
                ok: true,
                message: 'The course has been successfully added to the class!',
                data: room
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    async list(req: Request, res: Response) {

        try {

            const rooms = await roomRepository.find({
                // relations são os relacionamentos
                relations: {
                    subjects: true,
                    videos: true
                }
            })

            return res.status(200).send({
                ok: true,
                message: 'Listing all classes!',
                data: rooms
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

}
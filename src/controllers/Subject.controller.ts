import { Request, Response } from "express";
import { subjectRepository } from "../repositories/subject.Repository";

export class SubjectController {

    // criar disciplina
    async create(req: Request, res: Response){
        const {name} = req.body;

        if(!name) {
            return res.status(400).send({
                ok: false,
                message: 'Name not provided!'
            })
        }

        try {

            // basta colocar "name", pq é o mesmo nome da constante que foi criada acima
            const newSubject = subjectRepository.create({name})

            await subjectRepository.save(newSubject);
            
            return res.status(201).send({
                ok: true,
                message: 'Course created successfully!',
                data: newSubject
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
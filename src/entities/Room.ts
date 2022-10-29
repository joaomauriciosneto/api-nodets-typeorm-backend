import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./Subject";
import { Video } from "./Video";

// essa @Entity, cria a tabela com esse nome 'rooms'
@Entity('rooms')
export class Room {

    // esse decoration, faz o id ficar como autoincremento e chave primária
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text', nullable: true})
    description: string

    // relacionamento 1 -- n (o inverso de Video.ts)
    @OneToMany(() => Video, video => video.room)
    videos: Video[]

    @ManyToMany(() => Subject, subject => subject.rooms)
    subjects: Subject[]

}
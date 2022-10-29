import { Router } from "express";
import { RoomController } from "./controllers/Room.controller";
import { SubjectController } from "./controllers/Subject.controller";

export const routes = Router();

routes.post('/subject', new SubjectController().create);

routes.post('/room', new RoomController().create);

routes.post('/room/:idRoom/create', new RoomController().createVideo);

routes.post('/room/:idRoom/subject', new RoomController().roomSubjectCreate);

routes.get('/room', new RoomController().list);
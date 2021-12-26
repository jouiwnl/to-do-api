import { Router } from 'express';
import { LaneController } from './controllers/LaneController';

const routes = Router();

routes.post("/lanes", new LaneController().handleRegister);
routes.get("/lanes", new LaneController().handleFindAll);
routes.get("/lanes/:id", new LaneController().handleFindById);
routes.delete("/lanes/:id", new LaneController().handleDelete);
routes.put("/lanes/:id", new LaneController().handleUpdate);

export { routes };
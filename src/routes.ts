import { Router } from 'express';
import { CardController } from './controllers/CardController';
import { LaneController } from './controllers/LaneController';

const routes = Router();

//rotas para lane
routes.post("/lanes", new LaneController().handleRegister);
routes.get("/lanes", new LaneController().handleFindAll);
routes.get("/lanes/:id", new LaneController().handleFindById);
routes.delete("/lanes/:id", new LaneController().handleDelete);
routes.put("/lanes/:id", new LaneController().handleUpdate);

//rotas para os cards
routes.post("/cards", new CardController().handleRegister);
routes.get("/cards", new CardController().handleFindAll);
routes.get("/cards/:id", new CardController().handleFindById);
routes.delete("/cards/:id", new CardController().handleDelete);
routes.put("/cards/:id", new CardController().handleUpdate);

export { routes };
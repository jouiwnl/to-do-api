import { Request, Response } from 'express';
import { CardService } from '../services/CardService';

const cardService = new CardService();

export class CardController {

    async handleRegister( request: Request, response: Response) {
        const { name, description, link, lane_id } = request.body;
        const result = await cardService.executeRegister({ name, description, link, lane_id });

        return response.json(result);
    }

    async handleFindAll(request: Request, response: Response) {
        const result = await cardService.executeFindAll();
        
        return response.json(result);
    }

    async handleFindById(request: Request, response: Response) {
        const { id } = request.params;

        const result = await cardService.executeFindById({ id });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async handleDelete(request: Request, response: Response) {

        const { id } = request.params;

        const result = await cardService.executeDelete({ id });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }

    async handleUpdate(request: Request, response: Response) {

        const { id } = request.params;
        const { name, description, link, lane_id } = request.body;

        const result = await cardService.executeUpdate({ id, name, description, link, lane_id });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
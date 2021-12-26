import { Request, Response } from 'express';
import { LaneService } from '../services/LaneService'

const laneService = new LaneService();

export class LaneController {

    async handleRegister( request: Request, response: Response) {
        const { name } = request.body;
        const result = await laneService.executeRegister({ name });

        return response.json(result);
    }

    async handleFindAll(request: Request, response: Response) {
        const result = await laneService.executeFindAll();
        
        return response.json(result);
    }

    async handleFindById(request: Request, response: Response) {
        const { id } = request.params;

        const result = await laneService.executeFindById({ id });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async handleDelete(request: Request, response: Response) {

        const { id } = request.params;

        const result = await laneService.executeDelete({ id });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }

    async handleUpdate(request: Request, response: Response) {

        const { id } = request.params;
        const { name } = request.body;

        const result = await laneService.executeUpdate({ id, name });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
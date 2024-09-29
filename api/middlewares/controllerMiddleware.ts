import { Request, Response, NextFunction } from 'express';

export const controllerMiddleware = (controller: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    // function body
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await controller(req, res, next);
            res.json(response);
        } catch (error) {
            next(error);
        }
    };
};
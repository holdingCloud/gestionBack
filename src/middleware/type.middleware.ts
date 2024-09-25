import { NextFunction, Request, Response } from "express";


export class TypeMiddleware {


    static validTypes(validTypes: string[]) {

        return (req: Request, res: Response, next: NextFunction) => {

            //Se hace por la url ya que como no esta el middleware directo en el route no obtiene el params
            //al no tener identificado la route

            const type = req.url.split('/').at(2) ?? '';

            if (!validTypes.includes(type)) {
                return res.status(400).json({ error: `Invalid type: ${type}, valid ones ${validTypes}` })
            }

            next();


        }

    }

}
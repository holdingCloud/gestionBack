import { Request, Response } from "express";
import fs from 'fs';
import imageToBase64 from "image-to-base64";
import path from "path";
import { loggerAdapter } from "../../config";


export class ImageController {

    constructor() {

    }

    getImage = (req: Request, res: Response) => {

        const { type = '', img = '' } = req.params;

        const imagePath = path.resolve(__dirname, `../../uploads/${type}/${img}`);

        if (!fs.existsSync(imagePath)) {

            const pathImagen = path.resolve(__dirname, '../../assets/no-image.jpg');

            imageToBase64(pathImagen) // Path to the image
                .then(
                    (response) => {

                        res.send(response)
                    }
                )
                .catch(
                    (error) => {
                        loggerAdapter.error(`Error al cargar imagen base64 ${error}`);
                    }
                )

        }

        imageToBase64(imagePath) // Path to the image
            .then(
                (response) => {

                    res.send(response)
                }
            )
            .catch(
                (error) => {
                    loggerAdapter.error(`Error al cargar imagen base64 ${error}`);
                }
            )

    }


}
import express, { NextFunction, Request, Response } from "express";
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { MessageController } from './message.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { getSingleFilePath } from "../../../shared/getFilePath";
const router = express.Router();

router.post('/',
    auth(USER_ROLES.USER),
    fileUploadHandler(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req.body;
            const image = getSingleFilePath(req.files, 'image');

            req.body = { ...payload, image };
            next();

        } catch (error) {
            return res.status(500).json({ message: "Invalid Format" });
        }
    },
    MessageController.sendMessage
);

router.get('/:id',
    auth(USER_ROLES.USER),
    MessageController.getMessage
);

export const MessageRoutes = router;

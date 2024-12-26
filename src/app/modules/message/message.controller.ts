import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { MessageService } from './message.service';

const sendMessage = catchAsync(async (req: Request, res: Response) => {

    const user = req.user.id;
    const payload = {
        ...req.body,
        sender: user,
    };

    const message = await MessageService.sendMessageToDB(payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Send Message Successfully',
        data: message,
    });

});

const getMessage = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id;
    const messages = await MessageService.getMessageFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Message Retrieve Successfully',
        data: messages,
    });

});

export const MessageController = { sendMessage, getMessage };
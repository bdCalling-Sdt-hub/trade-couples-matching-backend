import mongoose from 'mongoose';
import { IMessage } from './message.interface';
import { Message } from './message.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const sendMessageToDB = async (payload: any): Promise<IMessage> => {

    // save to DB
    const response = await Message.create(payload);

    //@ts-ignore
    const io = global.io;
    if (io) {
        io.emit(`getMessage::${payload?.chatId}`, response);
    }

    return response;
};

const getMessageFromDB = async (id: any): Promise<IMessage[]> => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid Chat ID');
    }

    const messages = await Message.find({ chatId: id })
        .sort({ createdAt: -1 });

    if(!messages.length){
        throw new ApiError(StatusCodes.NOT_FOUND, "No message found by this ID")
    }

    return messages;
};

export const MessageService = { sendMessageToDB, getMessageFromDB };
import { Document, Schema, model } from "mongoose";
import { MessageStatus, MessageType } from "../constants/message.enum";

export interface IMessage extends Document {
  recipient: string;
  type: MessageType;
  subject?: string;
  body: string;
  status: MessageStatus;
  error?: string | null;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  recipient: { type: String, required: true },
  type: { type: String, enum: Object.values(MessageType), required: true },
  subject: { type: String },
  body: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(MessageStatus),
    default: MessageStatus.SENT,
  },
  error: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export const Message = model<IMessage>("Message", MessageSchema);

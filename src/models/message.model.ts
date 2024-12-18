import mongoose, { Document, Schema, Types, model } from "mongoose";
import { validationDefault } from "../config";
import { ApplicationEnum } from "../constants";
import {
  MessageStatus,
  SendingMethodEnum,
  SmsSendingTypeEnum,
} from "../constants/message.enum";

export interface IMessage extends Document {
  merchant: Types.ObjectId;
  sendingMethod: SendingMethodEnum;
  to: string;
  body: string;
  application: ApplicationEnum;
  sendingType?: SmsSendingTypeEnum;
  status?: MessageStatus;
  subject?: string;
  error?: string;
  errorExpirationTime?: Date;
  rejectionValue?: number;
  scheduleAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    merchant: { type: mongoose.Schema.Types.ObjectId, required: true },
    sendingMethod: {
      type: String,
      enum: Object.values(SendingMethodEnum),
      required: true,
    },
    sendingType: {
      type: String,
      enum: Object.values(SmsSendingTypeEnum),
    },
    subject: { type: String, maxlength: validationDefault.SHORT_DESCRIPTION },
    to: {
      type: String,
      required: true,
      maxlength: validationDefault.SHORT_DESCRIPTION,
    },
    body: {
      type: String,
      required: true,
      minlength: validationDefault.MIN,
      maxlength: validationDefault.SHORT_DESCRIPTION,
    },
    status: {
      type: String,
      enum: Object.values(MessageStatus),
      default: MessageStatus.PENDING,
    },
    application: {
      type: String,
      required: true,
      enum: Object.values(ApplicationEnum),
    },
    errorExpirationTime: { type: Date },
    rejectionValue: { type: Number },
    error: { type: String, maxlength: validationDefault.SHORT_DESCRIPTION },
    scheduleAt: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

export const Message = model<IMessage>("Message", MessageSchema);

import twilio from "twilio";
import { ISMSOptions } from "../interfaces/message.interface";

export class SMSService {
  private client;

  constructor() {
    this.client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  async sendSMS(
    options: ISMSOptions
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.messages.create({
        body: options.body,
        to: options.to,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

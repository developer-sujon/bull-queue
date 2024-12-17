export interface IEmailOptions {
  to: string;
  subject: string;
  body: string;
}

export interface ISMSOptions {
  to: string;
  body: string;
}

export interface IMessageLog {
  recipient: string;
  type: "EMAIL" | "SMS";
  subject?: string;
  body: string;
  status: "SENT" | "FAILED";
  error?: string | null;
  createdAt: Date;
}

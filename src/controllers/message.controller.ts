import { Request, Response } from "express";
import catchAsync from "../helpers/catchAsync";

export const sendEmailHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { to, subject, body } = req.body;
  }
);

export const sendSMSHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { to, body } = req.body;

    res.status(200).json({ success: true, message: "SMS request received" });

    processSMS(new Date().getTime());
  }
);

const processSMS = async (smsId: number) => {
  console.log(smsId);

  try {
    // Simulate sending SMS (replace with actual SMS provider integration)
    console.log("Sending SMS...");
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulated delay

    // Update SMS status in MongoDB
    // await SMS.findByIdAndUpdate(smsId, { status: 'Sent' });
    console.log("SMS sent and status updated");
  } catch (error) {
    console.error("Failed to send SMS:", error);
    // await SMS.findByIdAndUpdate(smsId, { status: 'Failed' });
  }
};

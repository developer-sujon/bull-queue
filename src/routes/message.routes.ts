import { Router } from "express";
import { sendGREENSMSHandler } from "../controllers/message.controller";

const router = Router();

// router.post("/send-email", sendEmailHandler);
router.post("/sms", sendGREENSMSHandler);

export default router;

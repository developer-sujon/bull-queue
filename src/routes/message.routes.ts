import { Router } from "express";
import {
  sendEmailHandler,
  sendSMSHandler,
} from "../controllers/message.controller";

const router = Router();

router.post("/send-email", sendEmailHandler);
router.post("/send-sms", sendSMSHandler);

export default router;

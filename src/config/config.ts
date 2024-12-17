import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  // Server Config
  PORT: process.env.PORT || 5000,
  APP_ENV: process.env.APP_ENV || "development",

  // MongoDB Config
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/your-db-name",

  // Email (SMTP) Config
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASS: process.env.EMAIL_PASS || "",

  // Twilio SMS Config
  TWILIO_SID: process.env.TWILIO_SID || "",
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || "",
};

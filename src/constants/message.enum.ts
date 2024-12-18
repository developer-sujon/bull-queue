export enum SendingMethodEnum {
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export enum MessageStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  SENT = "SENT",
  CANCELLED = "CANCELLED",
  TRASH = "TRASH",
  FAILED = "FAILED",
}

export enum SmsSendingTypeEnum {
  MASKING = "MASKING",
  NON_MASKING = "NON_MASKING",
  FIXED_NUMBER = "FIXED_NUMBER",
}

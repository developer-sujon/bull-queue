import { config, logger } from "../config";
import { MessageStatus, SendingMethodEnum } from "../constants/message.enum";
import { IMessage, Message } from "../models";

/**
 * Create and save a message (or messages if bulk) to the database.
 * @param createMessageDto - Create message dto
 * @returns {Promise<IMessage[]>} - Created messages array
 */
export const createMessages = async (
  createMessageDto: any
): Promise<IMessage[]> => {
  // Check if the recipient is a single number or a bulk list (comma-separated)
  const numbers = createMessageDto.to.split(",");

  const messagesToInsert = numbers.map((recipient: string) => ({
    ...createMessageDto,
    recipient: recipient,
    sendingMethod: SendingMethodEnum.SMS,
  }));

  if (messagesToInsert.length > 1) {
    // Bulk insert for multiple messages
    const messages = await Message.insertMany(messagesToInsert);
    return messages as IMessage[];
  } else {
    // Single insert if only one message
    const message = await new Message(messagesToInsert[0]).save();
    return [message];
  }
};

/**
 * Send Green SMS (either single or bulk) based on recipient list.
 * @param createMessageDto - Create message dto
 * @param batchMessages - Array of messages created in the database
 */
export const sendGREENSMS = async (
  createMessageDto: any,
  batchMessages: any //IMessage[]
) => {
  const data = new URLSearchParams();
  data.set("token", config.GREEN_SMS_TOKEN);
  data.set("message", createMessageDto.body);
  data.set("to", createMessageDto.to); // If it's bulk, the recipient list will be comma-separated

  const response = await fetch(config.GREEN_SMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data,
  });

  const result = await response.json();
  logger.info("GreenSMS API response:", result);

  // Process the response for the SMS batch and update message statuses in the DB
  await processGREENSMSResponse(batchMessages, result);
};

/**
 * Process the response from GreenSMS API and update message statuses in the database.
 * @param batchMessages - Array of message documents to update
 * @param response - Response from GreenSMS API
 */
const processGREENSMSResponse = async (
  batchMessages: IMessage[],
  response: any[]
) => {
  const bulkUpdates = [];

  logger.info(JSON.stringify(response));

  for (let i = 0; i < response.length; i++) {
    const result = response[i];
    const message = batchMessages[i];

    bulkUpdates.push({
      updateOne: {
        filter: { _id: message._id },
        update: {
          $set: {
            status: result.status,
            ...(result.status === MessageStatus.FAILED && {
              error: result.statusmsg,
            }),
          },
        },
      },
    });
  }

  if (batchMessages.length !== response.length)
    logger.error(response[0].statusmsg);

  if (bulkUpdates.length > 0) {
    await Message.bulkWrite(bulkUpdates);
    logger.info("Batch status updated successfully.");
  }
};

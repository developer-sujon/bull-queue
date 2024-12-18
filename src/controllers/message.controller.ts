import { Request, Response } from "express";
import { logger } from "../config";
import { defaults } from "../config/defaults";
import catchAsync from "../helpers/catchAsync";
import { createMessages, sendGREENSMS } from "../services/sms.service";
import { generateHATEOASLinks, paginationGenerator } from "../utils/query";

export const sendEmailHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { recipient, body, scheduleAt } = req.body;
  }
);

export const sendGREENSMSHandler = catchAsync(
  async (req: Request, res: Response) => {
    const messageCreateDto = req.body;

    // Create the messages in the database (single or bulk)
    const messages = await createMessages(messageCreateDto);

    // Respond to the client
    res.status(200).json({
      code: 200,
      message: "SMS request received and is being processed",
    });

    logger.info("Sending SMS...");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

    // Trigger SMS processing (either single or bulk)
    await sendGREENSMS(messageCreateDto, messages); // Send the SMS
  }
);

export const findAll = catchAsync(async (req: Request, res: Response) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  //data
  const data = await invoiceService.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
  });

  // pagination
  const totalItems = await invoiceService.count({ search });
  const pagination = paginationGenerator({ totalItems, limit, page });

  // HATEOAS Links
  const links = generateHATEOASLinks({
    query: req.query,
    path: req.path,
    prevPage: !!pagination.prevPage,
    nextPage: !!pagination.nextPage,
  });

  // Respond to the client
  res.status(200).json({
    code: 200,
    data: {
      data,
      pagination,
      links,
    },
  });
});

import { App } from "@slack/bolt";
import { Request, Response } from "@google-cloud/functions-framework";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
});

// Example command handler
app.command("/hello", async ({ command, ack, say }) => {
  await ack();
  await say(`Hello from your bot, <@${command.user_id}>! 👋`);
});

// Cloud Function entry point
export const slackbot = async (req: Request, res: Response) => {
  const handler = await app.start();
  return handler(req, res);
};

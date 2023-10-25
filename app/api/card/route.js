import { connectToDb } from "../../../utils/database";
import Card from "../../../models/cards";

export const GET = async (req) => {
  try {
    await connectToDb();
    const cards = await Card.find({}).populate("creator");

    for (const card of cards) {
      const decoded = card.img_data.replace(/data:.*base64,/, "");
      const imageResp = new Buffer.from(decoded, "base64");
      card.decodedImg = imageResp;
    }

    return new Response(JSON.stringify(cards), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all cards!", { status: 500 });
  }
};

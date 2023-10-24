import { connectToDb } from "../../../../../utils/database";
import Card from "../../../../../models/cards";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();

    const cards = await Card.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(cards), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all cards!", { status: 500 });
  }
};

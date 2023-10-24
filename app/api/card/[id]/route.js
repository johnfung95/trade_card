import { connectToDb } from "../../../../utils/database";
import Card from "../../../../models/cards";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();

    const card = await Card.findById(params.id).populate("creator");

    if (!card) {
      return new Response("Card not found", { status: 404 });
    }

    return new Response(JSON.stringify(card), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch Card!", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { title, description } = await req.json();
  try {
    await connectToDb();
    const existingCard = await Card.findById(params.id);

    if (!existingCard) return new Response("Card not found", { status: 404 });

    existingCard.title = title;
    existingCard.description = description;

    await existingCard.save();
    return new Response(JSON.stringify(existingCard), { status: 200 });
  } catch (error) {
    return new Response("Failed to update Card!", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();
    await Card.findByIdAndRemove(params.id);
    return new Response("Card deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Card!", { status: 500 });
  }
};

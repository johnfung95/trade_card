import { connectToDb } from "../../../../utils/database";
import Card from "../../../../models/cards";

export const POST = async (req) => {
  const { userId, title, description } = await req.json();

  try {
    await connectToDb();
    const newCard = new Card({
      creator: userId,
      title: title,
      description: description,
    });

    await newCard.save();
    return new Response(JSON.stringify(newCard), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a new Card!", { status: 500 });
  }
};

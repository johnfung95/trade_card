import { Schema, model, models } from "mongoose";

const CardSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    // one to many relationship, 1 create / user = many prompts
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
});

// check if user already exists in the models, else create one
const Card = models.Card || model("Card", CardSchema);
export default Card;

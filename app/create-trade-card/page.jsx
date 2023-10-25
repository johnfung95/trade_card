"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "../../components/Form";
import { toBase64 } from "@utils/utils";

const CreateCard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [card, setCard] = useState({
    title: "",
    description: "",
    filename: "",
    img_data: "",
  });

  const createCard = async (e) => {
    e.preventDefault();

    const base64 = await toBase64(card.img_data);

    try {
      const res = await fetch("/api/card/new", {
        method: "POST",
        body: JSON.stringify({
          title: card.title,
          userId: session?.user.id,
          description: card.description,
          filename: card.filename,
          img_data: base64,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      type="Create"
      card={card}
      setCard={setCard}
      handleSubmit={createCard}
    />
  );
};

export default CreateCard;

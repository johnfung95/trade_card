"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../../components/Form";
import { toBase64 } from "@utils/utils";

const EditCard = () => {
  const searchParams = useSearchParams();
  const cardId = searchParams.get("id");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [card, setCard] = useState({
    title: "",
    description: "",
    filename: "",
    img_data: "",
  });

  useEffect(() => {
    const getCardDetails = async () => {
      const res = await fetch(`/api/card/${cardId}`);
      const data = await res.json();
      console.log(data);
      setCard({
        title: data.title,
        description: data.description,
        filename: data.filename,
        img_data: data.img_data,
      });
    };

    if (cardId) {
      getCardDetails();
    }
  }, [cardId]);

  const updateCard = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!cardId) return alert("Card ID not found!");

    const base64 = await toBase64(card.img_data);

    try {
      const res = await fetch(`/api/card/${cardId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: card.title,
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      card={card}
      setCard={setCard}
      submitting={submitting}
      handleSubmit={updateCard}
    />
  );
};

export default EditCard;

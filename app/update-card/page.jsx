"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../../components/Form";

const EditCard = () => {
  const searchParams = useSearchParams();
  const cardId = searchParams.get("id");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [card, setCard] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const getCardDetails = async () => {
      const res = await fetch(`/api/card/${cardId}`);
      const data = await res.json();
      setCard({ title: data.title, description: data.description });
    };

    if (cardId) {
      getCardDetails();
    }
  }, [cardId]);

  const updateCard = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!cardId) return alert("Card ID not found!");

    try {
      const res = await fetch(`/api/card/${cardId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: card.title,
          description: card.description,
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

"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "../../components/Form";

const CreateCard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [card, setCard] = useState({
    title: "",
    description: "",
  });

  const createCard = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/card/new", {
        method: "POST",
        body: JSON.stringify({
          title: card.title,
          userId: session?.user.id,
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
      type="Create"
      card={card}
      setCard={setCard}
      submitting={submitting}
      handleSubmit={createCard}
    />
  );
};

export default CreateCard;

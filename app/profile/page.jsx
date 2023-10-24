"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "../../components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cards, setCards] = useState([]);

  const handleEdit = (card) => {
    router.push(`/update-card?id=${card._id}`);
  };
  const handleDelete = async (card) => {
    const hasConfirmed = confirm("Are you sure you want to delete this card?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/card/${card._id.toString()}`, { method: "DELETE" });

        const filteredCards = cards.filter((c) => c._id !== card._id);
        setCards(filteredCards);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchcards = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/cards`);
      const data = await res.json();

      setCards(data);
    };

    if (session?.user.id) {
      fetchcards();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={cards}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

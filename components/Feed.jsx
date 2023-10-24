"use client";
import { useState, useEffect } from "react";
import TradeCard from "./TradeCard";

const TradeCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 card_layout">
      {data.map((card) => (
        <TradeCard key={card._id} card={card} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch("/api/card");
      const data = await res.json();

      setCards(data);
    };

    fetchCards();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <TradeCardList data={cards} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;

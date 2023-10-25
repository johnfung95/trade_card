"use client";
import { useState, useEffect, useRef } from "react";
import TradeCard from "./TradeCard";

const TradeCardList = ({ data }) => {
  return (
    <div className="mt-16 card_layout">
      {data.map((card) => (
        <TradeCard key={card._id} card={card} />
      ))}
    </div>
  );
};

const Feed = () => {
  let searchRef = useRef("");
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState([]);
  const [filterCards, setFilterCards] = useState([]);

  const searchChangeHandler = (e) => {
    e.preventDefault();
    searchRef.current = e.target.value;
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchText(searchRef.current);
    }, 3000);

    return () => clearTimeout(delay);
  });

  useEffect(() => {
    const data = cards.filter((item) => item.title === searchText);
    if (data.length <= 0) {
      setFilterCards(null);
    } else {
      setFilterCards(data);
    }
  }, [searchText]);

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
      <input
        type="text"
        placeholder="Search for title"
        ref={searchRef}
        onChange={searchChangeHandler}
        required
        className="search_input peer"
      />
      <TradeCardList data={filterCards ? filterCards : cards} />
    </section>
  );
};

export default Feed;

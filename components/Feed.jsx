"use client";
import { useState, useEffect, useCallback } from "react";
import TradeCard from "./TradeCard";

const TradeCardList = ({ data }) => {
  return (
    <div className="mt-16 card_layout">
      {data && data.map((card) => <TradeCard key={card._id} card={card} />)}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState([]);

  const fetchCards = useCallback(async () => {
    const res = await fetch("/api/card");
    const data = await res.json();
    return data;
  }, []);

  useEffect(() => {
    const filtering = async () => {
      const results = await fetchCards();
      if (results) {
        const data = results.filter((item) => item.title == searchText.trim());
        if (data.length >= 1) {
          setCards(data);
        } else {
          setCards(null);
        }
      }
    };

    const delay = setTimeout(async () => {
      if (searchText.trim() != "" && cards) {
        filtering();
      } else if (searchText.trim() != "" && !cards) {
        filtering();
      } else {
        const results = await fetchCards();
        setCards(results);
      }
    }, 2000);

    return () => clearTimeout(delay);
  }, [searchText]);

  useEffect(() => {
    const getCards = async () => {
      const results = await fetchCards();
      setCards(results);
    };
    getCards();
  }, []);

  return (
    <section className="feed">
      <input
        type="text"
        placeholder="Search for title"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
        required
        className="search_input peer"
      />
      <TradeCardList data={cards} />
    </section>
  );
};

export default Feed;

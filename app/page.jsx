import Feed from "../components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Trading Cards</span>
      </h1>
      <p className="desc text-center">To flex your trade cards to the world!</p>
      <Feed />
    </section>
  );
};

export default Home;

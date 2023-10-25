"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Form = ({ type, card, setCard, handleSubmit }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    try {
      setPreviewImage(new Buffer(card.img_data));
    } catch (error) {
      return;
    }
  }, [card.img_data]);

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Card</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing cards with the world, and let your imagination
        run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 m-auto w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Trading Cards
          </span>
          <input
            onChange={(e) => setCard({ ...card, title: e.target.value })}
            value={card.title}
            placeholder="Write your title here ..."
            required
            className="form_input"
          ></input>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            onChange={(e) => setCard({ ...card, description: e.target.value })}
            value={card.description}
            placeholder="Write a brief description of your card here ..."
            required
            className="form_textarea"
          ></textarea>
        </label>
        <div className="flex flex-col mb-4">
          <label>Upload Image</label>
          <input
            onChange={(e) => {
              let num;
              if (e.target.files.length > 1) {
                num = e.target.files.length - 1;
              } else {
                num = 0;
              }
              if (e.target.files[num].size > 2097152) {
                alert("File size should be less than 2 MB!");
                setPreviewImage(null);
                setCard({
                  title: card.title,
                  description: card.description,
                  filename: "",
                  img_data: "",
                });
                setFormValid(false);
              } else {
                if (e.target.files?.[num]) {
                  const file = e.target.files[num];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result);
                  };
                  reader.readAsDataURL(file);
                  setCard({
                    ...card,
                    filename: e.target.files[num].name,
                    img_data: e.target.files[num],
                  });
                  setFormValid(true);
                }
              }
            }}
            type="file"
            id="image"
            accept="image/*"
            required
          />
          {previewImage && (
            <img
              className="m-auto object-scale-down h-40 w-fit"
              src={previewImage}
            />
          )}
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={!formValid}
            className={`px-5 py-1.5 text-sm rounded-full text-white ${
              formValid ? "bg-primary-orange" : "bg-zinc-300"
            }`}
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

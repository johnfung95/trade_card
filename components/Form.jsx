"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Form = ({ type, card, setCard, submitting, handleSubmit }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    if (card.img_data != "" && initLoading) {
      setPreviewImage(new Buffer(card.img_data));
      setInitLoading(false);
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
            Description {` `}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <textarea
            onChange={(e) => setCard({ ...card, description: e.target.value })}
            value={card.description}
            placeholder="#description"
            required
            className="form_textarea"
          ></textarea>
        </label>
        <div>
          <label>Upload Image</label>
          <input
            onChange={(e) => {
              let num;
              if (e.target.files.length > 1) {
                num = e.target.files.length - 1;
              } else {
                num = 0;
              }
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
              }
            }}
            type="file"
            id="image"
            accept="image/*"
            required
          />
          {previewImage && <img src={previewImage} />}
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

import TradeCard from "./TradeCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 card_layout">
        {data.map((card) => (
          <TradeCard
            key={card._id}
            card={card}
            handleEdit={() => handleEdit && handleEdit(card)}
            handleDelete={() => handleDelete && handleDelete(card)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;

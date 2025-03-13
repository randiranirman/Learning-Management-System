const Card = ({ title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-64 h-32 flex flex-col justify-center">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default Card;

import React from "react";
import { Link } from "react-router-dom";

function PhotographerCard({ photographer }) {
  return (
    <div className="border p-4 rounded shadow text-center">
      <img
        src={photographer.profilePic}
        alt={photographer.name}
        className="w-32 h-32 object-cover rounded-full mx-auto"
      />
      <h2 className="text-xl font-semibold mt-4">{photographer.name}</h2>
      <p>{photographer.location}</p>
      <p className="text-sm">Starting from ₹{photographer.price}</p>
      <p className="text-sm">Rating: {photographer.rating}</p>
      <div className="text-xs mt-2">
        {photographer.tags.map((tag) => (
          <span key={tag} className="mr-2 bg-gray-200 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <Link
        to={`/photographer/${photographer.id}`}
        className="inline-block mt-4 text-blue-500 hover:underline"
      >
        View Profile
      </Link>
    </div>
  );
}

export default PhotographerCard;

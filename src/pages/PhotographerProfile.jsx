import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import photographersData from "../db.json";

function PhotographerProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const photographer = photographersData.photographers.find(
      (p) => p.id === Number(id)
    );
    setData(photographer || null);
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", form);
    alert("Inquiry submitted successfully!");
    setForm({ name: "", email: "", message: "" });
    setShowModal(false);
  };

  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      {/* Profile Picture */}
      <img
        src={data.profilePic}
        alt={data.name}
        className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
      />

      <h1 className="text-3xl font-bold mb-2 text-center">{data.name}</h1>
      <p className="mb-2 text-center">{data.bio}</p>
      <p className="text-center mb-2">
        Location: {data.location} | Price: ₹{data.price} | Rating: {data.rating}
      </p>

      {/* Inquiry Button */}
      <div className="text-center my-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Inquiry
        </button>
      </div>

      {/* Gallery */}
      <div className="my-4">
        <h2 className="text-xl font-semibold mb-2">Gallery</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.portfolio.map((img, i) => (
            <div key={i} className="w-full aspect-square overflow-hidden rounded">
              <img
                src={img}
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {data.reviews.map((review, i) => (
          <div key={i} className="border p-2 my-2 rounded">
            <p className="font-semibold">
              {review.name} ({review.rating}⭐)
            </p>
            <p>{review.comment}</p>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4">Send Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows="4"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotographerProfile;

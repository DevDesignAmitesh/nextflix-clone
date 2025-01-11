import React from "react";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import FavButton from "./FavButton";

interface PopupProps {
  movie: {
    id: string;
    title: string;
    description: string;
    duration: string;
    genre: string;
    thumbnailUrl: string;
  };
  email: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ movie, email, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-black w-[90%] max-w-3xl rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute z-40 top-4 right-4 text-white hover:text-gray-400"
          onClick={onClose}
          aria-label="Close popup"
        >
          <FiX size={25} />
        </button>

        {/* Thumbnail Section */}
        <div className="relative">
          <img
            src={movie.thumbnailUrl}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-4xl font-bold">{movie.title}</h2>
            <div className="flex items-center gap-4 mt-2">
              {/* Play Button */}
              <Link
                href={`/watch/${movie.id}`}
                className="bg-white text-black rounded-full p-2 flex items-center justify-center w-10 h-10"
                aria-label="Play movie"
              >
                <FaPlay size={16} />
              </Link>

              {/* Add to Favorites Button */}
              <FavButton email={email} movieId={movie.id} />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-[#171719] p-6 text-white">
          <p className="text-green-400 text-sm mb-2">New</p>
          <p className="text-sm mb-1">{movie.duration}</p>
          <p className="text-sm mb-4 capitalize">{movie.genre}</p>
          <p className="text-sm">{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;

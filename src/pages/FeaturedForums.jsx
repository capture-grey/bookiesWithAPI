"use client";
import { useNavigate } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

export default function FeaturedForums() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const navigate = useNavigate();
const handleClick = () => {navigate("/forums/forum001");};

  const featuredForums = [
    {
      forumName: "The Reader Club",
      title: "The Little Prince",
      author: "Antoine de Saint-Exupéry",
      description:
        "“And now here is my secret, a very simple secret: It is only with the heart that one can see rightly; what is essential is invisible to the eye.”",
      imageUrl: "images/banner3.jpg",
    },
    {
      forumName: "Historical Reads",
      title: "Animal Farm",
      author: "George Orwell",
      description:
        "“No one believes more firmly than Comrade Napoleon that all animals are equal. He would be only too happy to let you make your decisions for yourselves. But sometimes you might make the wrong decisions, comrades, and then where should we be?”",
      imageUrl: "images/banner2.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === featuredForums.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredForums.length - 1 : prev - 1
    );
  };

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();

    touchStart.current = null;
    touchEnd.current = null;
  };

  const currentForum = featuredForums[currentIndex];

  return (
    <section className="mb-12 w-full ">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center gap-4">
        <button
          onClick={prevSlide}
          className="flex-shrink-0 bg-[#f9f7f3] hover:bg-[#eae2c8] border-.5 p-1 rounded-full shadow cursor-pointer"
        >
          <ChevronLeft className="w-9 h-9 pr-1 text-black" />
        </button>

        <div className="relative w-[1200px] h-96 rounded-lg overflow-hidden">
          <img
            src={currentForum.imageUrl}
            alt="banner"
            className="w-full h-full object-cover"
            onClick={handleClick}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-8 flex">
            <div className="flex flex-col justify-center w-1/2 pr-8">
              <span className="text-sm font-semibold text-white mb-2">
                Featured by {currentForum.forumName}
              </span>
              <h2 className="text-3xl font-bold text-white leading-tight mb-2">
                {currentForum.title}
              </h2>
              <span className="text-base font-semibold text-white">
                {currentForum.author}
              </span>
            </div>
            <div className="flex items-center w-1/2">
              <p className="text-base text-white font-serif">
                {currentForum.description}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="flex-shrink-0 bg-[#f9f7f3] hover:bg-[#eae2c8] border-.5 cursor-pointer p-1 rounded-full shadow"
        >
          <ChevronRight className="w-9 h-9 pl-1 text-black" />
        </button>
      </div>

      {/* Mobile Layout */}
      <div
        className="md:hidden relative w-full h-64 rounded-lg overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={currentForum.imageUrl}
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 py-6 flex flex-col justify-center">
          <span className="text-xs font-semibold text-white mb-1">
            Featured by {currentForum.forumName}
          </span>
          <h2 className="text-xl font-bold text-white leading-tight mb-1">
            {currentForum.title}
          </h2>
          <p className="text-xs text-white mb-2 line-clamp-2">
            {currentForum.description}
          </p>
          <div className="w-full flex justify-end">
            <span className="text-xs font-semibold text-white">
              {currentForum.author}
            </span>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {featuredForums.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { useContext } from "react";
import { SessionDataContext } from "../App";
import ForumList from "../components/home/ForumList";
import HomeCarousel from "../components/home/HomeCarousel";
import FeaturedForums from "./FeaturedForums";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full px-4 mb-10 mt-5">
      <div className="max-w-[1080px]">
        <FeaturedForums />
      </div>

      <div className="w-full max-w-4xl mt-5">
        <h2 className="font-semibold mb-3">Forums Joined</h2>
        <ForumList />
      </div>
    </div>
  );
}

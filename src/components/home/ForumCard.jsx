"use client";
import { UserRoundCog, BookOpen, Users, Pin } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function ForumCard({
  forumId,
  name,
  location,
  users,
  numberofbooks,
  role,
  isPinned,
  onPinToggle,
}) {
  const navigate = useNavigate();
  // Icon color for user role
  const roleIconColor =
    role === "admin"
      ? "text-[#FFD700]" // golden
      : role === "moderator"
      ? "text-[#C0C0C0]" // silver
      : "text-white";

  return (
    <div
      className="flex bg-white min-h-[100px] max-w-[960px] rounded-md border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(`/forums/${forumId}`)}
    >
      <div className="nameLocation flex flex-4 md:flex-6 flex-col pl-1">
        <div className="name flex flex-5 items-center break-words font-semibold">
          <h3>{name}</h3>
          <UserRoundCog size={19} className={`pl-1 ${roleIconColor}`} />
        </div>
        <div className="location flex flex-5 items-center text-sm md:text-balance break-words">
          <span>{location}</span>
        </div>
      </div>
      <div className="others flex flex-6 md:flex-4">
        <div className="books flex-1/3 flex items-center justify-center gap-1">
          <BookOpen size={17} /> {numberofbooks}
        </div>
        <div className="members flex-1/3 flex items-center justify-center gap-1">
          <Users size={17} /> {users}
        </div>
        <div className="pin flex-1/3 gap-1 flex items-center justify-center">
          <div
            className={`rounded-full p-2 hover:bg-black transition-colors ${
              isPinned ? "bg-black" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onPinToggle();
            }}
          >
            <Pin size={17} className={isPinned ? "text-white" : ""} />
          </div>
        </div>
      </div>
    </div>
  );
}

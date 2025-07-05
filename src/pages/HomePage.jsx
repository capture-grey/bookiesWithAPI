import React from "react";
import { useContext } from "react";
import { SessionDataContext } from "../App";
import ForumList from "../components/home/ForumList";

export default function HomePage() {
  return (
    <div>
      <ForumList />
    </div>
  );
}

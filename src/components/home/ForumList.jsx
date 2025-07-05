import { useContext } from "react";
import { SessionDataContext } from "../../App";
import ForumCard from "./ForumCard";

export default function ForumList() {
  const { sessionData, pinnedForums, setPinnedForums, userID } =
    useContext(SessionDataContext);

  if (!sessionData) return <div>Loading forums...</div>;

  return (
    <div className="forum-list flex flex-col gap-1">
      {sessionData.forums.map((forum) => {
        const numberOfBooks = forum.members.reduce(
          (total, member) => total + member.books.length,
          0
        );

        const user = forum.members.find((member) => member.userId === userID);
        const userRole = user?.role || "member";

        return (
          <ForumCard
            key={forum.forumId} // Add this unique key prop
            forumId={forum.forumId}
            name={forum.forumName}
            location={forum.location}
            users={forum.members.length}
            numberofbooks={numberOfBooks}
            role={userRole}
            isPinned={pinnedForums.includes(forum.forumId)}
            onPinToggle={() => {
              setPinnedForums((prev) =>
                prev.includes(forum.forumId)
                  ? prev.filter((id) => id !== forum.forumId)
                  : [...prev, forum.forumId]
              );
            }}
          />
        );
      })}
    </div>
  );
}

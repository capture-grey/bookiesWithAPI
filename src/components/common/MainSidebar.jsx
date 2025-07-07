import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  ChevronDown,
  ChevronUp,
  Home,
  CirclePlus,
  MessageSquare,
  UserRoundCog,
  Pin,
  Library,
  Users,
  LogIn,
} from "lucide-react";
import { SessionDataContext } from "../../App";

export default function MainSidebar({ isOpen, onClose }) {
  const [expanded, setExpanded] = useState({
    recent: false,
    pinned: false,
    managed: false,
  });
  const navigate = useNavigate();
  const { userID, recentForums, pinnedForums, sessionData, setRecentForums } =
    useContext(SessionDataContext);

  //get forum details by ID
  const getForumDetails = (forumIds) => {
    if (!sessionData?.forums) return [];
    return forumIds
      .map((forumId) => sessionData.forums.find((f) => f.forumId === forumId))
      .filter(Boolean);
  };

  // admin or moderator forums
  const getManagedForums = () => {
    if (!sessionData?.forums) return [];
    return sessionData.forums.filter((forum) => {
      const member = forum.members.find((m) => m.userId === userID);
      return member && (member.role === "admin" || member.role === "moderator");
    });
  };

  // add to recent + navigate
  const handleForumClick = (forumId) => {
    setRecentForums((prev) => {
      const newRecent = prev.includes(forumId)
        ? prev
        : [forumId, ...prev].slice(0, 5); //recent count
      return newRecent;
    });
    navigate(`/forums/${forumId}`);
  };

  const toggle = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // icon color mapping for roles
  const getRoleIconColor = (role) => {
    return role === "admin"
      ? "text-[#FFD700]" // golden
      : role === "moderator"
      ? "text-[#C0C0C0]" // silver
      : "text-white";
  };

  const linkClass =
    "flex items-center px-4 py-2 rounded hover:bg-[#eee6cc] text-sm text-[#5a4a3a]";
  const labelClass = "flex items-center text-sm font-medium text-[#5a4a3a]";
  const sectionTitle =
    "px-4 text-sm font-bold text-[#5a4a3a] mt-4 mb-2 flex items-center";
  const iconClass = "w-4 h-4 mr-2";
  const forumItemClass = `${linkClass} pl-8 font-normal cursor-pointer`;

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-[#f9f7f3] border-r border-[#d4cba2] z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4">
        <button onClick={onClose} className="absolute top-2 right-2 p-1">
          <X size={20} className="text-[#5a4a3a]" />
        </button>

        <h2 className="text-xl font-bold text-[#5a4a3a] mb-4 flex items-center">
          <Library className="w-5 h-5 mr-2" />
          Menu
        </h2>

        <div
          className="px-4 text-md font-bold text-[#5a4a3a] mt-4 mb-2 flex items-center cursor-pointer hover:bg-[#eee6cc] p-2 rounded-b-sm"
          onClick={() => navigate("/")}
        >
          <Home className="w-5 h-5 mr-2" />
          Home
        </div>

        <div className="border-t my-3 border-[#d4cba2]" />

        <div className={forumItemClass}>
          <LogIn className={iconClass} />
          Join A Forum
        </div>
        <div className={forumItemClass}>
          <CirclePlus className={iconClass} />
          Create A Forum
        </div>

        <div className="border-t my-3 border-[#d4cba2]" />

        <div className={sectionTitle}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Forums
        </div>

        {/* load recent forums */}
        <div
          className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#eee6cc]"
          onClick={() => toggle("recent")}
        >
          <span className={labelClass}>
            <Users className={iconClass} />
            Recent
          </span>
          {expanded.recent ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </div>
        {expanded.recent && (
          <div className="pl-2">
            {recentForums.length > 0 ? (
              getForumDetails(recentForums).map((forum) => (
                <div
                  key={forum.forumId}
                  onClick={() => handleForumClick(forum.forumId)}
                  className={forumItemClass}
                >
                  {forum.forumName}
                </div>
              ))
            ) : (
              <div className={`${forumItemClass} text-gray-500`}>
                No recent forums
              </div>
            )}
          </div>
        )}

        {/* load pinned Forums */}
        <div
          className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#eee6cc]"
          onClick={() => toggle("pinned")}
        >
          <span className={labelClass}>
            <Pin className={iconClass} />
            Pinned
          </span>
          {expanded.pinned ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </div>
        {expanded.pinned && (
          <div className="pl-2">
            {pinnedForums.length > 0 ? (
              getForumDetails(pinnedForums).map((forum) => (
                <div
                  key={forum.forumId}
                  onClick={() => handleForumClick(forum.forumId)}
                  className={forumItemClass}
                >
                  {forum.forumName}
                </div>
              ))
            ) : (
              <div className={`${forumItemClass} text-gray-500`}>
                No pinned forums
              </div>
            )}
          </div>
        )}

        {/* load admin/mod forums */}
        <div
          className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#eee6cc]"
          onClick={() => toggle("managed")}
        >
          <span className={labelClass}>
            <UserRoundCog className={iconClass} />
            Managed by Me
          </span>
          {expanded.managed ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </div>
        {expanded.managed && (
          <div className="pl-2">
            {getManagedForums().length > 0 ? (
              getManagedForums().map((forum) => {
                const role = forum.members.find(
                  (m) => m.userId === userID
                )?.role;
                return (
                  <div
                    key={forum.forumId}
                    onClick={() => handleForumClick(forum.forumId)}
                    className={`${forumItemClass} flex justify-between items-center`}
                  >
                    <span>{forum.forumName}</span>
                    <UserRoundCog
                      size={19}
                      className={`pl-1 ${getRoleIconColor(role)}`}
                    />
                  </div>
                );
              })
            ) : (
              <div className={`${forumItemClass} text-gray-500`}>
                No managed forums
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

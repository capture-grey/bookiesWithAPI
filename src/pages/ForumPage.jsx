import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SessionDataContext } from "../App";
import { Checkbox } from "@/components/ui/checkbox";

export default function ForumPage() {
  const { forumId } = useParams();
  const { userID, sessionData, setSessionData } =
    useContext(SessionDataContext);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (sessionData && forumId) {
      const forum = sessionData.forums.find((f) => f.forumId === forumId);
      const user = forum?.members.find((m) => m.userId === userID);
      setCurrentUser(user);

      if (isEditing && forum) {
        const availableBooks = forum.members.flatMap((member) =>
          member.books.filter(
            (bookIndex) => !forum.adminHidden.includes(bookIndex)
          )
        );
        setSelectedBooks(availableBooks);
      }
    }
  }, [sessionData, forumId, userID, isEditing]);

  if (!sessionData) return <div>Loading...</div>;

  const forum = sessionData.forums.find((f) => f.forumId === forumId);
  if (!forum) return <div>Forum not found</div>;

  const isAdminOrModerator =
    currentUser?.role === "admin" || currentUser?.role === "moderator";

  const toggleEdit = () => {
    if (!isAdminOrModerator) return;

    if (!isEditing) {
      const availableBooks = forum.members.flatMap((member) =>
        member.books.filter(
          (bookIndex) => !forum.adminHidden.includes(bookIndex)
        )
      );
      setSelectedBooks(availableBooks);
    } else {
      const allBooks = forum.members.flatMap((member) => member.books);
      const newAdminHidden = allBooks.filter(
        (bookIndex) => !selectedBooks.includes(bookIndex)
      );

      setSessionData((prev) => ({
        ...prev,
        forums: prev.forums.map((f) =>
          f.forumId === forumId ? { ...f, adminHidden: newAdminHidden } : f
        ),
      }));

      setSelectedBooks([]);
    }

    setIsEditing(!isEditing);
  };

  const toggleBookSelection = (bookIndex) => {
    setSelectedBooks((prev) =>
      prev.includes(bookIndex)
        ? prev.filter((id) => id !== bookIndex)
        : [...prev, bookIndex]
    );
  };

  // Get books based on current mode
  const getBooksToDisplay = () => {
    if (isEditing) {
      return forum.members.flatMap((member) =>
        member.books.map((bookIndex) => {
          const book = sessionData.books[bookIndex];
          return {
            bookIndex,
            title: book?.title || "Unknown Book",
            author: book?.author || "Unknown Author",
            categories: book?.category?.join(", ") || "Uncategorized",
            owner: member.name,
            ownerRole: member.role,
            liked: book?.liked || 0,
            isHidden: forum.adminHidden.includes(bookIndex),
          };
        })
      );
    } else {
      // Normal mode - only show available books
      return forum.members.flatMap((member) =>
        member.books
          .filter((bookIndex) => !forum.adminHidden.includes(bookIndex))
          .map((bookIndex) => {
            const book = sessionData.books[bookIndex];
            return {
              bookIndex,
              title: book?.title || "Unknown Book",
              author: book?.author || "Unknown Author",
              categories: book?.category?.join(", ") || "Uncategorized",
              owner: member.name,
              ownerRole: member.role,
              liked: book?.liked || 0,
              isHidden: false,
            };
          })
      );
    }
  };

  const booksToDisplay = getBooksToDisplay();
  const availableBooksCount = forum.members
    .flatMap((member) => member.books)
    .filter((bookIndex) => !forum.adminHidden.includes(bookIndex)).length;

  return (
    <div className="forum-page p-6">
      <h1 className="text-2xl font-bold mb-4">{forum.forumName} - All Books</h1>
      <p className="text-gray-600 mb-6">{forum.description}</p>

      {isAdminOrModerator && (
        <div className="mb-4">
          <button
            onClick={toggleEdit}
            className={`border px-[10px] py-[5px] rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 ${
              isEditing ? "bg-red-500 text-white" : "bg-black text-amber-50"
            }`}
          >
            {isEditing ? "Done Hiding" : "Edit Forum"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {isEditing && (
                <th className="py-3 px-4 border-b text-left">Visibility</th>
              )}
              <th className="py-3 px-4 border-b text-left">Book Title</th>
              <th className="py-3 px-4 border-b text-left">Author</th>
              <th className="py-3 px-4 border-b text-left">Categories</th>
              <th className="py-3 px-4 border-b text-left">Likes</th>
              <th className="py-3 px-4 border-b text-left">Owned By</th>
              <th className="py-3 px-4 border-b text-left">User Role</th>
            </tr>
          </thead>
          <tbody>
            {booksToDisplay.map((book, index) => {
              const isSelected = selectedBooks.includes(book.bookIndex);

              return (
                <tr
                  key={`${book.bookIndex}-${index}`}
                  className={`hover:bg-gray-50 ${
                    book.isHidden ? "opacity-60 bg-gray-100" : ""
                  }`}
                >
                  {isEditing && (
                    <td className="py-3 px-4 border-b">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() =>
                          toggleBookSelection(book.bookIndex)
                        }
                        className="font-extralight"
                      />
                    </td>
                  )}
                  <td className="py-3 px-4 border-b">{book.title}</td>
                  <td className="py-3 px-4 border-b">{book.author}</td>
                  <td className="py-3 px-4 border-b">{book.categories}</td>
                  <td className="py-3 px-4 border-b">{book.liked}</td>
                  <td className="py-3 px-4 border-b">{book.owner}</td>
                  <td
                    className={`py-3 px-4 border-b ${
                      book.ownerRole === "admin"
                        ? "text-yellow-600 font-medium"
                        : book.ownerRole === "moderator"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {book.ownerRole}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        {isEditing ? (
          <>
            Showing {booksToDisplay.length} books in forum
            <br />
            <span className="text-blue-600">
              {selectedBooks.length} books selected to remain visible
            </span>
          </>
        ) : (
          `Showing ${availableBooksCount} available books owned by ${forum.members.length} members`
        )}
      </div>

      {isEditing && (
        <div className="mt-4 text-sm text-blue-600">
          {selectedBooks.length === availableBooksCount ? (
            "All available books are selected (will remain visible)"
          ) : (
            <>
              {selectedBooks.length} book(s) selected to remain visible
              <br />
              {booksToDisplay.length - selectedBooks.length} book(s) will be
              hidden
            </>
          )}
        </div>
      )}
    </div>
  );
}

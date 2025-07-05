import { useParams } from "react-router-dom";
import { useContext } from "react";
import { SessionDataContext } from "../App";

export default function ForumPage() {
  const { forumId } = useParams();
  const { sessionData } = useContext(SessionDataContext);

  if (!sessionData) return <div>Loading...</div>;

  const forum = sessionData.forums.find((f) => f.forumId === forumId);
  if (!forum) return <div>Forum not found</div>;

  // Get all books with owner information using array index matching
  const booksWithOwners = forum.members.flatMap((member) =>
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
      };
    })
  );

  return (
    <div className="forum-page p-6">
      <h1 className="text-2xl font-bold mb-4">{forum.forumName} - All Books</h1>
      <p className="text-gray-600 mb-6">{forum.description}</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b text-left">Book Title</th>
              <th className="py-3 px-4 border-b text-left">Author</th>
              <th className="py-3 px-4 border-b text-left">Categories</th>
              <th className="py-3 px-4 border-b text-left">Likes</th>
              <th className="py-3 px-4 border-b text-left">Owned By</th>
              <th className="py-3 px-4 border-b text-left">User Role</th>
            </tr>
          </thead>
          <tbody>
            {booksWithOwners.map((book, index) => (
              <tr
                key={`${book.bookIndex}-${index}`}
                className="hover:bg-gray-50"
              >
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
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Showing {booksWithOwners.length} books owned by {forum.members.length}{" "}
        members
      </div>
    </div>
  );
}

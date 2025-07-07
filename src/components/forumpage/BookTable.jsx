// components/forumpage/BookTable.jsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Heart } from "lucide-react";

export const BookTable = ({
  paginatedBooks,
  editMode,
  selectedBooks,
  toggleBookSelection,
  viewMode,
  sortBy,
  sortDirection,
  handleSort,
  liked,
  toggleLike,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto text-xs sm:text-sm border rounded-md">
        <thead className="bg-[#f9f7f3] text-muted-foreground">
          <tr>
            {editMode && (
              <th className="w-10 px-2 py-2">
                <Checkbox
                  checked={
                    selectedBooks.length ===
                    paginatedBooks.filter(
                      (b) => viewMode === "all" || b.ownedByUser
                    ).length
                  }
                  onCheckedChange={(checked) => {
                    const visibleBooks = paginatedBooks.filter(
                      (b) => viewMode === "all" || b.ownedByUser
                    );
                    if (checked) {
                      toggleBookSelection(visibleBooks.map((book) => book.id));
                    } else {
                      toggleBookSelection([]);
                    }
                  }}
                />
              </th>
            )}
            <th
              className="text-left px-2 py-2 cursor-pointer whitespace-normal break-words max-w-[120px]"
              onClick={() => handleSort("name")}
            >
              Title {sortBy === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="text-left px-2 py-2 cursor-pointer whitespace-normal break-words max-w-[100px]"
              onClick={() => handleSort("author")}
            >
              Author{" "}
              {sortBy === "author" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th className="text-left px-2 py-2 break-words max-w-[90px]">
              Category
            </th>
            {!editMode && (
              <th
                className="text-center px-4 py-2 w-[60px] cursor-pointer"
                onClick={() => handleSort("likes")}
              >
                Likes{" "}
                {sortBy === "likes" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedBooks
            .filter((book) => viewMode === "all" || book.ownedByUser)
            .map((book) => (
              <tr
                key={book.id}
                className="border-t hover:bg-muted/50 align-top"
              >
                {editMode && (
                  <td className="px-2 py-2">
                    <Checkbox
                      checked={selectedBooks.includes(book.id)}
                      onCheckedChange={() => toggleBookSelection(book.id)}
                    />
                  </td>
                )}
                <td className="px-2 py-2 break-words">{book.name}</td>
                <td className="px-2 py-2 break-words">{book.author}</td>
                <td className="px-2 py-2 break-words">
                  {book.category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="inline-block mr-1 mb-1 bg-gray-200 px-1 py-0.5 rounded text-xs"
                    >
                      {cat}
                    </span>
                  ))}
                </td>
                {!editMode && (
                  <td className="px-4 py-2 text-center">
                    <div className="flex flex-col items-center gap-0.5 md:flex-row md:gap-2">
                      <button
                        onClick={() => toggleLike(book.id)}
                        className={`transition-colors ${
                          liked[book.id]
                            ? "text-purple-500"
                            : "text-gray-400 hover:text-purple-400"
                        }`}
                      >
                        <Heart
                          className="w-4 h-4"
                          fill={liked[book.id] ? "#a78bfa" : "none"}
                        />
                      </button>
                      <span className="text-[10px] sm:text-xs">
                        {book.likes + (liked[book.id] ? 1 : 0)}
                      </span>
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

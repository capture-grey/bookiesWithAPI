"use client";

import { useParams } from "react-router-dom";
import { useContext } from "react";
import { SessionDataContext } from "../App";
import {
  Heart,
  BookOpen,
  Users,
  MessageSquare,
  Share2,
  LogOut,
  Info,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Banner from "../components/forumpage/Banner";

export default function ForumPage() {
  const { forumId } = useParams();
  const { sessionData } = useContext(SessionDataContext);

  if (!sessionData) return <div>Loading...</div>;

  const forum = sessionData.forums.find((f) => f.forumId === forumId);
  if (!forum) return <div>Forum not found</div>;

  const getBooksToDisplay = () => {
    return forum.members.flatMap((member) => {
      return member.books
        .filter((bookIndex) => !forum.adminHidden.includes(bookIndex))
        .map((bookIndex) => {
          const book = sessionData.books[bookIndex];
          return {
            id: bookIndex,
            name: book?.title || "Unknown Book",
            author: book?.author || "Unknown Author",
            category: book?.category || ["Uncategorized"],
            likes: book?.liked || 0,
            owner: member.name,
            ownerRole: member.role,
          };
        });
    });
  };

  const booksToDisplay = getBooksToDisplay();

  // Simple like toggle handler (would need proper implementation)
  const toggleLike = (bookId) => {
    console.log("Toggled like for book:", bookId);
  };

  return (
    <div className="flex justify-center relative">
      <div className="first mx-auto">
        <div className="my-6">
          <h1 className="text-xl text-black/80 font-bold">{forum.forumName}</h1>
        </div>
        {/* ------------------------------------------ */}

        <div className="InfoRow flex mb-5 max-w-[1080px] gap-2">
          <div className="flex justify-center border border-[#d4cba2] px-3 py-2 rounded-full gap-1 grow ">
            <BookOpen size={19} className="mt-[4px]" />
            <span>
              {forum.members.reduce(
                (sum, member) => sum + member.books.length,
                0
              )}
            </span>
            <span className="hidden md:block">Books</span>
          </div>
          <div className="flex justify-center border border-[#d4cba2] px-3 py-2 rounded-full gap-1 grow">
            <Users size={19} className="mt-[2px]" />
            <span>{forum.members.length}</span>
            <span className="hidden md:block">Members</span>
          </div>
          <div className="flex justify-center border border-[#d4cba2] px-3 py-2 rounded-full gap-1 grow">
            <MessageSquare size={19} className="mt-[4px]" />
            <span className="hidden md:block">Messenger</span>
          </div>
          <div className="flex justify-center border border-[#d4cba2] px-3 py-2 rounded-full gap-1 grow">
            <Share2 size={19} className="mt-[4px]" />
            <span className="hidden md:block">Share</span>
          </div>
        </div>

        {/* ------------------------------------------------ */}

        <div className="max-w-[1080px] mb-5">
          <Banner />
        </div>

        <div className="max-w-[1080px] overflow-x-hidden">
          <span className="text-black/75 text-[15px] mb-1">
            Combined book list of all members
          </span>
          <table className="w-full table-auto text-xs sm:text-sm border border-[#d4cba2] rounded">
            <thead className="bg-[#f9f7f3] text-muted-foreground">
              <tr>
                <th className="text-left px-2 py-2 max-w-[120px] whitespace-normal break-words">
                  Name
                </th>
                <th className="text-left px-2 py-2 max-w-[100px] whitespace-normal break-words">
                  Author
                </th>
                <th className="text-left px-2 py-2 max-w-[90px] whitespace-normal break-words">
                  Category
                </th>
                <th className="text-center px-4 py-2 w-[60px]">Likes</th>
              </tr>
            </thead>
            <tbody>
              {booksToDisplay.map((book) => (
                <tr
                  key={book.id}
                  className="border-t align-top hover:bg-muted/50"
                >
                  <td className="px-2 py-2 whitespace-normal break-words">
                    {book.name}
                  </td>
                  <td className="px-2 py-2 whitespace-normal break-words">
                    {book.author}
                  </td>
                  <td className="px-2 py-2 whitespace-normal break-words">
                    {book.category.map((cat, i) => (
                      <span
                        key={i}
                        className="inline-block mr-1 mb-1 bg-gray-200 px-1 py-0.5 rounded text-xs"
                      >
                        {cat}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-2 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-0.5 md:gap-2">
                      <button
                        onClick={() => toggleLike(book.id)}
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <Heart className="w-4 h-4" fill="none" />
                      </button>
                      <span className="text-[10px] sm:text-xs">
                        {book.likes}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {booksToDisplay.length} books
        </div>
      </div>
      {/* _________________________ */}
      <div className="second absolute hidden lg:block inset-y-0 right-10 top-20">
        <div className="mb-6 border border-[#eae2c8] w-full max-w-[300px] rounded-xl p-5 bg-white">
          <div className="space-y-4">
            {/* Forum Title */}
            <h2 className="text-xl font-bold text-black/80">Info</h2>

            {/* Description */}
            <div>
              <p className="text-sm text-gray-700">{forum.description}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex gap-1">
                <p className="text-muted-foreground font-medium">Location:</p>
                <p>{forum.location}</p>
              </div>
              <div className="flex gap-1">
                <p className="text-muted-foreground font-medium">Created</p>
                <p>{new Date(forum.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <hr className="w-[50px]" />
            {/* Rules Accordion */}
            <div className="p-0 m-0">
              <h1 className="text-l font-bold text-black/80">Rules</h1>
              <Accordion type="single" collapsible className="w-full p-0 m-0">
                {forum.rules.map((rule, index) => (
                  <AccordionItem key={index} value={`rule-${index}`}>
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">
                      <span className="hover:underline">{rule.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-700 pl-1 pt-1">
                      {rule.body}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {/* Allowed Categories */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Allowed Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {forum.allowedCategories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 px-2.5 py-1 rounded-full text-xs"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

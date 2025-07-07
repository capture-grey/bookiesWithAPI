// components/forumpage/SortControls.jsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

export function SortControls({
  sortBy,
  sortDirection,
  onSortChange,
  onDirectionChange,
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-xs sm:text-sm">Sort By</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="text-xs px-2 py-1 h-8 capitalize bg-[#f9f7f3]"
          >
            {sortBy} ({sortDirection})
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Sort options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
            <DropdownMenuRadioItem value="name">Title</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="author">Author</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="likes">Likes</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDirectionChange("asc")}>
            <Check
              className={`w-4 h-4 mr-2 ${
                sortDirection === "asc" ? "opacity-100" : "opacity-0"
              }`}
            />
            Ascending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDirectionChange("desc")}>
            <Check
              className={`w-4 h-4 mr-2 ${
                sortDirection === "desc" ? "opacity-100" : "opacity-0"
              }`}
            />
            Descending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

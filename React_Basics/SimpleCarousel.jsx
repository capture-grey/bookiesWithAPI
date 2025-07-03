import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function SimpleCarousel() {
  return (
    <div className="w-full flex justify-center border">
      <div className="relative w-full max-w-[960px]">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="h-[300px] w-full border bg-amber-600" />
            </CarouselItem>
            <CarouselItem>
              <div className="h-[300px] w-full border bg-black" />
            </CarouselItem>
            <CarouselItem>
              <div className="h-[300px] w-full border bg-purple-500" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </div>
  );
}

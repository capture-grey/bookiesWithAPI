//Fetch Multiple URLs
//Render Map


import React, { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomeCarousel() {
  function handleClick(index) {
    console.log("Clicked image:", index);
  }

  // first two images images -> empty 
  const [imageBlobUrls, setImageBlobUrls] = useState([
    "images/banner.jpg",
    "images/banner2.jpg",
  ]);

  const [loading, setLoading] = useState(true);
  
  //Fetching Images from API -> one URL for later
  useEffect(() => {
    const toFetchUrls = [
      "https://dummyjson.com/image/1000x360/008080/ffffff?text=Dummy+JSON+Fetched+1",
      "https://dummyjson.com/image/1000x360/008080/ffffff?text=Dummy+JSON+Fetched+2",
      "https://dummyjson.com/image/1000x360/008080/ffffff?text=Dummy+JSON+Fetched+3",
    ];

    let isMounted = true;
    const newBlobUrls = [];

    Promise.all(toFetchUrls.map((url) => fetch(url).then((res) => res.blob())))
      .then((blobs) => {
        const createdUrls = blobs.map((blob) => URL.createObjectURL(blob));
        newBlobUrls.push(...createdUrls);

        if (isMounted) {
          setImageBlobUrls((prev) => [...prev, ...newBlobUrls]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Image fetch failed:", err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
      // ✅ Cleanup only the new blob URLs
      newBlobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="w-full flex justify-center border">
      <div className="relative w-full h-[300px] max-w-[960px]">
        <Carousel className="w-full">
          <CarouselContent>
            {imageBlobUrls.map((url, index) => (
              <CarouselItem key={index} onClick={() => handleClick(index)}>
                <div className="h-[300px] w-full border">
                  <img
                    src={url}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </div>
  );
}

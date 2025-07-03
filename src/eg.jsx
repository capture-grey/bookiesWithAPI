"use client"; // if using Next.js App Router

import React, { useEffect, useState } from "react";

export default function ImageFetcher() {
  const [imageBlobUrl, setImageBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/image/400x200/008080/ffffff?text=Hello+Peter") // image binary
      .then((res) => res.blob()) // ⬅️ Get the raw binary
      .then((blob) => {
        const url = URL.createObjectURL(blob); // ⬅️ Convert to blob URL
        setImageBlobUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Image fetch failed:", err);
        setLoading(false);
      });

    // Optional cleanup (revoke the blob URL when unmounting)
    return () => {
      if (imageBlobUrl) {
        URL.revokeObjectURL(imageBlobUrl);
      }
    };
  }, []);

  if (loading) return <div>Loading actual image...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Fetched Raw Image</h2>
      <img
        src={imageBlobUrl}
        alt="Binary Dummy Image"
        className="border rounded"
      />
    </div>
  );
}

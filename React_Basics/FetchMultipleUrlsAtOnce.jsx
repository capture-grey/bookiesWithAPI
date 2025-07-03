const [imageBlobUrls, setImageBlobUrls] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const urls = [
    "https://dummyjson.com/image/1000x360/008080/ffffff?text=Hello+1",
    "https://dummyjson.com/image/1000x360/800080/ffffff?text=Hello+2",
    "https://dummyjson.com/image/1000x360/ff6600/ffffff?text=Hello+3",
  ];

  let isMounted = true; // to prevent state update after unmount
  const blobUrls = [];

  Promise.all(urls.map((url) => fetch(url).then((res) => res.blob())))
    .then((blobs) => {
      blobs.forEach((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        blobUrls.push(objectUrl);
      });

      if (isMounted) {
        setImageBlobUrls(blobUrls);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.error("Image fetch failed:", err);
      setLoading(false);
    });

  // 🔁 Cleanup function
  return () => {
    isMounted = false;
    blobUrls.forEach((url) => URL.revokeObjectURL(url));
  };
}, []);

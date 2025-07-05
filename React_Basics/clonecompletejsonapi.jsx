//fetching data from api for first time and storing to change in local session
const [SessionData, setSessionData] = useState(null);
useEffect(() => {
  fetch("https://dummyjson.com/c/70a5-ddfe-435d-8e3e")
    .then((res) => res.json())
    .then((data) => {
      setSessionData(JSON.parse(JSON.stringify(data)));
    })
    .catch((err) => console.error("API fetch failed:", err));
}, []);
console.log(SessionData);

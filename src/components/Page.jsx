import { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";

const Page = () => {
  const { id } = useParams();
  // console.log(id);
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    const getAnimeData = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
      // console.log("JSON ma parse na gareko data: ", response);
      const data = await response.json();
      // console.log("Postman ko data: ", data);
      const usefulData = await data.data;
      console.log("Chaine data: ", usefulData);
      setAnimeData(usefulData);
    };

    getAnimeData();
  }, []);

  return (
    <Suspense
      fallback={
        <div>
          <h1>Loading from suspense...</h1>
        </div>
      }
    >
      <div>
        {animeData.length === 0 ? (
          <div>
            <h1>Loading from array...</h1>
          </div>
        ) : (
          <div>
            <h1>{animeData.title}</h1>
            <img src={animeData.images.jpg.image_url} alt="" />
            <span>{animeData.airing}</span>
            <a href="/">Back to home</a>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Page;

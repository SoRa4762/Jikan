import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track the index of the hovered card

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://api.jikan.moe/v4/anime");
      const data = await response.json();
      const usefulData = await data.data;
      setData(usefulData);
      console.log("Chaine data: ", usefulData);
    };

    getData();
  }, []);

  return (
    <>
      {data.length !== 0 ? (
        <div className="p-4 bg-gray-500">
          <h1 className="font-bold text-2xl pb-2 text-white">Animes</h1>
          <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.map((sora, index) => (
              <Link
                onMouseEnter={() => setHoveredIndex(index)} // Set the hovered index
                onMouseLeave={() => setHoveredIndex(null)} // Clear the hovered index
                to={`/page/${sora.mal_id}`}
                key={sora.mal_id}
                className="h-[40vh] md:h-[50vh] relative w-full rounded-xl flex flex-col justify-end duration-300 shadow-lg border"
                style={{
                  background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${sora.images.jpg.large_image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex items-end p-4 justify-between">
                  <h1 className="text-white font-bold text-sm sm:text-lg md:text-2xl">
                    {sora.title}
                  </h1>
                  <p
                    className={`${
                      sora.status === "Finished Airing"
                        ? "text-emerald-400"
                        : "text-red-400"
                    } text-xs sm:text-sm md:text-base`}
                  >
                    {sora.status}
                  </p>
                </div>
                <div
                  className={`${
                    hoveredIndex === index
                      ? "opacity-100 overflow-y-scroll"
                      : "opacity-0"
                  } absolute top-0 left-0 h-full w-full duration-300 rounded-xl transition-all ease-in bg-black bg-opacity-60 p-4 flex items-center justify-center`}
                >
                  <p className="text-white">{sora.synopsis}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://api.jikan.moe/v4/anime");
      // console.log("JSON ma parse na gareko data: ", response);
      const data = await response.json();
      // console.log("Postman ko data: ", data);
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
            {data.map((sora) => (
              <Link
                onMouseEnter={() => {
                  setDisplay(true);
                }}
                onMouseLeave={() => {
                  setDisplay(false);
                }}
                to={`/page/${sora.mal_id}`}
                key={sora.mal_id}
                className="h-[40vh] md:h-[50vh] w-full rounded-xl flex flex-col justify-end duration-300 shadow-lg border"
                style={{
                  background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${sora.images.jpg.large_image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex items-end p-4 justify-between">
                  {/* <p>{sora.mal_id}</p> */}
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
                {/* failed */}
                {/* <div
                  className={`${
                    display ? "flex overflow-hidden" : "hidden"
                  } h-full w-full duration-300`}
                  style={{
                    background:
                      "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4))",
                  }}
                >
                  <p className="text-white duration-300">{sora.synopsis}</p>
                </div> */}
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

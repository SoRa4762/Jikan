import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);

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
        <div>
          {data.map((sora) => (
            <div key={sora.mal_id}>
              {/* <p>{sora.mal_id}</p> */}
              <a href={`/page/${sora.mal_id}`}>{sora.title}</a>
            </div>
          ))}
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

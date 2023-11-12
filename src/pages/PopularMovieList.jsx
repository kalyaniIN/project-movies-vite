import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import "./PopularMovieList.css";

export const PopularMovieList = () => {
  const [imageConfig, setImageConfig] = useState(null);
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "15e762a0f90c9abe1d2e8b943c7fbe0b";

  const fetchConfiguration = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setImageConfig(json);
      console.log(json);
      console.log(imageConfig);
    } catch (error) {
      console.error("Error fetching configuration:", error);
    }
  };
  useEffect(() => {
    fetchConfiguration();
  },[]);

  const fetchPopularList = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setPopularList(json.results);
      console.log(json.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularList();
    console.log("useeffect rendered");
  }, []);

  return (
    <>
      <section className="movie-list-page">
        
        <div className="movie-list">
          {popularList.map((movie) => (
            <MovieCard
              key={movie.id}
              movieTitle={movie.title}
              releaseDate={movie.release_date}
              movieId={movie.id}
              moviePoster={movie.poster_path}
            />
          ))}
        </div>

        {loading && (
          <div className="loader-container">
            <h4>Loading....</h4>
          </div>
        )}
      </section>
    </>
  );
};

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import { BackIcon } from "../components/BackIcon";
import { Link } from "react-router-dom";

const apiKey = "15e762a0f90c9abe1d2e8b943c7fbe0b";

export const MovieDetails = () => {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => {
        setMovie(json);
        console.log("data is", json);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  return (
    <div className="single-movie">
      <Link to="/" className="backLink" aria-label="button back to home page">
        <BackIcon /> Movies
      </Link>

      {/* Conditional rendering: If 'movie' data is available, display it */}
      {movie ? (
        <>
          <div className="back-drop">
            <div className="background-image">
              <img
                src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                alt={movie.title}
              />
            </div>
          </div>
          <div className="movie-info">
            <div className="movie-poster-container">
              <img
                src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="movie-info-text">
              <div className="movie-info-heading">
                <h1>
                  <span className="title">{movie.title}</span>
                  <span className="rating-number">
                    {Math.round(movie.vote_average * 10) / 10}
                  </span>
                </h1>
              </div>
              <div className="movie-info-subtext">
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        // If 'movie' data is not available , display a loading message
        <p>Loading...</p>
      )}
    </div>
  );
};

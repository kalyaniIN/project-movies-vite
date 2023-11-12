import { Route } from "react-router-dom";
import { PopularMovieList } from "../pages/PopularMovieList";
import { MovieDetails } from "../pages/MovieDetails";

export const routes = (
  <>
    <Route path="/" element={<PopularMovieList />} />
    <Route path="/movies/:id" element={<MovieDetails />} />
  </>
);

import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  Box,
  Rating,
  Button,
  IconButton,
  TextField,
  Paper,
  Divider,
} from "@mui/material";
import Moment from 'react-moment';
import useMediaQuery from "@mui/material/useMediaQuery";

type MovieDetails = {
  movieId: number;
};

type MovieItemDetail = {
  original_title: string;
  release_date: string;
  runtime: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
};

type MovieCast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order?: number;
  job?: string;
};

type TMDBConfigImage = {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: Array<string>;
  logo_sizes: Array<string>;
  poster_sizes: Array<string>;
  profile_sizes: Array<string>;
  still_sizes: Array<string>;
};

type TMDBConfig = {
  images: TMDBConfigImage;
};

const MovieDetailView: FunctionComponent<MovieDetails> = (props) => {
  const mobileMQ_maxw_900 = useMediaQuery("(max-width:900px)");

  const [movieDetails, setMovieDetails] = useState<
    MovieItemDetail | undefined
  >();
  const [movieCredits, setMovieCredits] = useState<
    Array<MovieCast> | undefined
  >();

  const [tmdbConfig, setTmdbConfig] = useState<TMDBConfig | undefined>();

  const getMovieDirector = (credits: Array<MovieCast>) => {
    let obj = credits.find((cast) => cast.job === "Director");
    return obj;
  };

  const getMovieCasts = (credits: Array<MovieCast>) => {
    let returnString: string = "";
    credits.forEach((cast) => {
      if (cast.known_for_department === "Acting") {
        returnString = returnString.concat(`${cast.name},`);
      }
    });
    return returnString;
  };

  useEffect(() => {
    const optionsDetails = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzdkYzIxNDNkMzdkMjhlN2UyNjE0ZDhjZjExYjgxMCIsInN1YiI6IjY0ZmFlNWQ3ZmZjOWRlMDBhYzUwOTMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wyvM0ftKiRAtLD81gliQF-9S7bE6a8srweQDyhEZBIM",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${props.movieId}?language=en-US`,
      optionsDetails
    )
      .then((response) => response.json())
      .then((response) => setMovieDetails(response))
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${props.movieId}/credits?language=en-US`,
      optionsDetails
    )
      .then((response) => response.json())
      .then((response) => setMovieCredits(response.cast))
      .catch((err) => console.error(err));

      fetch("https://api.themoviedb.org/3/configuration", optionsDetails)
      .then((response) => response.json())
      .then((response) => setTmdbConfig(response))
      .catch((err) => console.error(err));

  }, [props.movieId]);

  const movieDirector: MovieCast | undefined = movieCredits
    ? getMovieDirector(movieCredits)
    : undefined;
  const movieCasts: string | undefined = movieCredits
    ? getMovieCasts(movieCredits)
    : undefined;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
        <img
            src={`${tmdbConfig?.images.base_url}${tmdbConfig?.images.poster_sizes[3]}${movieDetails?.poster_path}`}
            srcSet={`${tmdbConfig?.images.base_url}${tmdbConfig?.images.poster_sizes[3]}${movieDetails?.poster_path}`}
            alt={movieDetails?.original_title}
            loading="lazy"
            height={240}
            width={180}
          />
      </Grid>
      <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
        <Stack
          direction={"column"}
          alignItems={mobileMQ_maxw_900 ? "center" : "flex-start"}
          spacing={2}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={mobileMQ_maxw_900 ? "center" : "flex-start"}
          >
            <Typography variant="h4">
              {movieDetails?.original_title} (
              <Rating
                defaultValue={1}
                precision={0.5}
                max={1}
                readOnly   
              />
              {movieDetails?.vote_average})
            </Typography>
            <Box display={"flex"} flexDirection={"row"}>
              <Typography variant="h6" marginRight={2}>
                <Moment date={movieDetails?.release_date} format="YYYY" />
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h6" marginX={2}>
                {movieDetails?.runtime} min
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h6" marginLeft={2}>
                {movieDirector?.name}
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={mobileMQ_maxw_900 ? "center" : "flex-start"}
            flexDirection={"column"}
          >
            <Typography variant="body1" textAlign={'left'}>
              Casts: {movieCasts ? movieCasts : ""}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            alignItems={mobileMQ_maxw_900 ? "center" : "flex-start"}
            flexDirection={"column"}
          >
            <Typography variant="body1" textAlign={'left'}>
              Description: {movieDetails?.overview}
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MovieDetailView;

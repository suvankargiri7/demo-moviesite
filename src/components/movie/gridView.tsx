import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Rating,
  Box,
} from "@mui/material";

/**
 * @description product list view
 * if id is there then it will show specific categories
 * if id is not there it will show all categories
 */

type MoviewGridItem = {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  original_title: string;
  overview: string;
  vote_average: number;
  onClick: () => void;
  imageBaseUrl?: string;
  imageSize?: string;
};

type MoviewGrid = {
  list_items: Array<MoviewGridItem>;
  onClickOnItem: (id: number) => void;
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

const MovieGridItem: FunctionComponent<MoviewGridItem> = (props) => {
  const [movieItem, setMovieItem] = useState<MoviewGridItem>(props);

  const styles = {
    cardContent: {
      textAlign: "left",
    },
  };
  const truncate = (input: string, length: number) => {
    if (input.length > length) {
      return input.substring(0, length) + "...";
    }
    return input;
  };

  useEffect(() => {
    setMovieItem(props);
  }, [props]);

  return (
    <Card>
      <CardActionArea onClick={props.onClick}>
        <CardMedia
          component="img"
          width={200}
          height={200}
          image={`${props.imageBaseUrl}${props.imageSize}${props.poster_path}`}
          alt="green iguana"
        />
        <CardContent sx={styles.cardContent}>
          <Box display={"flex"} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography gutterBottom variant="subtitle2" component="div">
              {truncate(movieItem.original_title, 20)}
            </Typography>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
              <Rating defaultValue={1} precision={0.5} max={1} readOnly />
              <Typography component={'span'} variant={'subtitle2'}>{movieItem.vote_average}</Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {truncate(movieItem.overview, 50)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const MovieGridView: FunctionComponent<MoviewGrid> = (props) => {
  const [listOfMoviewItems, setListOfMoviewItems] = useState<
    Array<MoviewGridItem>
  >(props.list_items);
  const [tmdbConfig, setTmdbConfig] = useState<TMDBConfig | undefined>();

  useEffect(() => {
    setListOfMoviewItems(props.list_items);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzdkYzIxNDNkMzdkMjhlN2UyNjE0ZDhjZjExYjgxMCIsInN1YiI6IjY0ZmFlNWQ3ZmZjOWRlMDBhYzUwOTMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wyvM0ftKiRAtLD81gliQF-9S7bE6a8srweQDyhEZBIM",
      },
    };

    fetch("https://api.themoviedb.org/3/configuration", options)
      .then((response) => response.json())
      .then((response) => setTmdbConfig(response))
      .catch((err) => console.error(err));
  }, [props.list_items]);


  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 8, md: 12 }}
    >
      {listOfMoviewItems.map((eachItem: MoviewGridItem, index) => (
        <Grid item xs={2} sm={4} md={2} key={index}>
          <Paper>
            <MovieGridItem
              id={eachItem.id}
              original_title={eachItem.original_title}
              overview={eachItem.overview}
              vote_average={eachItem.vote_average}
              poster_path={eachItem.poster_path}
              onClick={() => props.onClickOnItem(eachItem.id)}
              imageBaseUrl={tmdbConfig?.images.base_url}
              imageSize={tmdbConfig?.images.poster_sizes[3]}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGridView;

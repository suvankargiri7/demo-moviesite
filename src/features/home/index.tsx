import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import TopSearch from "../../components/topSearch";
import HomeIcon from "@mui/icons-material/Home";
import MovieGridView from "../../components/movie/gridView";
import MovieDetailView from "../../components/movie/detailView";

type HomeProps = {};

const Home: FunctionComponent<HomeProps> = (props) => {
  /**
   * @description override styles
   */
  const styles = {
    toolbar: {
      backgroundColor: "background.default",
      color: "text.primary",
    },
    topBorder: {
      backgroundColor: "primary.main",
      height: "0.3rem",
    },
    appBar: {
      border: "1px solid",
      borderColor: "background.paper",
    },
  };

  const [upcomingMovies, setUpcomingMovies] = useState<Array<any>>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);
  const [searchMovies, setSearchMovies] = useState<Array<any>>([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzdkYzIxNDNkMzdkMjhlN2UyNjE0ZDhjZjExYjgxMCIsInN1YiI6IjY0ZmFlNWQ3ZmZjOWRlMDBhYzUwOTMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wyvM0ftKiRAtLD81gliQF-9S7bE6a8srweQDyhEZBIM",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setUpcomingMovies(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar component="nav" sx={styles.appBar} data-testid="appbar">
          <Toolbar sx={styles.toolbar}>
            <Grid container>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  {!(selectedMovieId > 0) && (
                    <TopSearch
                      searchFormCallback={(searchText: string) => {
                        if (searchText.length > 0) {
                          const options = {
                            method: "GET",
                            headers: {
                              accept: "application/json",
                              Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzdkYzIxNDNkMzdkMjhlN2UyNjE0ZDhjZjExYjgxMCIsInN1YiI6IjY0ZmFlNWQ3ZmZjOWRlMDBhYzUwOTMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wyvM0ftKiRAtLD81gliQF-9S7bE6a8srweQDyhEZBIM",
                            },
                          };

                          fetch(
                            `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=true&language=en-US&page=1`,
                            options
                          )
                            .then((response) => response.json())
                            .then((response) =>
                              setSearchMovies(response.results)
                            )
                            .catch((err) => console.error(err));
                        } else {
                          setSearchMovies([]);
                        }
                      }}
                    />
                  )}

                  {selectedMovieId > 0 && (
                    <Typography variant="h6" component={"div"}>
                      {"Movie Details"}
                    </Typography>
                  )}

                  <IconButton onClick={() => setSelectedMovieId(0)}>
                    <HomeIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12} paddingX={2} marginTop={10} data-testid="maincontainer">
        {!selectedMovieId && (
          <MovieGridView
            list_items={searchMovies.length > 0 ? searchMovies : upcomingMovies}
            onClickOnItem={(id: number) => {
              setSelectedMovieId(id);
            }}
          />
        )}
        {selectedMovieId && <MovieDetailView movieId={selectedMovieId} />}
      </Grid>
    </Grid>
  );
};

export default Home;

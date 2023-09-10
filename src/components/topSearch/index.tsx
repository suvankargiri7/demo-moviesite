import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Container,
  Stack,
  Box,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from "@mui/material";

import SearchForm from "./searchForm";

type topSearchProps = {
  searchFormCallback: (search: string) => void;
};

const TopSearch: FunctionComponent<topSearchProps> = (props) => {
  const styles = {
    searchBox: {
      flexGrow: 1,
      marginRight: "0.3rem",
    },
  };

  return (
    <Grid container sx={styles.searchBox}>
      <Grid item xs={6}>
        <SearchForm onSearchSubmitCallback={props.searchFormCallback} />
      </Grid>
    </Grid>
  );
};

export default TopSearch;

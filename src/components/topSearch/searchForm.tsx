import React, { FunctionComponent, useState } from "react";
import {
  IconButton,
  Paper,
  InputBase,
  Divider,
} from "@mui/material";


import SearchIcon from "@mui/icons-material/Search";

type searchFormProps = {
    onSearchSubmitCallback: (search: string) => void;
};

const SearchForm: FunctionComponent<searchFormProps> = (props) => {

  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={{ "aria-label": "Search Products" }}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="search" onClick={() => props.onSearchSubmitCallback(searchValue)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchForm;

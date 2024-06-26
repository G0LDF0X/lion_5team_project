import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { mainAxiosInstance, searchAxiosInstance } from "../api/axiosInstances";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { chosungIncludes } from "es-hangul";
import useItems from "../hook/useItems";
function SearchBox() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const items = useItems();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const fetchSuggestions = async (query) => {
    try {
      const response = await searchAxiosInstance.get(`search/?query=${query}`);
      return response.data.results.map((result) => result.page_content);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  const getConsontants = (query) => {
    console.log(items)
    const consonantSuggestions = [];
    for (const product of items) {
      ['name', 'Category'].forEach((prop) => {
        if (
          
          chosungIncludes(product[prop], query) &&
          !consonantSuggestions.includes(product.name) ||
          product[prop].toLowerCase().includes(query.toLowerCase()) &&
          !consonantSuggestions.includes(product.name)
        ) {
          console.log(product.name)
          consonantSuggestions.push(product.name);
        }
      });
    }
    return consonantSuggestions;
  };
  const handleChange = async (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value) {
      setSuggestions([]);
      const [apiSuggestions, consonantSuggestions] = await Promise.all([
        fetchSuggestions(value),
        getConsontants(value),
      ]);

      const combinedSuggestions = [
        ...new Set([...apiSuggestions, ...consonantSuggestions]),
      ];
      setSuggestions(combinedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/items/?query=${keyword}&page=1`);
      setSuggestions([]);
    } else {
      navigate(location.pathname);
    }
    if (userInfo) {
     mainAxiosInstance.post("/items/search/", { query: keyword }, {
        headers: { Authorization: `Bearer ${userInfo.access}` },
     });
    }
  };

  return (
    <Box className="relative w-full max-w-md mx-auto">
      <form className="flex" onSubmit={submitHandler}>
        <TextField
          type="text"
          name="query"
          placeholder="Search"
          value={keyword}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          className="bg-white rounded-l-lg"
          id="search-box"
          InputProps={{
            style: { backgroundColor: "white", color: "gray" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#f06292",
              },
              "&:hover fieldset": {
                borderColor: "#ec407a",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#e91e63",
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          className="ml-2 rounded-r-lg"
          sx={{
            backgroundColor: "#f06292",
            color: "white",
            "&:hover": {
              backgroundColor: "#ec407a",
            },
          }}
        >
          <Search />
        </Button>
      </form>
      {suggestions.length > 0 && (
        <Paper className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-10"
        style={{maxHeight: "300px", overflowY: "auto"}}
        >
          <List>
            {suggestions.map((suggestion, index) => (
              <Link
                to={`/items/?query=${suggestion}&?page=1`}
                key={index}
                className="no-underline text-black"
                onClick={() => setSuggestions([])}
              >
                <ListItem button>
                  <ListItemText primary={suggestion} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default SearchBox;
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {  Form, Button, Row, Col } from "react-bootstrap";
import { List, ListItem, ListItemText } from '@material-ui/core';

function SearchBox() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const location = useLocation();
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`items/search/suggestions?query=${query}`);
      const data = await response.json();
      console.log(data);
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    fetchSuggestions(value);
    console.log(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/items/?query=${keyword}&?page=1`);
    } else {
      navigate(location.pathname);
    }
  };
  return (
    <div>
      <Form className="d-flex" onSubmit={submitHandler}>
        <Row className="align-items-center">
          <Col>
            <Form.Control
              type="text"
              name="query"
              placeholder="Search"
              className="ml-5"
              // value={keyword}
              style={{ width: "500px" }}
              onChange={handleChange}
              
            />
        { suggestions.length > 0 && (
  <List>
    { suggestions.map((suggestion, index) => (
      <Link 
        to={`/items/?query=${suggestion.name}&?page=1`} 
        onClick={() => setKeyword(suggestion.name)}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ListItem button key={index}>
          <ListItemText primary={suggestion.name} />
        </ListItem>
      </Link>
    ))}
  </List>
)}
          </Col>
          <Col xs="auto">
            <Button type="submit" className="p-2" variant="outline-success">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SearchBox;

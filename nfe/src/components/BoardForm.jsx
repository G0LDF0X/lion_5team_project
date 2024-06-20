import React from "react";
import {Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Box} from "@mui/material";
import {Link} from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';import { grey } from "@mui/material/colors";

export default function BoardForm({ board  }) {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <Card
      className="shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      sx={{ height: 500 }}
    >
      <CardHeader
        avatar={
          
            <Link to={`/users/${board.user_id}`}>
            {board.user_image ? (
              <Avatar
                src={VITE_API_BASE_URL + board.user_image}
                alt = {board.username}
                aria-label="user"
              />
            ) : (
              <Avatar sx={{ bgcolor: grey[500] }} aria-label="user">
                {board.username[0]}
          
              </Avatar>
            )}
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={board.title}
        subheader={new Date(board.created_at).toLocaleDateString()}
      />
        <Link key = {board.id} to={`/board/${board.id}`} >
      <div style={{ position: "relative" }} >
        <CardMedia
          component="img"
          height="220"
          image={`${VITE_API_BASE_URL}${board.image_url}`}
          alt={board.title}
        />
        
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary" component="div">
          {board.content.length > 100 ? (
            <span
              dangerouslySetInnerHTML={{
                __html: `${board.content.substring(0, 100)}...`,
              }}
            />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: board.content }} />
          )}
        </Typography>
      </CardContent>
      </Link>
      <Box className="px-4 py-2">
        <Typography variant="caption" color="text.secondary">
          by{" "}
          <Link
            to={`/users/${board.user_id}`}
            className="text-blue-600 no-underline"
          >
            {board.username}
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}

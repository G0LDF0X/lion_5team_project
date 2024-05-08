import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listBoards } from "../actions/boardActions";
import { LinkContainer } from "react-router-bootstrap";
import { createBoard } from "../actions/boardActions";
import { BOARD_CREATE_RESET } from "../constants/boardConstants";
import BoardForm from "../components/BoardForm";
import { Grid } from "@material-ui/core";
import { Box } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import { grey } from "@material-ui/core/colors";
import { CardMedia } from "@mui/material";
import { CardActions } from "@mui/material";
import { IconButton } from "@mui/material";
import CardrdHeader from "@mui/material/CardHeader";

// import { MoreVertIcon } from "@mui/icons-material";
// import { FavoriteIcon } from "@mui/icons-material";
// import { ShareIcon } from "@mui/icons-material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import { FaUser } from "react-icons/fa";

function BoardScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boardList = useSelector((state) => state.boardList);
  const { loading, error, boards } = boardList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo);

  const boardCreate = useSelector((state) => state.boardCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    board: createdBoard,
  } = boardCreate;
  console.log(boards);
  const createHandler = () => {
    dispatch(createBoard());
  };
  const likeHandler = () => {
    console.log("likeHandler");
  };
  useEffect(() => {
    dispatch(listBoards());
    if (successCreate) {
      dispatch({ type: BOARD_CREATE_RESET });
      navigate(`/board/update/${createdBoard.id}`);
    }
  }, [dispatch, successCreate, navigate, createdBoard]);

  return (
    <div>
      <h1>Boards</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : userInfo && boards ? (
        <Grid container spacing={3}>
          {boards.map((board) => (
            <Grid item key={board.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                variant="outlined"
                style={{ width: 301, overflow: "hidden" }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  width={300}
                  style={{ overflow: "hidden" }}
                >
                  <Box height={600} width={300} style={{ overflow: "hidden" }}>
                    <CardHeader
                      avatar={
                        <Link to={`/board/detail/${board.id}`}>
                          <Avatar
                            sx={{ bgcolor: grey[500] }}
                            aria-label="recipe"
                          >
                            R
                          </Avatar>
                        </Link>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={
                        <Link to={`/board/detail/${board.id}`}>
                          {board.title.length > 10 ? board.title.substring(0, 10) + '...' : board.title}
                        </Link>
                      }
                      subheader={board.createdAt}
                      width="10"
                    />
                    <Link to={`/board/detail/${board.id}`}>
                    <CardMedia
                      component="img"
                      image={board.image_url}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    /></Link>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={likeHandler}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                    <CardContent>
                      <span>
                        <FaUser /> by {board.username}
                      </span>
                      <br></br>
                      <br></br>
                      <Typography variant="body2" color="text.secondary">
                        <div
                          dangerouslySetInnerHTML={{ __html: board.content.length > 25 ? board.content.substring(0, 25) + '...' : board.content }}
                          style={{ color: "black", backgroundColor: "white" }}
                        />
                      </Typography>
                    </CardContent>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <h3>로그인이 필요합니다</h3>
        </div>
      )}
      <div>
        {/* {boards && boards.map((board) => (
          <div key={board.id}>
            <h2>{board.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: board.content }} style={{ color: 'black', backgroundColor: 'white' }} />
          </div>
        ))} */}
      </div>
    </div>
  );
}
export default BoardScreen;

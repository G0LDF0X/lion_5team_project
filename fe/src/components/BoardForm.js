import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { grey } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

const likeHandler = () => {
  console.log('likeHandler');
}

export default function BoardForm({board}) {
  return (
    <div style={{ height: "500px" }}>
      <CardHeader
        avatar={<Link to={`/board/detail/${board.id}`}>
          <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
            R
          </Avatar>
        </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Link to={`/board/detail/${board.id}`}>{board.title}</Link>}
        subheader={board.createdAt}
        width="10"
      />
      <CardMedia
        component="img"
        height="220"
        // width="10"
        image={board.image_url}
        // alt="Paella dish"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={likeHandler}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {board.content}
        </Typography>
      </CardContent>
    </div>
  );
}
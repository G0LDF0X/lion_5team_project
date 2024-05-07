import React, { useState } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { styled } from '@mui/material';

const StyledCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: '#ff6d75',
  },
});

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function BoardForm({board}) {
  const [isLiked, setIsLiked] = useState(false);
  
  const likeHandler = () => {
    setIsLiked(!isLiked);
  }
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
          {/* <FavoriteIcon /> */}
          {/* <StyledCheckbox  icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> */}
          <StyledCheckbox  
          icon={<FavoriteBorder />} 
          checkedIcon={<Favorite />} 
          checked={isLiked} 
        />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          
          <div dangerouslySetInnerHTML={{ __html: board.content }} style={{ color: 'black', backgroundColor: 'white' }} />
        </Typography>
      </CardContent>
    </div>
  );
}
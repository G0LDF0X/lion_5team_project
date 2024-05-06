import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function ListForm({qna}) {
  return (
<>    
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Link to={`/qna/deatil/${qna.id}`}>{qna.title}</Link>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>

            {<Link to={`/qna/detail/${qna.id}`}><div dangerouslySetInnerHTML={{ __html: qna.content }} style={{ color: 'black', backgroundColor: 'white' }} /></Link>}

            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>  
  );
}
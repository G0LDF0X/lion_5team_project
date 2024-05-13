import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function ListForm({qna}) {
  return (
<>    
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Link to={`/qna/detail/${qna.id}`}>{qna.title}</Link>}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>

            {<Link to={`/qna/detail/${qna.id}`}><a dangerouslySetInnerHTML={{ __html: qna.content }} style={{ color: 'black', backgroundColor: 'white' }} /></Link>}

            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>  
  );
}
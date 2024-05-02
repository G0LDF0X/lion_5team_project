import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function DeletableChips(tag) {
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <Stack direction="row" spacing={1}>
            {/* <Chip label={tag.name} onDelete={handleDelete} /> */}
            <Chip label={tag.name} variant="outlined" onDelete={handleDelete} />
        </Stack>
    );
}
import { Card, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import Message from '../types/Message';

export default function MessageCard({ id, text }: Message) {
  const header = `Message #${id}`;
  return (
    <Grid xs={12}>
      <Card>
        <CardHeader title={header} />
        <CardContent>
          <p>{text}</p>
        </CardContent>
      </Card>
    </Grid>
  );
};

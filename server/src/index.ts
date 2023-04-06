import { createServer } from 'http';
import { app } from './app';

const port = process.env.PORT || 3001;

export const server = createServer(app.callback());

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

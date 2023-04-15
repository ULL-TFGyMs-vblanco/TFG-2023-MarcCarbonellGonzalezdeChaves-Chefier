import { createServer } from 'http';
import { app } from './app';

const port = 3000;

export const server = createServer(app.callback());

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

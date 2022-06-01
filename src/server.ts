/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* These two scripts need to be imported before app, to load the environment configs
   and establish some error handling */
import './startup.js';
import './utils/config.js';
import http from 'http';
import { Server, Socket } from 'socket.io';
import app from './app.js';
import registerMessageHandlers from './handlers/messageHandlers.js';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.set('io', io);

const onConnection = (socket: Socket) => {
  registerMessageHandlers(io, socket);
};

io.on('connection', onConnection);

const port = process.env.PORT || 3099;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

process.on('unhandledRejection', (err: Error) => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(`${err.name}: ${err.message}`);
  server.close(() => process.exit(1));
});

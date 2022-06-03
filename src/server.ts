// eslint-disable no-console
// eslint-disable prettier/prettier
// tslint:disable:ordered-imports
/* These two scripts need to be imported before app, to load the environment configs
   and establish some error handling */
import './startup.js';
import './utils/config.js';
import './db/db';
import http from 'http';
import { Server, Socket } from 'socket.io';
import app from './app.js';
import registerAtlassianHandlers from './socketHandlers/atlassianHandlers.js';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  },
});

app.set('io', io);

const onConnection = (socket: Socket) => {
  registerAtlassianHandlers(io, socket);
};

io.on('connection', onConnection);

const port = process.env.PORT || 3099;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(`${err.name}: ${err.message}`);
  server.close(() => process.exit(1));
});

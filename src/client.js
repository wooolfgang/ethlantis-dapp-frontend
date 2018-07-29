import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

const url = 'http://localhost:3030/';
const socket = io(url);

const client = feathers();

client.configure(socketio(socket));
client.configure(auth({ storage: window.localStorage }));

window.client = client;

export default client;

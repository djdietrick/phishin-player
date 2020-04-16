import {PhishApp} from './index';
const http = require('http');
const app = new PhishApp();

let server = http.createServer(app);
server.listen(process.env.PORT);
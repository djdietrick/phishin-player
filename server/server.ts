import {PhishApp} from './index';
const http = require('http');
const app = new PhishApp();

let server = http.createServer(app.express);
server.listen(process.env.PORT);
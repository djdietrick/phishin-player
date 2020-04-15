import * as express from 'express';
import axios from 'axios';
let cors = require('cors');
const path = require('path');
import {MusicRouter} from './routes/music';

const publicDir = path.join(__dirname, '../dist/');

export class PhishApp {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.initSettings();
        this.initRouters();
        this.initAxios();
    }

    public listen(port: Number): void {
        this.express.listen(port, () => {
            console.log("Server is up on port " + port);
        });
    }

    private initSettings(): void {
        this.express.use(express.static(publicDir));

        this.express.use(cors());
    }

    private initAxios(): void {
        axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.TOKEN;
        axios.defaults.headers.common['Accept'] = "application/json";
        axios.defaults.baseURL = 'http://phish.in/api/v1';
    }

    private initRouters(): void {
        this.express.use('/api', MusicRouter());

        this.express.get('/', (req: express.Request, res: express.Response) => {
            res.sendFile('index.html', {root: publicDir});
        });
    }
}

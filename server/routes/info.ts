import {Router, Request, Response} from 'express';
import axios from 'axios';

export function MusicRouter(router: Router = Router()): Router {
    router.get('/info/:date', getShowInfo);
    return router;
}

async function authRouter() {
    const url = 'https://phish.net/authorize?appid=X&uid=Y';
}

async function getShowInfo(req: Request, res: Response) {

}

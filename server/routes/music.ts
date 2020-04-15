import {Router, Request, Response} from 'express';
import axios from 'axios';

export function MusicRouter(router: Router = Router()): Router {
    router.get('/random', getRandomShow);
    router.get('/show/:date', getShowOnDate);
    return router;
}

async function getRandomShow(req: Request, res: Response) {
    const response = await axios.get('/random-show');

    let tracks = [];
    for(let i = 0; i < response.data.data.tracks.length; i++) {
        const track = response.data.data.tracks[i];
        tracks.push({
            title: track.title,
            artist: "Phish",
            src: track.mp3
        });
    } 

    res.send({
        date: response.data.data.date,
        venue: response.data.data.venue.name,
        location: response.data.data.venue.location,
        tracks
    });
}

async function getShowOnDate(req: Request, res: Response) {

}
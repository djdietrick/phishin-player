import {Router, Request, Response} from 'express';
import axios from 'axios';
const moment = require('moment');
//const imageSearch = require('image-search-google');
//const client = new imageSearch(process.env.CSEID, process.env.GOOGLE_API_KEY);

export function MusicRouter(router: Router = Router()): Router {
    router.get('/random', getRandomShow);
    router.get('/show/:date', getShowOnDate);
    return router;
}

async function getRandomShow(req: Request, res: Response) {
    const response = await axios.get('/random-show');

    let tracks = [];
    getCoverArt(response.data.data.date);
    for(let i = 0; i < response.data.data.tracks.length; i++) {
        const track = response.data.data.tracks[i];
        tracks.push({
            title: track.title,
            artist: "Phish",
            src: track.mp3
        });
    } 

    return res.send({
        date: response.data.data.date,
        venue: response.data.data.venue.name,
        location: response.data.data.venue.location,
        tracks
    });
}

async function getShowOnDate(req: Request, res: Response) {
    try {
        const date = moment(req.params.date);
        console.log(date.format('YYYY-MM-DD'));
        axios.get(`/show-on-date/${date.format('YYYY-MM-DD')}`)
            .then(response => {
                let tracks = [];
                for(let i = 0; i < response.data.data.tracks.length; i++) {
                    const track = response.data.data.tracks[i];
                    tracks.push({
                        title: track.title,
                        artist: "Phish",
                        src: track.mp3
                    });
                } 
            
                return res.send({
                    date: response.data.data.date,
                    venue: response.data.data.venue.name,
                    location: response.data.data.venue.location,
                    tracks
                });
            })
            .catch(err => {
                return res.status(404).send();
            })
    } catch(e) {
        console.error(e.message);
        return res.status(500).send(e.message);
    }
   
}

async function getShowInfo(showId: string) {
    //const phishNetUrl = `https://api.phish.net/v3/shows/links?apikey=${process.env.PHISHNET_API_KEY}&showId=${showId}`;

   // const a = axios.create();
    //const response = await a.get(phishNetUrl);
    //console.log(response.data);
}

async function getCoverArt(date: string) {
    const options = {
        page: 1
    }
    const res = await client.search('Phish ' + date, options);
    //console.log(res);
}
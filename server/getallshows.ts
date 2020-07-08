import {PhishApp} from './index';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';

async function request(page: number) {
    return await axios.get(`shows?page=${page}`);
}


async function main() {
    try {
        const app = new PhishApp();

        let obj = {
            shows: []
        }
        let res: any = null;
        let page = 1;

        do {
            res = await request(page);
            console.log(res.data.data[0]);

            for(const data of res.data.data) {
                const tracks: Array<string> = data.tracks.map(track => track.title)
                obj.shows.push({
                    date: data.date,
                    venue: data.venue.name,
                    location: data.venue.location,
                    tracks 
                });
            }
            page++;
        } while(res.data.data.length >= 20)

        fs.writeFileSync(path.join(__dirname, './test.json'), JSON.stringify(obj), 'utf8');

        //console.log(obj.shows)
        console.log("DONE!");

    } catch(e) {
        console.error(e);
    }
    
}

main();
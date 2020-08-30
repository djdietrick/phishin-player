import * as functions from 'firebase-functions';
import axios from 'axios';
import * as moment from 'moment';

const config = {
    headers: {
        'Authorization': `Bearer ${functions.config().phishin.token}`,
        'Accept': 'application/json'
    }
}

export const getRandomShow = functions.https.onCall((data, context) => {
    
    return axios.get('http://phish.in/api/v1/random-show', config)
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

            return {
                date: response.data.data.date,
                venue: response.data.data.venue.name,
                location: response.data.data.venue.location,
                tracks
            };
        })
        .catch(err => {
            return err;
        })
    
});

export const getShowOnDate = functions.https.onCall((data, context) => {
    const date = moment(data.date);
    return axios.get(`http://phish.in/api/v1/show-on-date/${date.format('YYYY-MM-DD')}`, config)
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
        
            return {
                date: response.data.data.date,
                venue: response.data.data.venue.name,
                location: response.data.data.venue.location,
                tracks
            };
        })
        .catch(err => {
            return err;
        })
});


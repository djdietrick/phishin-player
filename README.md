# phishin-player

## Project setup
```
npm install
```

### To configure
You need to add a directory titled 'config' in the root directory, and add your environment
files which will need to correspond to name in the ```npm run server``` command.

Needed fields:
* TOKEN=<your_phish_in_token>

You will also need to add your Vue config files to the root directory. For more info on
Vue environment variables visit https://cli.vuejs.org/guide/mode-and-env.html#modes

Needed fields:
* VUE_APP_SERVER_URL=<address_of_your_backend>

### Compiles and hot-reloads front-end code for development
```
npm run serve
```

### Compiles and minifies front-end code for production
```
npm run build
```

### Runs server code
```
npm run server
```


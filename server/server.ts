import {PhishApp} from './index';
const app = new PhishApp();
app.listen(parseInt(process.env.PORT));
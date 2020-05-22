import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';
import { environment } from './config/config';


const port: number = parseInt(environment.port);
const server = Server.init(port);
MySQL.instance;

server.app.use(router)

server.start(() => {
    console.log('App listening on port 3000');
});
import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';

const server = Server.init(3000);
MySQL.instance;

server.app.use(router)

server.start(() =>{
    console.log('App listening on port 3000');
});
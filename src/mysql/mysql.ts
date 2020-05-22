import mysql = require('mysql');

export default class MySql {
    private static _instance: MySql;
    
    cnn: mysql.Connection;
    connected: boolean = false;
    
    constructor() {
        console.log('clase initialized');
        
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        })
        
        this.connectDB();
    }
    
    public static get instance() {
        //get instance of DB  || create new instance of DB
        return this._instance || (this._instance = new this());
    }
    
    static executeQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            //internal error
            if (err) {
                console.log('Error query');
                console.log(err);
                return callback(query);
            }
            //empty result
            if (results.length <= 0) {
                callback('the requested file does not exist')
            }
            else {
                callback(null, results);
            }
        });
    }
    
    private connectDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                return console.log(err.message);
            }
            
            //user connected to db with exit!
            this.connected = true;
            console.log('Has been connected to Database')
        })
    }
}
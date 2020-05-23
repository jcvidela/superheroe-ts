import { Router, Request, Response } from 'express';
import MySql from '../mysql/mysql';

const router = Router();

/**
* MySQL: 
* estado = 0 means that inactive
* estado = 1 means that active
*/

//get list from all heroes
router.get('/heroes', (req: Request, res: Response) => {
    const query = `SELECT * FROM heroes WHERE estado = 1`;
    
    /**
    * @param query
    * @callback error doesn't need type
    * @callback heroes array with objects inside 
    */
    MySql.executeQuery(query, (err: any, heroes: Object[]) => {
        // error...
        if (err) {
            return res.status(400)
            .json({ ok: false, error: err })
        }
        
        //if already ok
        res.json({ ok: true, heroes })
    });
})

//get hero by id
router.get('/heroes/:id', (req: Request, res: Response) => {
    //extract hero id from request params
    let id = req.params.id;
    //escape serves to prevent injection of malicious characters (SQL Injection)
    let escapeId = MySql.instance.cnn.escape(id);
    
    const query = `
    SELECT * FROM heroes
    WHERE id = ${escapeId} AND estado = 1
    `;
    
    /**
    * @param query
    * @callback error doesn't need type
    * @callback heroes array with 1 object inside 
    */
    MySql.executeQuery(query, (err: any, heroe: Object[]) => {
        // error...
        if (err) {
            return res.status(400)
            .json({ ok: false, error: err })
        }
        
        // if already ok
        res.json({ ok: true, heroe: heroe[0] })
    });
})

//udpate hero by id
router.put('/heroes/:id', (req: Request, res: Response) => {
    
    let escapeId = MySql.instance.cnn.escape(req.params.id);
    let escapeNombre = MySql.instance.cnn.escape(req.query.nombre);
    let escapeSPoder = MySql.instance.cnn.escape(req.query.superpoder);
    
    const query =
    `
    UPDATE heroes 
    SET nombres = ${escapeNombre}, superpoder = ${escapeSPoder}
    WHERE id = ${escapeId}
    `
    
    MySql.executeQuery(query, (err: any, heroe: any) => {
        // error...
        if (err) {
            return res.status(400)
            .json({ ok: false, error: err })
        }
        
        // delete first ( why ) doesn't exist
        let cleanMessage = heroe.message.substr(1);
        
        // if already ok
        res.send({ ok: true, message: cleanMessage });
    });
});

//disable heroes from db 'delete'
router.post('/heroes/:id', (req: Request, res: Response) => {
    let escapeId = MySql.instance.cnn.escape(req.params.id);
    
    const query = `
    UPDATE heroes
    SET estado = 0
    WHERE id = ${escapeId}
    `;
    
    MySql.executeQuery(query, (err: any, heroe: any) => {
        // error...
        if (err) {
            return res.status(400)
            .json({ ok: false, error: err })
        }
        
        // delete first ( why ) doesn't exist
        let cleanMessage = heroe.message.substr(1);
        
        // if already ok
        res.send({ ok: true, message: cleanMessage });
    })
})


export default router;
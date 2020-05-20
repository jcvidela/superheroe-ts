import { Router, Request, Response } from 'express';
import MySql from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
    
    const query = `
    SELECT * FROM heroes
    `;
    
    MySql.executeQuery(query, (err: any, heroes: Object[]) => {
        if (err) {
            return res.status(400)
            .json({ ok: false, error: err })
        }
        
        res.json({ ok: true, heroes })
    });
})

router.get('/heroes/:id', (req: Request, res: Response) => {
    
    let id = req.params.id;
    let escapeId = MySql.instance.cnn.escape(id);
    
    const query = `
    SELECT * FROM heroes
    WHERE id = ${escapeId}
    `;
    
    MySql.executeQuery(query, (err: any, heroe: Object[]) => {
        if (err) {
            return res.status(400)
            .json({ ok: false, error: err })
        }
        
        res.json({ ok: true, heroe: heroe[0] })
    });
})

export default router;
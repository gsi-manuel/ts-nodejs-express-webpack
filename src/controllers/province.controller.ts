import { Request, Response } from 'express';

import { ProvinceService } from '../services/province.service';

export class ProvinceController {
    private provinceService: ProvinceService;

    constructor() {
        this.provinceService = new ProvinceService();
    }

    public create (req: Request, res: Response) {
        (async () => {
            try {
                await this.provinceService.create(req.body);
                res.sendStatus(201);
            } catch(err) {
                res.status(400).send(err);
            }
        })();
    }

    public find (req: Request, res: Response) {
        (async () => {
            try {
                const provinces = await this.provinceService.find(req);
                res.send({provinces});
            } catch(err) {
                res.status(400).send(err);
            }
        })();
    }

    public findOne (req: Request, res: Response) {
        (async () => {
            try {
                const _id = req.params.id;
                const province = await this.provinceService.findOne(_id);
                res.send(province);
            } catch(err) {
                res.status(400).send(err);
            }
        })();
    }

    public update (req: Request, res: Response) {
        (async () => {
            try {
                const _id = req.params.id;
                await this.provinceService.update(_id, req.body);
                res.sendStatus(200);
            } catch(err) {
                res.status(400).send(err);
            }
        })();
    }

    public delete (req: Request, res: Response) {
        (async () => {
            try {
                const _id = req.params.id;
                await this.provinceService.delete(_id);
                res.sendStatus(200);
            } catch(err) {
                res.status(400).send(err);
            }
        })();
    }
}
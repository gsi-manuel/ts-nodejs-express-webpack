import {Request, Response} from "express";

import { ProvinceController } from '../controllers/province.controller';

export class ProvinceRoutes { 
    private provinceController: ProvinceController;

    constructor() {
        this.provinceController = new ProvinceController();
    }      
    public routes(app: any): void {          
        app.route('/admin/provinces')
        .get((req: Request, res: Response) => {            
            this.provinceController.find(req, res);
        })
        // POST endpoint
        .post((req: Request, res: Response) => {   
            this.provinceController.create(req, res);
        });   
        
        app.route('/admin/provinces/:id')
        .get((req: Request, res: Response) => {            
            this.provinceController.findOne(req, res);
        })
        .delete((req: Request, res: Response) => {   
            this.provinceController.delete(req, res);
        })
        .put((req: Request, res: Response) => {   
            this.provinceController.update(req, res);
        });
    }
}
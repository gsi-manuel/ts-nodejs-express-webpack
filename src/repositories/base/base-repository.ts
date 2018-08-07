// const mongoose = require('mongoose');
import * as mongoose from 'mongoose';

import { IWrite } from '../interfaces/i.write';
import { IRead } from '../interfaces/i.read';
import { Config } from '../../config/config';


export class BaseRepository implements IWrite, IRead {
    private schema: any;
    private config: Config;

    // we created constructor with arguments to manipulate mongodb operations
    constructor(schemaName: any) {
        this.schema = schemaName;
        this.config = new Config();
    }

    public create(item: any, attrValidate: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            this.schema.findOne(attrValidate, (err: any, obj: any) => {
                if (err) reject(err.name + ': ' + err.message);
                if (obj) {
                    // obj already exists
                    reject('Object with "' + JSON.stringify(attrValidate) + '" is already exists');
                } else {
                    item.save((err: any, new_obj: any) => {
                        if (err) reject(err.name + ': ' + err.message);
                        resolve();
                    });
                }
            });
        });
    }    

    public findOne(_id: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            this.schema.findById(_id, (err: any, obj: any) => {
                if (err) reject(err.name + ': ' + err.message);
                obj ? resolve(obj) : resolve();
            });
        });
    }

    /*
     *   FOR OTHER PARAMS (SORT), IS THIS EXAMPLE
     *  
     */
    // private search () {
    //     const count = (this.provincesPerPage).toString();
    //     const page = (this.selectedPage).toString();
    //     let paramFilter = {
    //       contains: {
    //         name: this.filterName || '',
    //         code: this.filterCode || ''
    //       },
    //       sort:{
    //         all: 'code'
    //       }
    //     };
    
    //     let params = '?count=' + count + '&page=' + page;
    //     for (let p in paramFilter) {
    //       for (let a in paramFilter[p]) {
    //         if(paramFilter[p][a] !== '')
    //           params += '&' + p + '[' + a + ']=' + paramFilter[p][a];
    //       }
    //     }
    //     this.getProvinces(params);
    //   }

    public find(req: any, populate?: any, sort?: any, filters?: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const count = (req !== undefined && req.query.count !== undefined) ? req.query.count : this.config.getItemsPerPage();
            const page = (req !== undefined && req.query.page !== undefined) ? req.query.page : this.config.getInitPage();

            const mandatory: any = {};
            if (req !== undefined){
                delete (req.query.count);
                delete (req.query.page);
                for ( let query in req.query ){
                    mandatory[query] = {};
                    for ( let aux in req.query[query]){
                        if (populate !== undefined && populate.indexOf(aux) >= 0){
                            mandatory[query][aux] = mongoose.Types.ObjectId(req.query[query][aux]);
                        } else {
                            mandatory[query][aux] = req.query[query][aux];
                        }
                    }
                }
            }

            const filter = {
                filters : {
                    mandatory : mandatory,
                    // mandatory: {
                    //     contains: req.query.contains,
                    //     moreThan: req.query.moreThan,
                    //     exact: req.query.exact,
                    //     greaterThan: req.query.greaterThan,
                    //     greaterThanEqual: req.query.greaterThanEqual,
                    //     lessThan: req.query.lessThan,
                    //     lessThanEqual: req.query.lessThanEqual,
                    //     notEqual: req.query.notEqual,
                    // },
                    field: filters || []
                }
            };

            const pagination = {
                start: (page - 1) * count,
                count: count
            };
        
            this.schema
                .find()
                .populate(populate||[])
                .field(filter)
                .filter(filter)
                .order(sort)
                .page(pagination, (error: any, element: any) => {
                    error ? resolve() : resolve(element);
                });
        });
    }

    public update(_id: string, item: any): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => { 
            this.schema.findByIdAndUpdate(_id, item, (err: any, obj: any) => {
                if (err) reject(err.name + ': ' + err.message);
                resolve();
            });
        });
    }

    public delete(_id: string): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => { 
            this.schema.findById(_id, (err: any, obj: any) => {
                if (err) reject(err.name + ': ' + err.message);
                obj.remove((err: any) => {
                    if (err) reject(err.name + ': ' + err.message);
                    resolve();
                });
            });
        });
    }
}
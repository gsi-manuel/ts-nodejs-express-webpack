import * as mongoose from 'mongoose';
import { Config } from '../../config/config';

// For read doc: https://www.npmjs.com/package/mongoose-middleware
export class AbstractRepository {
    private config: Config;

    constructor() {
        this.config = new Config();
    }

    public find(schema: any, filter: any, populate?: any): Promise<any> { 
        return new Promise((resolve: any, reject: any) => {
            const count = filter ? filter.pageSize : this.config.getItemsPerPage();
            const page =  filter ? filter.pageNumber : this.config.getInitPage();

            const mandatory: any = {};
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

            const options = {
                start: (page - 1) * count,
                count: count,
                filters : {
                    field: filter.field || [], // for specific fields
                    keyword : filter.keyword,
                    mandatory : mandatory,
                },
                sort : filter.sort
            };

            schema
                .find()
                .field(options)
                .keyword(options)
                .populate(populate||[])
                .filter(options)
                .order(options)
                .page(options, (error: any, element: any) => {
                    error ? resolve() : resolve(element);
                });

        });
    }

    public create(schema: any, item: any, attrValidate: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            schema.findOne(attrValidate, (err: any, obj: any) => {
                if (err) reject(err.name + ': ' + err.message);
                if (obj) {
                    // obj already exists
                    reject('Object with "' + JSON.stringify(attrValidate) + '" is already exists');
                } else {
                    item.save((err: any, new_obj: any) => {
                        if (err) reject(err.name + ': ' + err.message);
                        console.log(new_obj);
                        resolve(new_obj);
                    });
                }
            });
        });
    }    
}
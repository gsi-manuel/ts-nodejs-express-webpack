export interface IWrite {
    create(item: any, atrValidate: any): Promise<any>;
    update(id: string, item: any): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
export class Config {
    // PORT: process.env.PORT || 3000,
    // DB: process.env.MONGODB || 'mongodb://app:app123@127.0.0.1:27017/db_sil',
    // // SECRET_TOKEN: process.env.TOKEN_SECRET || 'miclavedetokens',
    // SALT_FACTOR: 10,
    // ITEMS_PER_PAGE: 30,
    // INIT_PAGE: 1,
    // JWT_SECRET: process.env.TOKEN_SECRET || "MyS3cr3tK3Y",
    // JWT_SESSION: {
    //     session: false
    // }
    private db: string;
    private port: number;
    private itemsPerPage: number;
    private initPage: number;
    private saltFactor: number;
    private jwtSecret: string;

    constructor() {
        this.db = process.env.MONGODB || 'mongodb://appnode:appnode@127.0.0.1:27017/appnode';
        this.port = 3000;
        this.initPage = 1;
        this.itemsPerPage  = 10;
        this.saltFactor = 10;
        this.jwtSecret = process.env.TOKEN_SECRET || "MyS3cr3tK3Y";
    }

    public getDb() {
        return this.db;
    }

    public getPort() {
        return this.port;
    }

    public getSaltFactor() {
        return this.saltFactor;
    }

    public getItemsPerPage() {
        return this.itemsPerPage;
    }

    public getInitPage() {
        return this.initPage;
    }

    public getJwtSecret() {
        return this.jwtSecret;
    }
}
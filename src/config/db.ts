const mongoose = require( 'mongoose' );
require('mongoose-middleware').initialize(mongoose);
import { Config } from '../config/config';

const config = new Config();
const dbURI = config.getDb();
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', (err: any) => {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
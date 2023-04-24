"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const databaseUrl = process.env.DATABASE_URL ||
    'mongodb://chefier:chefierapi@172.16.27.2:27017/chefier?retryWrites=true&w=majority';
console.log(databaseUrl);
// Connection to database
(0, mongoose_1.connect)('mongodb+srv://chefier:chefierapi@chefiercluster.jfpz3hd.mongodb.net/chefier?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => {
    console.log('Connection to MongoDB server established');
})
    .catch((err) => {
    console.log(err);
});

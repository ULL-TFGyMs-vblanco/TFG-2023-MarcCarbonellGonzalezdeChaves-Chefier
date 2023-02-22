import {connect} from 'mongoose';
import {remoteUrl} from './dbconfig';

const databaseUrl = process.env.DATABASE_URL as string || remoteUrl;
console.log(databaseUrl);

// Connection to database
connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});

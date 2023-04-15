import { connect } from 'mongoose';

const databaseUrl =
  (process.env.DATABASE_URL as string) ||
  'mongodb://chefier:chefierapi@172.16.27.2:27017/chefier?retryWrites=true&w=majority';
console.log(databaseUrl);

// Connection to database
connect(databaseUrl, {
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

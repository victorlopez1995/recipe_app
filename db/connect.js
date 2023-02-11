const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  try {
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        _db = client;
        callback(null, _db);
      })
      .catch((err) => {
        console.error("Error connecting to DB", err);
        callback(err);
      });
  } catch (error) {
    console.error("Error connecting to DB", error);
    callback(error);
  }
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

const closeDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  _db.close();
};

const setDb = (newDb) =>{
  if (_db) {

    return _db = newDb;
  }
}

module.exports = {
  initDb,
  getDb,
  closeDb,
  setDb
};

'use strict'
const Bluebird = require('bluebird')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/contact'
Bluebird.promisifyAll(MongoClient)

console.log('Upper');

module.exports.up = next => {
  console.log('In up');
  let mClient = null
  return MongoClient.connect(url)
  .then(client => {
    mClient = client
    return client.db();
  })
  .then(db => {
    console.log('In db');
    const User = db.collection('contacts')
    return User
      .find({ lastName: { $exists: false }})
      .forEach(result => {
        console.log('Result');
        console.log(result);
        if (!result) return next('All docs have lastName')
        if (result.name) {
           const { name } = result
           result.lastName = name.split(' ')[1]
           result.firstName = name.split(' ')[0]
        }
        return db.collection('contacts').save(result)
     })
  })
  .then(() => {
    
    mClient.close()
    return next()
  })
   .catch(err => next(err))
}
module.exports.down = function (next) {
  next()
}

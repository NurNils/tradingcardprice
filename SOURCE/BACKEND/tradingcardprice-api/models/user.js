const mongoose = require('mongoose');

/** User schema */
const USER = (module.exports = mongoose.model(
  'User',
  mongoose.Schema({
    /** Username (e.q.: Tradingcartname) */
    username: {
      type: String,
      required: true,
      min: 3,
      max: 25,
      index: {
        unique: true,
      },
    },

    /** E-Mail (e.q.: mail@example.com) */
    email: {
      type: String,
      required: true,
      min: 3,
      max: 100,
      index: {
        unique: true,
      },
    },

    /** Rank */
    rank: {
      type: String,
      required: true,
      default: 'user',
    },

    /** Password (Encrypted password) */
    password: {
      type: String,
      required: true,
    },
  })
));

/** Get all */
module.exports.getAll = (callback, limit) => {
  USER.find(callback).limit(limit);
};

/** Get by _id */
module.exports.get = (_id, callback) => {
  USER.findOne({ _id, rank: 'admin' }, callback);
};

/** Get by (email or username) and password */
module.exports.getByEmailUsernamePassword = (usernameOrEmail, callback) => {
  USER.findOne(
    {
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    },
    callback
  );
};

/** Delete by _id */
module.exports.delete = (_id, callback) => {
  USER.deleteOne({ _id }, callback);
};

/** Add object */
module.exports.add = (data, callback) => {
  if (data._id == null) data._id = new mongoose.mongo.ObjectID();
  USER.create(data, callback);
};

/** Update by _id */
module.exports.update = (_id, data, options, callback) => {
  USER.findOneAndUpdate(
    { _id },
    {
      username: data.username,
      email: data.email,
      password: data.password,
    },
    options,
    callback
  );
};

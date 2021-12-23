const mongoose = require('mongoose');

/** Purchase schema */
const PURCHASE = (module.exports = mongoose.model(
  'Purchase',
  mongoose.Schema({
    /** Sale date */
    saleDate: {
      type: Date,
      default: Date.now,
    },

    /** Product _id */
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    /** Price of article */
    price: {
      type: Number,
      required: true,
    },

    /** Ebay auction currency */
    currency: {
      type: String,
      required: true,
    },

    /** Ebay auction title */
    title: {
      type: String,
      required: true,
    },

    /** Ebay auction id */
    auctionId: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },

    /** Ebay seller id */
    sellerId: {
      type: String,
      required: true,
    },

    /** Ebay sale type */
    saleType: {
      type: String,
      required: true,
    },
  })
));

/** Get all */
module.exports.getAll = (callback, limit) => {
  PURCHASE.find(callback).limit(limit);
};

/** Get by productId */
module.exports.getByProductId = (productId, callback) => {
  PURCHASE.find({ productId }, {}, { sort: { saleDate: 1 } }, callback);
};

/** Duplicate by _id */
module.exports.duplicate = (_id, callback) => {
  PURCHASE.findById(_id).exec((err, doc) => {
    doc._id = mongoose.Types.ObjectId();
    doc.isNew = true;
    doc.save(callback);
  });
};

/** Delete by _id */
module.exports.delete = (_id, callback) => {
  PURCHASE.deleteOne({ _id }, callback);
};

/** Add object */
module.exports.add = (data, callback) => {
  if (data._id == null) data._id = new mongoose.mongo.ObjectID();
  PURCHASE.create(data, callback);
};

/** Update by _id */
module.exports.update = (_id, data, options, callback) => {
  PURCHASE.findOneAndUpdate(
    { _id },
    {
      saleDate: data.saleDate,
      productId: data.productId,
      price: data.price,
      currency: data.currency,
      title: data.title,
      auctionId: data.auctionId,
      sellerId: data.sellerId,
      saleType: data.saleType,
    },
    options,
    callback
  );
};

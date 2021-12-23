const mongoose = require('mongoose');

const TranslateItem = {
  cn: { type: String, required: false },
  de: { type: String, required: true },
  en: { type: String, required: false },
  es: { type: String, required: false },
  fr: { type: String, required: false },
  it: { type: String, required: false },
  jp: { type: String, required: false },
  nl: { type: String, required: false },
  pl: { type: String, required: false },
  pt: { type: String, required: false },
  ru: { type: String, required: false },
};

/** Item schema */
const ITEM = (module.exports = mongoose.model(
  'Item',
  mongoose.Schema({
    /** Important dates */
    dates: {
      createdAt: { type: Date, default: Date.now },
      lastChanges: { type: Date, default: Date.now },
    },

    /** Unique key (e.q.: Pikachu 1/102) */
    key: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
      min: 1,
      max: 50,
    },

    /** Priority for sort */
    priority: {
      type: Number,
      required: true,
    },

    /** Product _id */
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    /** Unique index (e.q.: 1/3) */
    index: {
      type: String,
      required: true,
    },

    /** Is it activated? */
    activated: {
      type: Boolean,
      required: true,
    },

    /** Displayname */
    displayname: TranslateItem,

    /** Description as markdown */
    description: TranslateItem,

    /** Thumbnail (image) */
    thumbnail: {
      type: String,
      required: true,
    },

    /** Images (image urls) */
    images: {
      type: [String],
      required: true,
    },

    /** Total clicks */
    clicks: {
      type: Number,
      required: true,
    },
  })
));

/** Get all */
module.exports.getAll = (callback, limit) => {
  ITEM.find(callback).limit(limit);
};

/** Get by _id */
module.exports.get = (_id, callback) => {
  ITEM.findOneAndUpdate({ _id }, { $inc: { clicks: 1 } }, { new: true }, callback);
};

/** Get by productId */
module.exports.getByProductId = (productId, callback) => {
  ITEM.find({ productId, activated: true }, {}, { sort: { priority: 1 } }, callback);
};

/** Duplicate by _id */
module.exports.duplicate = (_id, callback) => {
  ITEM.findById(_id).exec((err, doc) => {
    doc._id = mongoose.Types.ObjectId();
    doc.key = `${doc.key}1`;
    doc.isNew = true;
    doc.save(callback);
  });
};

/** Delete by _id */
module.exports.delete = (_id, callback) => {
  ITEM.deleteOne({ _id }, callback);
};

/** Add object */
module.exports.add = (data, callback) => {
  if (data._id == null) data._id = new mongoose.mongo.ObjectID();
  ITEM.create(data, callback);
};

/** Update by _id */
module.exports.update = (_id, data, options, callback) => {
  ITEM.findOneAndUpdate(
    { _id },
    {
      dates: {
        createdAt: data.createdAt,
        lastChanges: Date.now(),
      },
      key: data.key,
      priority: data.priority,
      productId: data.productId,
      index: data.index,
      activated: data.activated,
      displayname: data.displayname,
      description: data.description,
      thumbnail: data.thumbnail,
      images: data.images,
      clicks: data.clicks,
    },
    options,
    callback
  );
};

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

/** Product schema */
const PRODUCT = (module.exports = mongoose.model(
  'Product',
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

    /** Game _id */
    gameId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    /** Category _id */
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    /** Unique index (e.q.: 1/102) */
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

    /** Rarity */
    rarity: {
      type: String,
      required: false,
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

    /** Ebay keywords */
    ebayKeywords: {
      type: String,
      required: true,
    },

    /** Ebay categoryId */
    ebayCategoryId: {
      type: String,
      required: true,
    },
  })
));

/** Get all */
module.exports.getAll = (callback, limit) => {
  PRODUCT.find(callback).limit(limit);
};

/** Get all for ebay */
module.exports.getAllForEbay = (callback, limit) => {
  PRODUCT.find({ $where: 'this.ebayKeywords.length > 1' }, callback).limit(limit);
};

/** Get all for fake prices */
module.exports.getAllForFakePrices = (callback, limit) => {
  PRODUCT.find({ $where: 'this.ebayKeywords.length < 2' }, callback).limit(limit);
};

/** Get all by search */
module.exports.search = (search, lang, gameId, callback, limit) => {
  PRODUCT.find(
    {
      $or: [
        { 'displayname.de': { $regex: search, $options: 'i' }, gameId },
        { 'displayname.en': { $regex: search, $options: 'i' }, gameId },
        { index: { $regex: search, $options: 'i' }, gameId },
      ],
    },
    callback
  ).limit(limit);
  /**
  switch(lang) {
    case 'de':
      PRODUCT.find({'displayname.de': {$regex: search, $options: 'i'}}, callback).limit(limit);
      break;
    default:
      PRODUCT.find({'displayname.en': {$regex: search, $options: 'i'}}, callback).limit(limit);
      break;
  }
  */
};

/** Get by _id */
module.exports.get = (_id, callback) => {
  PRODUCT.findOneAndUpdate({ _id }, { $inc: { clicks: 1 } }, { new: true }, callback);
};

/** Get by key */
module.exports.getByKey = (key, callback) => {
  PRODUCT.findOneAndUpdate({ key }, { $inc: { clicks: 1 } }, { new: true }, callback);
};

/** Get by categoryId */
module.exports.getByCategoryId = (categoryId, callback) => {
  PRODUCT.find({ categoryId, activated: true }, {}, { sort: { priority: 1 } }, callback);
};

/** Duplicate by _id */
module.exports.duplicate = (_id, callback) => {
  PRODUCT.findById(_id).exec((err, doc) => {
    doc._id = mongoose.Types.ObjectId();
    doc.key = `${doc.key}1`;
    doc.isNew = true;
    doc.save(callback);
  });
};

/** Delete by _id */
module.exports.delete = (_id, callback) => {
  PRODUCT.deleteOne({ _id }, callback);
};

/** Add object */
module.exports.add = (data, callback) => {
  if (data._id == null) data._id = new mongoose.mongo.ObjectID();
  PRODUCT.create(data, callback);
};

/** Update by _id */
module.exports.update = (_id, data, options, callback) => {
  PRODUCT.findOneAndUpdate(
    { _id },
    {
      dates: {
        createdAt: data.createdAt,
        lastChanges: Date.now(),
      },
      key: data.key,
      priority: data.priority,
      gameId: data.gameId,
      categoryId: data.categoryId,
      index: data.index,
      activated: data.activated,
      displayname: data.displayname,
      description: data.description,
      thumbnail: data.thumbnail,
      rarity: data.rarity,
      images: data.images,
      clicks: data.clicks,
      ebayKeywords: data.ebayKeywords,
      ebayCategoryId: data.ebayCategoryId,
    },
    options,
    callback
  );
};

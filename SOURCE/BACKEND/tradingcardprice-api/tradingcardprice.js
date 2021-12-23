const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const https = require('https');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

const production = process.env.PRODUCTION === 'true';
const port = process.env.PORT;

const CATEGORY = require('./models/category');
const GAME = require('./models/game');
const ITEM = require('./models/item');
const PRODUCT = require('./models/product');
const SUPERCATEGORY = require('./models/supercategory');
const PURCHASE = require('./models/purchase');
const USER = require('./models/user');

const eBay = require('ebay-node-api');

/**********************
 * Config / Preperation
 **********************/

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/** Origins */
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

/**********************
 * Ebay
 **********************/

const ebay = new eBay({
  clientID: process.env.EBAY_CLIENTID,
  env: process.env.EBAY_MODE,
  headers: {
    'X-EBAY-C-MARKETPLACE-ID': 'EBAY-US', // For Ebay US
  },
});

function checkProductPricesFromDataJson() {
  const charizardItems = JSON.parse(fs.readFileSync('assets/data/charizard.json')).data[0].item;
  charizardItems.forEach((item) => {
    const title = item.title[0];
    if (title.toLowerCase().indexOf('proxy') == -1) {
      const purchase = {
        saleDate: new Date(item.listingInfo[0].endTime[0]),
        productId: mongoose.Types.ObjectId('60950208c90ea860b258550f'),
        price: Number(item.sellingStatus[0].convertedCurrentPrice[0].__value__),
        currency: item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'],
        title: item.title[0],
        auctionId: item.itemId[0],
        sellerId: item.sellerInfo[0].sellerUserName[0],
        saleType: item.listingInfo[0].listingType[0],
      };
      PURCHASE.add(purchase, (err, purchase) => {});
    }
  });
  const blastoiseItems = JSON.parse(fs.readFileSync('assets/data/blastoise.json'))[0].searchResult[0].item;
  blastoiseItems.forEach((item) => {
    const title = item.title[0];
    if (title.toLowerCase().indexOf('proxy') == -1) {
      const purchase = {
        saleDate: new Date(item.listingInfo[0].endTime[0]),
        productId: mongoose.Types.ObjectId('6092b246c90ea860b25854f7'),
        price: Number(item.sellingStatus[0].convertedCurrentPrice[0].__value__),
        currency: item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'],
        title: item.title[0],
        auctionId: item.itemId[0],
        sellerId: item.sellerInfo[0].sellerUserName[0],
        saleType: item.listingInfo[0].listingType[0],
      };
      PURCHASE.add(purchase, (err, purchase) => {});
    }
  });
}
checkProductPricesFromDataJson();

function checkProductPrices() {
  PRODUCT.getAllForEbay((err, products) => {
    products.forEach((product) => {
      ebay
        .findCompletedItems({
          keywords: product.ebayKeywords,
          //categoryId: product.ebayCategoryId,
          Condition: 3000,
          SoldItemsOnly: true,
          entriesPerPage: 100,
          pageNumber: 1,
        })
        .then(
          (data) => {
            if (data) {
              const items = data[0].searchResult[0].item;
              items.forEach((item) => {
                const title = item.title[0];
                if (title.toLowerCase().indexOf('proxy') == -1) {
                  const purchase = {
                    saleDate: new Date(item.listingInfo[0].endTime[0]),
                    productId: product._id,
                    price: Number(item.sellingStatus[0].convertedCurrentPrice[0].__value__),
                    currency: item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'],
                    title: item.title[0],
                    actionId: item.itemId[0],
                    sellerId: item.sellerInfo[0].sellerUserName[0],
                    saleType: item.listingInfo[0].listingType[0],
                  };
                  PURCHASE.add(purchase, (err, purchase) => {});
                }
              });
            }
          },
          (error) => {
            // console.log(error);
          }
        );
    });
  });
}
checkProductPrices();

function fakePrices() {
  PRODUCT.getAllForFakePrices((err, products) => {
    products.forEach((product) => {
      const start = new Date(2019, 0, 1);
      const end = new Date();
      const purchase = {
        saleDate: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        productId: product._id,
        title: 'Fake Data',
        price: Math.floor(Math.random() * 10000) + 10,
        currency: 'EUR',
        auctionId: `${Math.floor(Math.random() * 999999999999) + 100000000000}`,
        sellerId: 'sellerId',
        saleType: 'Auction',
      };
      PURCHASE.add(purchase, (err, purchase) => {});
    });
  });
}
fakePrices();
setInterval(fakePrices, 1000 * 60 * 60); // every hour

/**********************
 * Authentication
 **********************/

/** Authenticate user */
authenticate = (req, res, next) => {
  if (req.cookies.authToken) {
    jwt.verify(req.cookies.authToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ status: 'error', message: 'Failed to authenticate token' });
      } else {
        USER.get(decoded._id, (err, user) => {
          if (!err && user) {
            req.user = user;
            next();
          } else {
            res.status(403).json({
              status: 'error',
              message:
                'Failed to load user. You need to be an admin. Please contact server administrator.',
            });
          }
        });
      }
    });
  } else {
    res.status(403).json({ status: 'error', message: 'No authToken were provided' });
  }
};

/**********************
 * Routes
 **********************/

// Authorized Calls
app.get(`/acp`, authenticate, (req, res) => {
  CATEGORY.getAll((err, categories) => {
    if (!err && categories) {
      GAME.getAll((err, games) => {
        if (!err && games) {
          ITEM.getAll((err, items) => {
            if (!err && items) {
              PRODUCT.getAll((err, products) => {
                if (!err && products) {
                  SUPERCATEGORY.getAll((err, supercategories) => {
                    if (!err && supercategories) {
                      res.status(200).send({
                        status: 'success',
                        data: {
                          categories,
                          games,
                          items,
                          products,
                          supercategories,
                        },
                      });
                    } else {
                      res
                        .status(200)
                        .send({ status: 'error', message: 'Failed to load supercategories' });
                    }
                  });
                } else {
                  res.status(200).send({ status: 'error', message: 'Failed to load products' });
                }
              });
            } else {
              res.status(200).send({ status: 'error', message: 'Failed to load items' });
            }
          });
        } else {
          res.status(200).send({ status: 'error', message: 'Failed to load games' });
        }
      });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to load categories' });
    }
  });
});

// Game Calls
app.get(`/game`, authenticate, (req, res) => {
  GAME.getAll((err, games) => {
    if (!err && games) {
      res.status(200).send({ status: 'success', data: games });
    } else {
      res.status(200).send({ status: 'error', message: 'No game was found' });
    }
  });
});

app.get(`/game/:id`, authenticate, (req, res) => {
  GAME.get(req.params.id, (err, game) => {
    if (!err && game) {
      res.status(200).send({ status: 'success', data: game });
    } else {
      res.status(200).send({ status: 'error', message: 'No game was found' });
    }
  });
});

app.get(`/game/:id/duplicate`, authenticate, (req, res) => {
  GAME.duplicate(req.params.id, (err, game) => {
    if (!err && game) {
      res.status(200).send({ status: 'success', data: game });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to duplicate game' });
    }
  });
});

app.put(`/game/:id`, authenticate, (req, res) => {
  GAME.update(req.params.id, req.body, { new: true }, (err, game) => {
    if (!err && game) {
      res.status(200).send({ status: 'success', data: game });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to update game' });
    }
  });
});

app.post(`/game`, authenticate, (req, res) => {
  GAME.add(req.body, (err, game) => {
    if (!err && game) {
      res.status(200).send({ status: 'success', data: game });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to add game' });
    }
  });
});

app.delete(`/game/:id`, authenticate, (req, res) => {
  GAME.delete(req.params.id, (err, result) => {
    if (!err && result) {
      if(result.ok && result.deletedCount == 1) {
        res.status(200).send({ status: 'success', data: null });
      } else {
        res.status(200).send({ status: 'error', message: `Cannot find game with _id ${req.params.id}` });
      }
    } else {
      res.status(200).send({ status: 'error', message: `Failed to delete game with _id ${req.params.id}` });
    }
  });
});

// Supercategory Calls
app.get(`/supercategory`, authenticate, (req, res) => {
  SUPERCATEGORY.getAll((err, supercategory) => {
    if (!err && supercategory) {
      res.status(200).send({ status: 'success', data: supercategory });
    } else {
      res.status(200).send({ status: 'error', message: 'No supercategory was found' });
    }
  });
});

app.get(`/supercategory/:id`, authenticate, (req, res) => {
  SUPERCATEGORY.get(req.params.id, (err, supercategory) => {
    if (!err && supercategory) {
      res.status(200).send({ status: 'success', data: supercategory });
    } else {
      res.status(200).send({ status: 'error', message: 'No supercategory was found' });
    }
  });
});

app.get(`/supercategory/:id/duplicate`, authenticate, (req, res) => {
  SUPERCATEGORY.duplicate(req.params.id, (err, supercategory) => {
    if (!err && supercategory) {
      res.status(200).send({ status: 'success', data: supercategory });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to duplicate supercategory' });
    }
  });
});

app.put(`/supercategory/:id`, authenticate, (req, res) => {
  SUPERCATEGORY.update(req.params.id, req.body, { new: true }, (err, supercategory) => {
    if (!err && supercategory) {
      res.status(200).send({ status: 'success', data: supercategory });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to update supercategory' });
    }
  });
});

app.post(`/supercategory`, authenticate, (req, res) => {
  SUPERCATEGORY.add(req.body, (err, supercategory) => {
    if (!err && supercategory) {
      res.status(200).send({ status: 'success', data: supercategory });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to add supercategory' });
    }
  });
});

app.delete(`/supercategory/:id`, authenticate, (req, res) => {
  SUPERCATEGORY.delete(req.params.id, (err, result) => {
    if (!err && result) {
      if(result.ok && result.deletedCount == 1) {
        res.status(200).send({ status: 'success', data: null });
      } else {
        res.status(200).send({ status: 'error', message: `Cannot find supercategory with _id ${req.params.id}` });
      }
    } else {
      res.status(200).send({ status: 'error', message: `Failed to delete supercategory with _id ${req.params.id}` });
    }
  });
});

// Category Calls
app.get(`/category`, authenticate, (req, res) => {
  CATEGORY.getAll((err, supercategory) => {
    if (!err && supercategory) {
      res.status(200).send({ status: 'success', data: supercategory });
    } else {
      res.status(200).send({ status: 'error', message: 'No supercategory was found' });
    }
  });
});

app.get(`/category/:id`, authenticate, (req, res) => {
  CATEGORY.get(req.params.id, (err, supercategory) => {
    if (!err && supercategory) {
      res.status(200).send({ status: 'success', data: supercategory });
    } else {
      res.status(200).send({ status: 'error', message: 'No supercategory was found' });
    }
  });
});

app.get(`/category/:id/duplicate`, authenticate, (req, res) => {
  CATEGORY.duplicate(req.params.id, (err, category) => {
    if (!err && category) {
      res.status(200).send({ status: 'success', data: category });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to duplicate category' });
    }
  });
});

app.put(`/category/:id`, authenticate, (req, res) => {
  CATEGORY.update(req.params.id, req.body, { new: true }, (err, category) => {
    if (!err && category) {
      res.status(200).send({ status: 'success', data: category });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to update category' });
    }
  });
});

app.post(`/category`, authenticate, (req, res) => {
  CATEGORY.add(req.body, (err, category) => {
    if (!err && category) {
      res.status(200).send({ status: 'success', data: category });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to add category' });
    }
  });
});

app.delete(`/category/:id`, authenticate, (req, res) => {
  CATEGORY.delete(req.params.id, (err, result) => {
    if (!err && result) {
      if(result.ok && result.deletedCount == 1) {
        res.status(200).send({ status: 'success', data: null });
      } else {
        res.status(200).send({ status: 'error', message: `Cannot find category with _id ${req.params.id}` });
      }
    } else {
      res.status(200).send({ status: 'error', message: `Failed to category game with _id ${req.params.id}` });
    }
  });
});

// Product Calls
app.get(`/product`, authenticate, (req, res) => {
  PRODUCT.getAll((err, product) => {
    if (!err && product) {
      res.status(200).send({ status: 'success', data: product });
    } else {
      res.status(200).send({ status: 'error', message: 'No product was found' });
    }
  });
});

app.get(`/product/:id`, authenticate, (req, res) => {
  PRODUCT.get(req.params.id, (err, product) => {
    if (!err && product) {
      res.status(200).send({ status: 'success', data: product });
    } else {
      res.status(200).send({ status: 'error', message: 'No product was found' });
    }
  });
});

app.get(`/product/:id/duplicate`, authenticate, (req, res) => {
  PRODUCT.duplicate(req.params.id, (err, product) => {
    if (!err && product) {
      res.status(200).send({ status: 'success', data: product });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to duplicate product' });
    }
  });
});

app.put(`/product/:id`, authenticate, (req, res) => {
  PRODUCT.update(req.params.id, req.body, { new: true }, (err, product) => {
    if (!err && product) {
      res.status(200).send({ status: 'success', data: product });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to update product' });
    }
  });
});

app.post(`/product`, authenticate, (req, res) => {
  PRODUCT.add(req.body, (err, product) => {
    if (!err && product) {
      res.status(200).send({ status: 'success', data: product });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to add product' });
    }
  });
});

app.delete(`/product/:id`, authenticate, (req, res) => {
  PRODUCT.delete(req.params.id, (err, result) => {
    if (!err && result) {
      if(result.ok && result.deletedCount == 1) {
        res.status(200).send({ status: 'success', data: null });
      } else {
        res.status(200).send({ status: 'error', message: `Cannot find product with _id ${req.params.id}` });
      }
    } else {
      res.status(200).send({ status: 'error', message: `Failed to delete product with _id ${req.params.id}` });
    }
  });
});

// Item Calls
app.get(`/item`, authenticate, (req, res) => {
  ITEM.getAll((err, item) => {
    if (!err && item) {
      res.status(200).send({ status: 'success', data: item });
    } else {
      res.status(200).send({ status: 'error', message: 'No item was found' });
    }
  });
});

app.get(`/item/:id`, authenticate, (req, res) => {
  ITEM.get(req.params.id, (err, item) => {
    if (!err && item) {
      res.status(200).send({ status: 'success', data: item });
    } else {
      res.status(200).send({ status: 'error', message: 'No item was found' });
    }
  });
});

app.get(`/item/:id/duplicate`, authenticate, (req, res) => {
  ITEM.duplicate(req.params.id, (err, item) => {
    if (!err && item) {
      res.status(200).send({ status: 'success', data: item });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to duplicate item' });
    }
  });
});

app.put(`/item/:id`, authenticate, (req, res) => {
  ITEM.update(req.params.id, req.body, { new: true }, (err, item) => {
    if (!err && item) {
      res.status(200).send({ status: 'success', data: item });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to update item' });
    }
  });
});

app.post(`/item`, authenticate, (req, res) => {
  ITEM.add(req.body, (err, item) => {
    if (!err && item) {
      res.status(200).send({ status: 'success', data: item });
    } else {
      res.status(200).send({ status: 'error', message: 'Failed to add item' });
    }
  });
});

app.delete(`/item/:id`, authenticate, (req, res) => {
  ITEM.delete(req.params.id, (err, result) => {
    if (!err && result) {
      if(result.ok && result.deletedCount == 1) {
        res.status(200).send({ status: 'success', data: null });
      } else {
        res.status(200).send({ status: 'error', message: `Cannot find item with _id ${req.params.id}` });
      }
    } else {
      res.status(200).send({ status: 'error', message: `Failed to delete item with _id ${req.params.id}` });
    }
  });
});

// Unauthorize Call
app.post(`/register`, (req, res) => {
  const data = req.body;
  if (data && data.username && data.email && data.password) {
    const username = data.username.trim().toLowerCase();
    const email = data.email.trim().toLowerCase();
    const password = bcrypt.hashSync(data.password, saltRounds);

    USER.add({ username, email, password }, (err, user) => {
      if (!err && user) {
        const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 86400000, // expires in 1 day
        });
        res.cookie('authToken', authToken, {
          maxAge: 86400000,
          httpOnly: true,
          secure: production,
        });
        res.status(200).send({
          status: 'success',
          data: {
            email: user.email,
            username: user.username,
            rank: user.rank,
          },
        });
      } else {
        res.status(200).send({ status: 'error', message: 'Failed to add user' });
      }
    });
  } else {
    res.status(200).send({ status: 'error', message: 'You provided wrong data' });
  }
});

app.post(`/login`, (req, res) => {
  const data = req.body;
  if (data && data.usernameOrEmail && data.password) {
    const usernameOrEmail = data.usernameOrEmail;
    const password = data.password;

    USER.getByEmailUsernamePassword(usernameOrEmail, async (err, user) => {
      if (!err && user) {
        const cmp = await bcrypt.compare(password, user.password);
        if (cmp) {
          const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '86400000', // expires in 24 hours
          });
          res.cookie('authToken', authToken, {
            maxAge: 86400000,
            httpOnly: true,
            secure: production,
          });
          res.status(200).send({
            status: 'success',
            data: {
              email: user.email,
              username: user.username,
              rank: user.rank,
            },
          });
        } else {
          res.status(200).send({ status: 'error', message: 'login-messages.error' });
        }
      } else {
        res.status(200).send({ status: 'error', message: 'login-messages.error' });
      }
    });
  } else {
    res.status(200).send({ status: 'error', message: 'You provided wrong data' });
  }
});

app.get(`/logout`, (req, res) => {
  res.clearCookie(`authToken`);
  res.status(200).send({ status: 'success', message: 'Logout successful' });
});

app.get(`/search/:gameKey`, (req, res) => {
  const data = req.query;
  if (data && data.search && data.lang) {
    GAME.getByKey(req.params.gameKey, (err, game) => {
      if (!err && game) {
        PRODUCT.search(
          data.search,
          data.lang,
          game._id,
          (err, products) => {
            if (!err && products) {
              const categoryIds = [];
              products.forEach((product) => {
                if (categoryIds.indexOf(product.categoryId) == -1) {
                  categoryIds.push(product.categoryId);
                }
              });
              CATEGORY.getByIds(categoryIds, (err, categories) => {
                if (!err && categories) {
                  res.status(200).send({ status: 'success', data: { game, products, categories } });
                } else {
                  res.status(200).send({ status: 'error', message: 'No categories were found' });
                }
              });
            } else {
              res.status(200).send({ status: 'error', message: 'No game was found' });
            }
          },
          100
        );
      } else {
        res.status(200).send({ status: 'error', message: 'No game was found' });
      }
    });
  } else {
    res.status(200).send({ status: 'error', message: 'You provided wrong data' });
  }
});

app.get(`/games`, (req, res) => {
  GAME.getAll((err, games) => {
    if (!err && games) {
      res.status(200).send({ status: 'success', data: games });
    } else {
      res.status(200).send({ status: 'error', message: 'No game was found' });
    }
  });
});

app.get(`/supercategories/:gameKey`, (req, res) => {
  GAME.getByKey(req.params.gameKey, (err, game) => {
    if (!err && game) {
      SUPERCATEGORY.getByGameIdWithCategories(game._id, (err, supercategories) => {
        if (!err && supercategories) {
          res.status(200).send({ status: 'success', data: { supercategories, game } });
        } else {
          res.status(200).send({ status: 'error', message: 'No supercategory were' });
        }
      });
    } else {
      res.status(200).send({ status: 'error', message: 'No game was found' });
    }
  });
});

app.get(`/category-products/:categoryKey`, (req, res) => {
  CATEGORY.getByKey(req.params.categoryKey, (err, category) => {
    if (!err && category) {
      PRODUCT.getByCategoryId(category._id, (err, products) => {
        if (!err && products) {
          res.status(200).send({ status: 'success', data: { products, category } });
        } else {
          res.status(200).send({ status: 'error', message: 'No products were found' });
        }
      });
    } else {
      res.status(200).send({ status: 'error', message: 'No category was found' });
    }
  });
});

app.get(`/product-items/:productKey`, (req, res) => {
  PRODUCT.getByKey(req.params.productKey, (err, product) => {
    if (!err && product) {
      ITEM.getByProductId(product._id, (err, items) => {
        if (!err && items) {
          PURCHASE.getByProductId(product._id, (err, purchases) => {
            if (!err && purchases) {
              res.status(200).send({ status: 'success', data: { items, product, purchases } });
            } else {
              res.status(200).send({ status: 'error', message: 'No purchases were found' });
            }
          });
        } else {
          res.status(200).send({ status: 'error', message: 'No items were found' });
        }
      });
    } else {
      res.status(200).send({ status: 'error', message: 'No product was found' });
    }
  });
});

/**********************
 * Init server & connect to db
 **********************/

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

if (production) {
  mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}:${process.env.DB_PORT}/${process.env.DB_TABLE}?authSource=admin`
  );
} else {
  mongoose.connect(
    `mongodb://${process.env.DB_DOMAIN}:${process.env.DB_PORT}/${process.env.DB_TABLE}`
  );
}

app.listen(port, () => {
  console.log(`Server (Production Mode: ${production}) is running on port ${port}...`);
});

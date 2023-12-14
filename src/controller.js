const bcrypt = require("bcrypt");
const axios = require("axios");
const pool = require("../db");
const queries = require("./queries");
const functions = require("./functions");

const getAccountCards = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decode = await functions.verifyJWT(token);
    const account_id = decode.account_id;
    const card_name = req.query.name ? req.query.name : null;
    if (card_name != null) {
      pool.query(
        queries.getAccountCardsName,
        [account_id, card_name],
        (error, results) => {
          if (error) throw error;
          if (results.rowCount == 0)
            res.status(400).json({ result: `Card: ${card_name} not found!` });
          else res.status(200).json(results.rows[0]);
        }
      );
    } else {
      pool.query(queries.getAccountCards, [account_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
      });
    }
  } catch (error) {
    res.status(406).json({ result: "Unauthorized" });
  }
};

const addAccountCards = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decode = await functions.verifyJWT(token);
    const account_id = decode.account_id;
    const scry_id = req.body.scry_id;
    const card_name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const image_uris = req.body.image_uris;

    if (price == null) {
      res.status(400).json({
        result: `Card ID: ${scry_id} has no price associated with it.`,
      });
      return;
    }

    pool.query(
      queries.getAccountCardsId,
      [account_id, scry_id],
      (error, results) => {
        if (error) throw error;
        switch (results.rowCount) {
          default:
            let qty = results.rows[0].quantity;
            qty = parseInt(qty, 10) + 1;
            pool.query(
              queries.updateAccountCardsQuantity,
              [qty, account_id, scry_id],
              (error) => {
                if (error) throw error;
                pool.query(
                  queries.getAccountCardsId,
                  [account_id, scry_id],
                  (error, results) => {
                    if (error) throw error;
                    if (results.rowCount == 0)
                      res
                        .status(400)
                        .json({ result: `Card ID: ${scry_id} not found!` });
                    else res.status(200).json(results.rows);
                  }
                );
              }
            );
            break;
          case 0:
            pool.query(
              queries.addAccountCards,
              [account_id, scry_id, card_name, price, quantity, image_uris],
              (error) => {
                if (error) throw error;
                pool.query(
                  queries.getAccountCardsId,
                  [account_id, scry_id],
                  (error, results) => {
                    if (error) throw error;
                    if (results.rowCount == 0)
                      res
                        .status(400)
                        .json({ result: `Card ID: ${scry_id} not found!` });
                    else res.status(201).json(results.rows);
                  }
                );
              }
            );
            break;
        }
      }
    );
  } catch (error) {
    res.status(406).json({ result: "Unauthorized" });
  }
};

const removeAccountCards = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decode = await functions.verifyJWT(token);
    const account_id = decode.account_id;
    const scry_id = req.params.scry;

    pool.query(
      queries.getAccountCardsId,
      [account_id, scry_id],
      (error, results) => {
        if (error) throw error;
        if (results.rowCount == 0)
          res.status(400).json({ result: `Card ID: ${scry_id} not found!` });
        else {
          pool.query(
            queries.removeAccountCards,
            [account_id, scry_id],
            (error) => {
              if (error) throw error;
              res.status(202).json({ result: "Card removed successfully!" });
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(406).json({ result: "Unauthorized" });
  }
};

const updateAccountCards = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decode = await functions.verifyJWT(token);
    const account_id = decode.account_id;
    const scry_id = req.params.scry;
    const card_name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const image_uris = req.body.image_uris;

    pool.query(
      queries.getAccountCardsId,
      [account_id, scry_id],
      (error, results) => {
        if (error) throw error;
        if (results.rowCount == 0)
          res.status(400).json({ result: `Card ID: ${scry_id} not found!` });
        else {
          pool.query(
            queries.updateAccountCards,
            [account_id, scry_id, card_name, price, quantity, image_uris],
            (error) => {
              if (error) throw error;
              pool.query(
                queries.getAccountCardsId,
                [account_id, scry_id],
                (error, results) => {
                  if (error) throw error;
                  if (results.rowCount == 0)
                    res
                      .status(400)
                      .json({ result: `Card ID: ${scry_id} not found!` });
                  else res.status(200).json(results.rows);
                }
              );
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(406).json({ result: "Unauthorized" });
  }
};

const patchAccountCards = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decode = await functions.verifyJWT(token);
    const account_id = decode.account_id;
    const scry_id = req.params.scry;
    const card_name = req.body.card_name ? req.body.card_name : null;
    const price = req.body.price ? req.body.price : null;
    const quantity = req.body.quantity ? req.body.quantity : null;
    const image_uris = req.body.image_uris ? req.body.image_uris : null

    pool.query(
      queries.getAccountCardsId,
      [account_id, scry_id],
      (error, results) => {
        if (error) throw error;
        if (results.rowCount == 0)
          res.status(400).json({ result: `Card ID: ${scry_id} not found!` });
        else {
          pool.query(
            queries.patchAccountCards,
            [account_id, scry_id, card_name, price, quantity, image_uris],
            (error) => {
              if (error) throw error;
              pool.query(
                queries.getAccountCardsId,
                [account_id, scry_id],
                (error, results) => {
                  if (error) throw error;
                  if (results.rowCount == 0)
                    res
                      .status(400)
                      .json({ result: `Card ID: ${scry_id} not found!` });
                  else res.status(200).json(results.rows);
                }
              );
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(406).json({ result: "Unauthorized" });
  }
};

const updateAccountCardsPrices = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decode = await functions.verifyJWT(token);
    const account_id = decode.account_id;

    pool.query(
      queries.getAccountCards,
      [account_id],
      async (error, results) => {
        if (error) throw error;

        for (let res of results.rows) {
          const scryData = await axios
            .get(`https://api.scryfall.com/cards/${res.scry_id}`)
            .then((response) => response.data);

          pool.query(
            queries.patchAccountCards,
            [decode.account_id, res.scry_id, null, scryData.prices.usd, null, null],
            (error) => {
              if (error) throw error;
            }
          );
        }

        pool.query(
          queries.getAccountCards,
          [account_id],
          async (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
          }
        );
      }
    );
  } catch (error) {
    res.status(406).json({ result: "Unauthorized" });
  }
};

const accountLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  pool.query(queries.checkAccountExist, [username], (error, results) => {
    if (error) throw error;
    if (results.rowCount == 0) {
      res.status(400).json({ result: `Account not found!` });
      return;
    }

    pool.query(queries.checkPassword, [username], async (error, results) => {
      if (error) throw error;
      if (results.rowCount == 0) {
        res.status(400).json({ result: `Account not found!` });
        return;
      }

      let valid = await bcrypt.compare(password, results.rows[0].password);
      if (valid) {
        pool.query(queries.getAccount, [username], (error, results) => {
          if (error) throw error;
          const tokens = functions.generateJWT(results.rows[0]);
          const message = {
            token: tokens.token,
            refreshToken: tokens.refreshToken,
          };
          res.status(200).json(message);
        });
      } else {
        res.status(400).json({ result: `Account not found!` });
      }
    });
  });
};

const createAccount = async (req, res) => {
  const username = req.body.username;
  let password = req.body.password;
  const first_name = req.body.firstName;
  const last_name = req.body.lastName;

  password = await functions.generatePassword(password);

  pool.query(queries.checkAccountExist, [username], (error, results) => {
    if (error) throw error;
    if (results.rowCount != 0)
      res.status(400).json({ result: "Invalid account name." });
    else {
      pool.query(
        queries.createAccount,
        [first_name, last_name, username, password],
        (error) => {
          if (error) throw error;
          res.status(202).json({ result: "Account created successfully!" });
        }
      );
    }
  });
};

const deleteAccount = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decode = await functions.verifyJWT(token);
    const account_id = decode.account_id;

    pool.query(queries.deleteAllAccountCards, [account_id], (error) => {
      if (error) throw error;
      pool.query(queries.deleteAccount, [account_id], (error, results) => {
        if (error) throw error;
        if (results.rowCount == 0)
          res.status(400).json({ result: `Account not found!` });
        else res.status(200).json({ result: `Account deleted!` });
      });
    });
  } catch (error) {
    res.status(406).json({ result: "Unauthorized" });
  }
};

const getAccountById = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decode = await functions.verifyJWT(token);
    const account_id = decode.account_id;

    pool.query(queries.getAccountById, [account_id], (error, results) => {
      if (error) throw error;
      if (results.rowCount == 0) {
        res.status(400).json({ result: `Account not found!` });
      } else
        res.status(200).json({
          username: results.rows[0].username,
          firstName: results.rows[0].first_name,
          lastName: results.rows[0].last_name,
        });
    });
  } catch (error) {
    res.status(406).json({ result: "Unauthorized" });
  }
};

const refreshToken = async (req, res) => {
  if (req.body.refreshToken) {
    const refreshToken = req.body.refreshToken;
    let decode = await functions.verifyRefreshJWT(refreshToken);
    if (decode) {
      const tokens = functions.generateJWT(decode);
      const message = {
        token: tokens.token,
        refreshToken: tokens.refreshToken,
      };
      res.status(200).json(message);
    } else {
      return res.status(406).json({ result: "Unauthorized" });
    }
  } else {
    return res.status(406).json({ result: "Unauthorized" });
  }
};

module.exports = {
  getAccountCards,
  addAccountCards,
  removeAccountCards,
  updateAccountCards,
  patchAccountCards,
  updateAccountCardsPrices,
  accountLogin,
  createAccount,
  deleteAccount,
  getAccountById,
  refreshToken,
};

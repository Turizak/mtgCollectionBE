const bcrypt = require("bcrypt");
const pool = require("../db");
const queries = require("./queries");
const functions = require("./functions");

const getAccountCards = (req, res) => {
  const account_id = req.params.id;
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
};

const addAccountCards = (req, res) => {
  const account_id = req.params.id;
  const scry_id = req.body.scry_id;
  const card_name = req.body.name;
  const price = req.body.usd;
  const quantity = req.body.quantity;

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
            [account_id, scry_id, card_name, price, quantity],
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
};

const removeAccountCards = (req, res) => {
  const account_id = req.params.id;
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
};

const updateAccountCards = (req, res) => {
  const account_id = req.params.id;
  const scry_id = req.params.scry;
  const card_name = req.body.name;
  const price = req.body.usd;
  const quantity = req.body.quantity;

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
          [account_id, scry_id, card_name, price, quantity],
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
};

const patchAccountCards = (req, res) => {
  const account_id = req.params.id;
  const scry_id = req.params.scry;
  const card_name = req.body.card_name ? req.body.card_name : null;
  const price = req.body.price ? req.body.price : null;
  const quantity = req.body.quantity ? req.body.quantity : null;

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
          [account_id, scry_id, card_name, price, quantity],
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
};

const updateAccountCardsPrices = async (req, res) => {
  const account_id = req.params.id;
  let message = await functions.updateAllPrices(account_id);
  res.status(200).json(message);
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
          res.status(200).json(results.rows[0]);
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
          res.status(202).json({ result: "Card removed successfully!" });
        }
      );
    }
  });
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
};

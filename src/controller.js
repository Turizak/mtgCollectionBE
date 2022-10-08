const pool = require("../db");
const queries = require("./queries");
const functions = require("./functions");

const getCards = (req, res) => {
  pool.query(queries.getCards, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const findCardByName = (req, res) => {
  const name = req.params.name;

  pool.query(queries.findCard, [name], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addCard = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const usd = req.body.usd;
  const qty = req.body.quantity;

  pool.query(queries.findCardId, [id], (error, results) => {
    if (error) throw error;

    if (results.rowCount != 0) {
      let quantity = results.rows[0].quantity;
      quantity = parseInt(quantity, 10) + 1;

      pool.query(queries.updateCardQuantity, [quantity, id], (error) => {
        if (error) throw error;
        pool.query(queries.findCardId, [id], (error, results) => {
          if (error) throw error;
          if (results.rowCount == 0) {
            res.status(400).send(`Card ID: ${id} not found!`);
          } else {
            res.status(200).send(results.rows);
          }
        });
      });
    } else {
      pool.query(queries.addCard, [id, name, usd, qty], (error) => {
        if (error) throw error;
        pool.query(queries.findCardId, [id], (error, results) => {
          if (error) throw error;
          if (results.rowCount == 0) {
            res.status(400).send(`Card ID: ${id} not found!`);
          } else {
            res.status(201).send(results.rows);
          }
        });
      });
    }
  });
};

const removeCard = (req, res) => {
  const id = req.params.id;

  pool.query(queries.findCardId, [id], (error, results) => {
    if (error) throw error;
    if (results.rowCount == 0)
      res.status(400).send(`Card ID: ${id} not found!`);
    else {
      pool.query(queries.removeCard, [id], (error) => {
        if (error) throw error;
        res.status(202).send("Card removed successfully!");
      });
    }
  });
};

const updateCard = (req, res) => {
  const name = req.body.name;
  const usd = req.body.usd;
  const id = req.body.id;
  const quantity = req.body.quantity;

  pool.query(queries.findCardId, [id], (error, results) => {
    if (error) throw error;
    if (results.rowCount == 0)
      res.status(400).send(`Card ID: ${id} not found!`);
    else {
      pool.query(queries.updateCard, [name, usd, quantity, id], (error) => {
        if (error) throw error;
        pool.query(queries.findCardId, [id], (error, results) => {
          if (error) throw error;
          if (results.rowCount == 0) {
            res.status(400).send(`Card ID: ${id} not found!`);
          } else {
            res.status(200).json(results.rows);
          }
        });
      });
    }
  });
};

const patchCard = (req, res) => {
  const id = req.params.id;
  const name = req.body.name ? req.body.name : null;
  const usd = req.body.usd ? req.body.usd : null;
  const quantity = req.body.quantity ? req.body.quantity : null;

  pool.query(queries.findCardId, [id], (error, results) => {
    if (error) throw error;
    if (results.rowCount == 0)
      res.status(400).send(`Card ID: ${id} not found!`);
    else {
      pool.query(queries.patchCard, [name, usd, quantity, id], (error) => {
        if (error) throw error;
        pool.query(queries.findCardId, [id], (error, results) => {
          if (error) throw error;
          if (results.rowCount == 0) {
            res.status(400).send(`Card ID: ${id} not found!`);
          } else {
            res.status(200).json(results.rows);
          }
        });
      });
    }
  });
};

const updatePrices = async (req, res) => {
  let message = await functions.updateAllPrices();
  res.status(200).json(message);
};

module.exports = {
  getCards,
  findCardByName,
  addCard,
  removeCard,
  updateCard,
  patchCard,
  updatePrices,
};

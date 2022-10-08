const getCards = "SELECT * FROM card";
const findCard = "SELECT * FROM card WHERE name = $1";
const findCardId = "SELECT * FROM card WHERE id = $1";
const addCard =  "INSERT INTO card (id, name, usd, quantity) VALUES ($1, $2, $3, $4)";
const removeCard = "DELETE FROM card WHERE id = $1";
const updateCard = "UPDATE card SET name = $1, usd = $2, quantity= $3 WHERE id = $4";
const updateCardQuantity = "UPDATE card SET quantity = $1 WHERE id = $2"
const patchCard = "UPDATE card SET name = COALESCE($1, name),"+
    " usd = COALESCE($2, usd), quantity = COALESCE($3, quantity)" +
    " WHERE id = $4"

module.exports = {
    getCards, 
    findCard,
    findCardId,
    addCard,
    removeCard,
    updateCard,
    updateCardQuantity,
    patchCard
};
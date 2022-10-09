const getAccount = "SELECT account_id FROM account WHERE username = $1"
const checkAccountExist = "SELECT * FROM account WHERE username = $1";
const checkPassword = "SELECT password FROM account WHERE username = $1";
const createAccount =  "INSERT INTO account (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)";
const getAccountCards = "SELECT * FROM cards where account_id = $1";
const getAccountCardsName = "SELECT * FROM cards WHERE account_id = $1 AND card_name = $2";
const addAccountCards =  "INSERT INTO cards (account_id, scry_id, card_name, price, quantity) VALUES ($1, $2, $3, $4, $5)";
const updateAccountCardsQuantity = "UPDATE cards SET quantity = $1 WHERE account_id = $2 AND scry_id = $3"
const getAccountCardsId = "SELECT * FROM cards WHERE account_id = $1 AND scry_id = $2";
const removeAccountCards = "DELETE FROM cards WHERE account_id = $1 AND scry_id = $2";
const updateAccountCards = "UPDATE cards SET card_name = $3, price = $4, quantity= $5 WHERE account_id = $1 and scry_id = $2";
const patchAccountCards = "UPDATE cards SET card_name = COALESCE($3, card_name),"+
    " price = COALESCE($4, price), quantity = COALESCE($5, quantity)" +
    " WHERE account_id = $1 AND scry_id = $2"

module.exports = {
    getAccountCards, 
    getAccountCardsName,
    getAccountCardsId,
    addAccountCards,
    removeAccountCards,
    updateAccountCards,
    updateAccountCardsQuantity,
    patchAccountCards,
    getAccount,
    checkAccountExist,
    createAccount,
    checkPassword
};
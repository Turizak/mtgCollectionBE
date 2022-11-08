const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/account/cards", controller.getAccountCards);
router.post("/account/cards", controller.addAccountCards);
router.delete("/account/cards/:scry", controller.removeAccountCards);
router.put("/account/cards/:scry", controller.updateAccountCards);
router.patch("/account/cards/:scry", controller.patchAccountCards);
router.get("/account/prices", controller.updateAccountCardsPrices)
router.post("/login", controller.accountLogin);
router.post("/account/create", controller.createAccount);
router.delete("/account/delete", controller.deleteAccount);

module.exports = router;

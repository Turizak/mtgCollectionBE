const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/account/:id/cards", controller.getAccountCards);
router.post("/account/:id/cards", controller.addAccountCards);
router.delete("/account/:id/cards/:scry", controller.removeAccountCards);
router.put("/account/:id/cards/:scry", controller.updateAccountCards);
router.patch("/account/:id/cards/:scry", controller.patchAccountCards);
router.get("/account/:id/prices", controller.updateAccountCardsPrices)
router.post("/login", controller.accountLogin);
router.post("/account/create", controller.createAccount);

module.exports = router;

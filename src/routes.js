const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/cards", controller.getCards);
router.post("/cards", controller.addCard);
router.get("/cards/:name", controller.findCardByName);
router.put("/cards/", controller.updateCard);
router.delete("/cards/:id", controller.removeCard);
router.patch("/cards/:id", controller.patchCard);
router.get("/prices", controller.updatePrices)

module.exports = router;

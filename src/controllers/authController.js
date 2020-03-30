const Router = require("koa-router");
const User = require("../models/user");
const koaBody = require("koa-body");

const router = new Router();

router.post("/register", koaBody(), async ({ req, res }) => {
  try {
    const user = await User.create(req.body);
    return res.send(user);
  } catch (e) {
    return res.status(400).send({ error: "Registration falid" });
  }
});

module.exports = app => app.use("/auth", router);

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const User = require("./models/user");
const koaBody = require("koa-body");
const bcrypt = require("bcryptjs");

const router = new Router();
const app = new Koa();

router.post("/register", koaBody(), async ctx => {
  const { email } = ctx.request.body;

  if (await User.findOne({ email })) {
    ctx.throw(400, "This user already exists");
    return;
  }

  try {
    ctx.request.body.password = await bcrypt.hash(
      ctx.request.body.password,
      10
    );

    const user = await User.create(ctx.request.body);

    await user.save();

    user.password = undefined;

    ctx.body = user;
  } catch (e) {
    ctx.throw(400, "Create user falid");
  }
});

router.post("/login", koaBody(), async ctx => {
  const { email, password } = await ctx.request.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    ctx.throw(400, "User not found");
  }

  var match = await bcrypt.compareSync(password, user.password);
  if (!match) {
    ctx.throw(400, "Invalid password");
  }

  ctx.body = user;
});

app
  .use(router.allowedMethods())
  .use(router.routes())
  .use(koaBody())
  .use(bodyParser());

app.listen(5000);

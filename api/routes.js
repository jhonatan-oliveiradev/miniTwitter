import Router from "@koa/router";

export const router = new Router();

const tweets = [];

router.get("/tweets", (ctx) => {
  ctx.body = ctx.query
    ? tweets.filter((tweet) => tweet.username === ctx.request.query.username)
    : tweets;
});

router.post("/tweets", (ctx) => {
  const tweet = {
    ...ctx.request.body,
    id: tweets.length + 1,
  };
  ctx.body = {};
});

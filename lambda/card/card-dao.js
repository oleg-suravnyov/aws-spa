const { Pool } = require("pg");

module.exports = {
  state: {
    pool: undefined,
    ready: false,
  },
  init: function () {
    if (this.state.ready) {
      return;
    }
    this.state.pool = new Pool({
      host: "<to be replaced with db url>",
      user: "<to be replaced with db admin>",
      database: "spa",
      password: "<to be replaced with db admin password>",
      port: 5432,
    });
    this.state.ready = true;
  },
  readAll: async function () {
    let client = undefined;
    try {
      client = await this.state.pool.connect();

      const result = await client.query("SELECT * FROM public.CARD");
      console.log(
        "[CardDAO.readAll]",
        "result.rows.length",
        result.rows.length
      );

      return result.rows;
    } catch (e) {
      console.log("[CardDAO.readAll]", e);
    } finally {
      if (client) {
        await client.release();
      }
    }
    return undefined;
  },
  create: async function (cardObj) {
    console.log("[CardDAO.create]", cardObj);

    let client = undefined;
    try {
      client = await this.state.pool.connect();

      const result = await client.query(
        "INSERT INTO public.CARD(title, created, content) VALUES($1, $2, $3)",
        [cardObj.title, cardObj.created, cardObj.content]
      );

      return true;
    } catch (e) {
      console.log("[CardDAO.create", e);
    } finally {
      if (client) {
        await client.release();
      }
    }
    return false;
  },
};

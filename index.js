require("dotenv").config({});
const fastify = require("fastify")({ logger: true });
const { dev, prod } = require("./config");

fastify.get("/dev", async () => ({
  code: 0,
  data: { baseUrl: dev },
}));

fastify.get("/prod", () => ({
  code: 0,
  data: { baseUrl: prod },
}));

fastify.get("/", () => ({
  code: 0,
  data: { baseUrl: prod },
}));

const start = async () => {
  try {
    const port = +isNaN(process.env.PORT) ? 80 : +process.env.PORT;
    await fastify.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

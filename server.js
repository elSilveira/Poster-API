const SessionRoutes = require('./routes/session.routes');
const UserRoutes = require('./controllers/user/user.routes');
const fastify = require('fastify')({ logger: true });

fastify.register(require("fastify-cors"), {
  origin: true
});

async function addRoutes() {
  SessionRoutes.routes.forEach(route => fastify.route(route));
  UserRoutes.routes.forEach(route => fastify.route(route));
}

addRoutes()

// Declare a route
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

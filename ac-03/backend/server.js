require('dotenv').config();
const Hapi = require('@hapi/hapi');

const LeadsService = require('./services/LeadsService');
const leadsPlugin = require('./api/leads');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5001,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'], // agar bisa diakses dari React
      },
    },
  });

  const leadsService = new LeadsService();

  await server.register([
    {
      plugin: leadsPlugin,
      options: {
        service: leadsService,
      },
    },
  ]);

  await server.start();
  console.log(`✅ Hapi server running at: ${server.info.uri}`);
};

init();

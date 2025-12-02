const routes = (handler) => [
  {
    method: 'GET',
    path: '/leads',
    handler: handler.getLeadsHandler,
  },
  {
    method: 'GET',
    path: '/leads/{id}',
    handler: handler.getLeadByIdHandler,
  },
  {
    method: 'GET',
    path: '/leads-stats',
    handler: handler.getLeadsStatsHandler,
  },
];

module.exports = routes;

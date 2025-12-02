class LeadsHandler {
  constructor(service) {
    this._service = service;

    this.getLeadsHandler = this.getLeadsHandler.bind(this);
    this.getLeadByIdHandler = this.getLeadByIdHandler.bind(this);
    this.getLeadsStatsHandler = this.getLeadsStatsHandler.bind(this);
  }

  async getLeadsHandler(request, h) {
    const { minProbability, job } = request.query;

    const leads = await this._service.getLeads({
      minProbability:
        minProbability !== undefined ? Number(minProbability) : undefined,
      job,
    });

    return {
      status: 'success',
      data: leads,
    };
  }

  async getLeadByIdHandler(request, h) {
    const { id } = request.params;
    const lead = await this._service.getLeadById(id);

    if (!lead) {
      return h
        .response({
          status: 'fail',
          message: 'Nasabah tidak ditemukan',
        })
        .code(404);
    }

    return {
      status: 'success',
      data: lead,
    };
  }

  async getLeadsStatsHandler(request, h) {
    const stats = await this._service.getStats();
    return {
      status: 'success',
      data: stats,
    };
  }
}

module.exports = LeadsHandler;

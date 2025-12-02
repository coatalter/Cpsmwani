const { Pool } = require('pg');

class LeadsService {
  constructor() {
    this._pool = new Pool(); // baca config dari .env
  }

  // ambil list nasabah + skor, bisa ditambah filter kalau mau
  async getLeads({ minProbability, job } = {}) {
    const params = [];
    const where = [];

    if (minProbability !== undefined) {
      params.push(minProbability);
      where.push(`h.predicted_score >= $${params.length}`);
    }

    if (job && job !== 'All') {
      params.push(job);
      where.push(`n.job = $${params.length}`);
    }

    let query = `
      SELECT
        n.nasabah_id,
        n.age,
        n.job,
        n.marital,
        n.education,
        n.phone,
        n.housing,
        n.loan,
        n.status,
        h.predicted_score AS probability,
        h.model_version,
        h.calculation_date
      FROM nasabah n
      JOIN hasil_perhitungan_probabilitas h
        ON h.nasabah_id = n.nasabah_id
    `;

    if (where.length > 0) {
      query += ` WHERE ${where.join(' AND ')}`;
    }

    query += ` ORDER BY h.predicted_score DESC`;

    const result = await this._pool.query(query, params);
    return result.rows;
  }

  async getLeadById(id) {
    const query = {
      text: `
        SELECT
          n.*,
          h.predicted_score AS probability,
          h.model_version,
          h.calculation_date
        FROM nasabah n
        JOIN hasil_perhitungan_probabilitas h
          ON h.nasabah_id = n.nasabah_id
        WHERE n.nasabah_id = $1
      `,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) return null;
    return result.rows[0];
  }

  async getStats() {
    const total = await this._pool.query(
      'SELECT COUNT(*) AS c FROM nasabah'
    );
    const hot = await this._pool.query(
      `SELECT COUNT(*) AS c
       FROM nasabah n
       JOIN hasil_perhitungan_probabilitas h
         ON h.nasabah_id = n.nasabah_id
       WHERE h.predicted_score >= 0.7`
    );

    return {
      total: Number(total.rows[0].c),
      hot: Number(hot.rows[0].c),
      convRate:
        total.rows[0].c > 0
          ? Math.round((hot.rows[0].c / total.rows[0].c) * 100)
          : 0,
    };
  }
}

module.exports = LeadsService;

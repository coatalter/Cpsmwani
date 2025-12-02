const API_BASE = 'http://localhost:5001';

export async function fetchLeads({ minProbability, job } = {}) {
  const params = new URLSearchParams();
  if (minProbability !== undefined) params.set('minProbability', minProbability);
  if (job && job !== 'All') params.set('job', job);

  const res = await fetch(`${API_BASE}/leads?${params.toString()}`);
  const json = await res.json();
  return json.data;
}

export async function fetchLeadsStats() {
  const res = await fetch(`${API_BASE}/leads-stats`);
  const json = await res.json();
  return json.data;
}

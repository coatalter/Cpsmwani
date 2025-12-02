const KEY = "jmkg_contact_metadata_v1";

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("contactService.readAll parse error", e);
    return {};
  }
}
function writeAll(obj) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch (e) {
    console.error("contactService.writeAll error", e);
  }
}

export function getMetadata(id) {
  const all = readAll();
  return all[id] ? all[id] : { lastContacted: null, subscribed: null, notes: "" };
}

export function getAllMetadata() {
  return readAll();
}

/**
 * Set contact info for a given id.
 * subscribed: true | false | null
 * notes: string
 * lastContacted: optional ISO string; if not provided it will be set to now
 */
export function setContact(id, { subscribed = null, notes = "", lastContacted = null } = {}) {
  const all = readAll();
  const now = lastContacted || new Date().toISOString();
  all[id] = { lastContacted: now, subscribed, notes };
  writeAll(all);
  return all[id];
}

/** Remove metadata for a single id */
export function clearContact(id) {
  const all = readAll();
  if (all[id]) {
    delete all[id];
    writeAll(all);
  }
}

/** Reset all contact metadata (dev only) */
export function resetAll() {
  writeAll({});
}

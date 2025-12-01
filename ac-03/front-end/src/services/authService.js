// Simple auth service using localStorage as storage (prototype only)
// Users shape: { id, email, name, password, role, team }

const USERS_KEY = "jmkg_users";
const SESSION_KEY = "jmkg_session";

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function writeUsers(arr) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}

export function initDefaultAdmin() {
  const users = readUsers();
  const hasAdmin = users.some(u => u.role === "superadmin");
  if (!hasAdmin) {
    const admin = {
      id: Date.now(),
      email: "admin@bank.co.id",
      name: "Super Admin",
      password: "admin123", // NOTE: prototype only. don't use plain text in production
      role: "superadmin",
      team: null
    };
    users.push(admin);
    writeUsers(users);
    // do not auto-login
  }
}

export function getUsers() {
  return readUsers();
}

export function addUser({ email, name, password, role = "sales", team = null }) {
  const users = readUsers();
  if (users.some(u => u.email === email)) {
    throw new Error("Email already exists");
  }
  const user = { id: Date.now(), email, name, password, role, team };
  users.push(user);
  writeUsers(users);
  return user;
}

export function removeUser(id) {
  const users = readUsers().filter(u => u.id !== id);
  writeUsers(users);
  return users;
}

export function authenticate(email, password) {
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return null;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, role: user.role }));
  return user;
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function getCurrentUser() {
  const s = getSession();
  if (!s) return null;
  const users = readUsers();
  return users.find(u => u.id === s.id) || null;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

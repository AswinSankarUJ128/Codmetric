// Hash password (simple for demo; use bcrypt in real apps)
function hash(str) {
  return btoa(str.split('').reverse().join('')); // basic "hash"
}

function showMessage(msg, success = true) {
  const message = document.getElementById('message');
  message.style.color = success ? 'lightgreen' : 'red';
  message.textContent = msg;
  setTimeout(() => (message.textContent = ''), 4000);
}

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password strength
function isStrongPassword(password) {
  return password.length >= 6;
}

// Register
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!isValidEmail(email)) return showMessage("Invalid email format", false);
  if (!isStrongPassword(password)) return showMessage("Password must be at least 6 characters", false);

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (users[email]) return showMessage("User already exists", false);

  users[email] = hash(password);
  localStorage.setItem('users', JSON.stringify(users));
  showMessage("Registration successful ✅");
  this.reset();
});

// Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (!users[email]) return showMessage("User not found", false);
  if (users[email] !== hash(password)) return showMessage("Incorrect password", false);

  showMessage("Login successful ✅");
  this.reset();
});

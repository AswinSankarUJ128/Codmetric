let countdownInterval;

function startCountdown() {
  clearInterval(countdownInterval);
  
  const targetDate = new Date(document.getElementById('datetime').value);
  if (isNaN(targetDate.getTime()) || targetDate <= new Date()) {
    alert("Please select a valid future date and time.");
    return;
  }

  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      updateCountdown(0, 0, 0, 0);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    updateCountdown(days, hours, minutes, seconds);
  }, 1000);
}

function updateCountdown(days, hours, minutes, seconds) {
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function resetCountdown() {
  clearInterval(countdownInterval);
  updateCountdown(0, 0, 0, 0);
  document.getElementById('datetime').value = '';
}

// Modal unlock logic
function openUnlockModal() {
  document.getElementById('unlockModal').style.display = 'flex';
}

document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('userEmail').value.trim();
  const sendToEmail = document.getElementById('sendToEmail').checked;

  // Regex email validation
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validEmail) {
    alert('Please enter a valid email.');
    return;
  }

  // Optional honeypot (hidden input)
  const botTrap = document.getElementById('trap');
  if (botTrap && botTrap.value !== '') {
    console.warn('Bot detected');
    return;
  }

  // Beehiiv form POST
  const formAction = 'https://api.beehiiv.com/v1/publications/your_id/subscribe';
  const formData = new FormData();
  formData.append('email', email);
  formData.append('publication_id', 'your_id');

  try {
    await fetch(formAction, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    // PDF download (optional)
    if (sendToEmail) {
      const element = document.getElementById('burnout-report');
      if (element) {
        const options = {
          margin: 0.5,
          filename: 'BurnoutLabReport.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        html2pdf().set(options).from(element).save();
      }
    }

    // Unblur UI
    document.querySelectorAll('.blurred').forEach(el => el.classList.remove('blurred'));
    document.getElementById('blurOverlay').style.display = 'none';
    document.getElementById('unlockModal').style.display = 'none';
  } catch (err) {
    console.error('Newsletter error', err);
    alert('Something went wrong. Try again later.');
  }
});
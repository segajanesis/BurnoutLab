function openUnlockModal() {
  document.getElementById('unlockModal').style.display = 'flex';
}

document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('userEmail').value.trim();
  const sendToEmail = document.getElementById('sendToEmail').checked;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const botTrap = document.getElementById('trap');

  if (!validEmail || (botTrap && botTrap.value !== '')) {
    alert('Invalid or suspected bot submission.');
    return;
  }

  const formData = new FormData();
  formData.append('email', email);
  formData.append('publication_id', 'your_id');

  await fetch('https://api.beehiiv.com/v1/publications/your_id/subscribe', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  });

  if (sendToEmail) {
    const element = document.getElementById('burnout-report');
    const options = {
      margin: 0.5,
      filename: 'BurnoutLabReport.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  }

  document.querySelectorAll('.blurred').forEach(el => el.classList.remove('blurred'));
  document.getElementById('blurOverlay').style.display = 'none';
  document.getElementById('unlockModal').style.display = 'none';
});

async function generateLabReport() {
  const resume = document.getElementById('resumeTextarea').value;
  if (!resume || resume.length < 100) {
    alert('Please paste a longer resume.');
    return;
  }

  try {
    const response = await fetch('https://burnout-lab-api.onrender.com/lab-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume })
    });

    const data = await response.json();
    document.getElementById('burnout-report').innerHTML = data.html;
  } catch (err) {
    console.error('API Error:', err);
    alert('Failed to fetch lab report.');
  }
}

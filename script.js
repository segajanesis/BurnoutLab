// TEMPORARILY DISABLED: newsletter unlock modal logic
/*
function openUnlockModal() {
  document.getElementById('unlockModal').style.display = 'flex';
}

document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('userEmail').value.trim();
  const downloadPDF = document.getElementById('downloadPDF').checked;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const botTrap = document.getElementById('trap');

  if (!validEmail || (botTrap && botTrap.value !== '')) {
    alert('Invalid or suspected bot submission.');
    return;
  }

  const formData = new FormData();
  formData.append('email', email);
  formData.append('publication_id', 'e5646998-f7ef-44ab-8b37-09c737ddcb01');

  await fetch('https://api.beehiiv.com/v1/publications/e5646998-f7ef-44ab-8b37-09c737ddcb01/subscribe', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  });

  if (downloadPDF) {
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
*/

// ACTIVE: resume analysis
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

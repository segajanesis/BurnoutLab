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

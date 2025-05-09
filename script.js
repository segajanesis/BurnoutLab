async function generateLabReport() {
  const button = document.querySelector('button');
  const textarea = document.getElementById('resumeTextarea');
  const reportContainer = document.getElementById('burnout-report');
  const resume = textarea.value.trim();

  if (!resume || resume.length < 100) {
    alert('Sorry, resume is not long enough to create report.');
    return;
  }

  // Disable the button and show loading state
  button.disabled = true;
  button.textContent = 'analyzing...';

  try {
    const response = await fetch('https://burnout-lab-api.onrender.com/lab-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume })
    });

    const data = await response.json();

    // Assume API returns the report as raw HTML (or update as needed)
    reportContainer.innerHTML = `<pre>${data.report}</pre>`;
  } catch (err) {
    console.error('API Error:', err);
    reportContainer.innerHTML = `<p style="color: red;">Sorry, the lab is currently closed.</p>`;
  } finally {
    button.disabled = false;
    button.textContent = 'analyze my resume';
  }
}

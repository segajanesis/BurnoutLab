/*
 * Demo only: this file intentionally performs no network requests and uses
 * no API keys or third-party services. The production resume-analysis flow
 * has been retired.
 */

function createDemoReport(resumeText) {
  const resume = String(resumeText || '').trim();

  if (!resume) {
    return 'No resume supplied. This is a local demonstration only.';
  }

  return [
    'Demo report (not an actual analysis)',
    '',
    `Characters received locally: ${resume.length}`,
    'In a real application, validated and consented input could be processed by a protected backend.',
    'No resume content was sent anywhere by this demo.'
  ].join('\n');
}

// Safe rendering example: textContent prevents report content from becoming HTML.
function renderDemoReport(container, resumeText) {
  if (!(container instanceof HTMLElement)) return;
  container.textContent = createDemoReport(resumeText);
}

// Example usage (intentionally not executed by the closed page):
// renderDemoReport(document.querySelector('#burnout-report'), 'sample resume text');

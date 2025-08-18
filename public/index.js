document.getElementById('date').value = new Date().toISOString().split('T')[0];

document.getElementById('addEntryBtn').addEventListener('click', function () {
  const form = document.getElementById('addEntryForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
  if (form.style.display === 'block') {
    form.scrollIntoView({ behavior: 'smooth' });
  }
});

// Cancel button
document.getElementById('cancelBtn').addEventListener('click', function () {
  document.getElementById('addEntryForm').style.display = 'none';
});

// Toggle stairs fields based on selection
function toggleStairsFields() {
  const stairsType = document.getElementById('stairsType').value;
  const stairsFields = document.getElementById('stairsFields');
  stairsFields.style.display = stairsType === 'data' ? 'flex' : 'none';
}

// Update track info display when track is selected
function updateTrackInfo() {
  const selectedTrack = document.getElementById('selectedTrack');
  const trackInfoDisplay = document.getElementById('trackInfoDisplay');
  const trackLength = document.getElementById('trackLength');

  if (selectedTrack.value) {
    const selectedOption = selectedTrack.options[selectedTrack.selectedIndex];
    const length = selectedOption.getAttribute('data-length');
    const url = selectedOption.getAttribute('data-url');

    trackLength.innerHTML = `
  <strong>${selectedTrack.value}</strong><br>
    <span style="color: var(--text-secondary);">Length: ${length} km</span><br>
      <a href="${url}" target="_blank" style="color: var(--accent-primary); text-decoration: none;">View Track →</a>
      `;
  } else {
    trackLength.textContent = 'Select a track to see details';
  }
}

// Hide messages after 5 seconds
setTimeout(function () {
  const messages = document.querySelectorAll('.message');
  messages.forEach(function (message) {
    message.style.display = 'none';
  });
}, 5000);

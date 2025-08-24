document.getElementById('date').value = new Date().toISOString().split('T')[0];

function suggestRoutineForDate() {
  const dateInput = document.getElementById('date');
  const routineSelect = document.getElementById('workoutRoutine');

  if (dateInput.value) {
    const selectedDate = new Date(dateInput.value);
    const dayOfWeek = selectedDate.getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const routineId = dayNames[dayOfWeek];

    // Find the matching routine option
    const routineOptions = routineSelect.options;
    for (let i = 0; i < routineOptions.length; i++) {
      const option = routineOptions[i];
      if (option.value === routineId) {
        routineSelect.selectedIndex = i;
        // Trigger HTMX request to load exercise fields
        htmx.trigger(routineSelect, 'change');
        break;
      }
    }
  }
}

// Toggle workout content field based on routine
function toggleWorkoutContent() {
  const workoutRoutine = document.getElementById('workoutRoutine').value;
  const workoutContent = document.getElementById('workoutContent');
  const workoutContentGroup = workoutContent.closest('.form-group');

  // Hide content field for 'rest' routine
  if (workoutRoutine === 'rest') {
    workoutContentGroup.style.display = 'none';
    workoutContent.value = '';
  } else {
    workoutContentGroup.style.display = 'block';
  }
}

// Update form visibility based on structured content toggle
function handleStructuredContentToggle() {
  const useStructured = document.getElementById('useStructuredContent').checked;
  const workoutContent = document.getElementById('workoutContent');
  const workoutContentGroup = workoutContent.closest('.form-group');

  if (useStructured) {
    workoutContentGroup.style.display = 'none';
  } else {
    workoutContentGroup.style.display = 'block';
  }
}

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

document.getElementById('stairsType').addEventListener('change', toggleStairsFields);
document.getElementById('selectedTrack').addEventListener('change', updateTrackInfo);
document.getElementById('date').addEventListener('change', suggestRoutineForDate);
document.getElementById('workoutRoutine').addEventListener('change', toggleWorkoutContent);
document.getElementById('useStructuredContent').addEventListener('change', handleStructuredContentToggle);

// Initialize form state
toggleStairsFields();
toggleWorkoutContent();
suggestRoutineForDate();

// Hide messages after 5 seconds
setTimeout(function () {
  const messages = document.querySelectorAll('.message');
  messages.forEach(function (message) {
    message.style.display = 'none';
  });
}, 5000);

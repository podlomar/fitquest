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
        break;
      }
    }
  }

  toggleWorkoutContent();
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

document.getElementById('stairsType').addEventListener('change', toggleStairsFields);
document.getElementById('date').addEventListener('change', suggestRoutineForDate);

// Initialize form state
toggleStairsFields();
suggestRoutineForDate();

// Hide messages after 5 seconds
setTimeout(function () {
  const messages = document.querySelectorAll('.message');
  messages.forEach(function (message) {
    message.style.display = 'none';
  });
}, 5000);

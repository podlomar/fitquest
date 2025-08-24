document.getElementById('date').value = new Date().toISOString().split('T')[0];

// Weekly routines data structure
const weeklyRoutines = {
  monday: {
    id: 'monday',
    name: 'Monday',
    exercises: [
      { name: 'squats' },
      { name: 'knee_push_ups' }
    ]
  },
  tuesday: {
    id: 'tuesday',
    name: 'Tuesday',
    exercises: [
      { name: 'ring_rows' },
      { name: 'front_plank' }
    ]
  },
  wednesday: {
    id: 'wednesday',
    name: 'Wednesday',
    exercises: [
      { name: 'squats' },
      { name: 'glute_bridges' }
    ]
  },
  thursday: {
    id: 'thursday',
    name: 'Thursday',
    exercises: [
      { name: 'knee_push_ups' },
      { name: 'side_planks' }
    ]
  },
  friday: {
    id: 'friday',
    name: 'Friday',
    exercises: [
      { name: 'ring_rows' },
      { name: 'squats' }
    ]
  },
  saturday: {
    id: 'saturday',
    name: 'Saturday',
    exercises: [
      { name: 'knee_push_ups' },
      { name: 'side_planks' }
    ]
  },
  sunday: {
    id: 'sunday',
    name: 'Sunday',
    exercises: [
      { name: 'yoga_flow' }
    ]
  }
};

function generateExerciseInputs(routineId) {
  const exerciseInputsContainer = document.getElementById('exerciseInputs');
  exerciseInputsContainer.innerHTML = '';

  if (routineId && routineId !== 'rest' && weeklyRoutines[routineId]) {
    const routine = weeklyRoutines[routineId];
    routine.exercises.forEach((exercise, index) => {
      const exerciseDiv = document.createElement('div');
      exerciseDiv.className = 'exercise-input-group';

      // Determine which type of exercise this is based on name
      const isHoldsExercise = exercise.name.includes('plank') ||
        exercise.name.includes('bridge') ||
        exercise.name === 'yoga_flow';

      exerciseDiv.innerHTML = `
        <h5>${exercise.name.replace(/_/g, ' ')}</h5>
        <div class="exercise-details">
          ${isHoldsExercise ? `
            <div class="form-group">
              <label for="${exercise.name}_holds">Holds:</label>
              <input type="text" id="${exercise.name}_holds" name="exercises[${exercise.name}][holds]" placeholder="e.g., 30s" />
            </div>
          ` : `
            <div class="form-group">
              <label for="${exercise.name}_reps">Reps:</label>
              <input type="text" id="${exercise.name}_reps" name="exercises[${exercise.name}][reps]" placeholder="e.g., 10+10+8" />
            </div>
          `}
          <div class="form-group">
            <label for="${exercise.name}_type">Type:</label>
            <select id="${exercise.name}_type" name="exercises[${exercise.name}][type]" onchange="toggleExerciseInputType('${exercise.name}')">
              <option value="${isHoldsExercise ? 'holds' : 'reps'}">${isHoldsExercise ? 'Holds' : 'Reps'}</option>
              <option value="${isHoldsExercise ? 'reps' : 'holds'}">${isHoldsExercise ? 'Reps' : 'Holds'}</option>
            </select>
          </div>
        </div>
      `;
      exerciseInputsContainer.appendChild(exerciseDiv);
    });
  }
}

function toggleExerciseInputType(exerciseName) {
  const typeSelect = document.getElementById(`${exerciseName}_type`);
  const repsInput = document.getElementById(`${exerciseName}_reps`);
  const holdsInput = document.getElementById(`${exerciseName}_holds`);
  const exerciseDetails = typeSelect.closest('.exercise-details');

  // Remove existing input
  if (repsInput) repsInput.closest('.form-group').remove();
  if (holdsInput) holdsInput.closest('.form-group').remove();

  // Add new input based on selected type
  const inputType = typeSelect.value;
  const newInputGroup = document.createElement('div');
  newInputGroup.className = 'form-group';

  if (inputType === 'reps') {
    newInputGroup.innerHTML = `
      <label for="${exerciseName}_reps">Reps:</label>
      <input type="text" id="${exerciseName}_reps" name="exercises[${exerciseName}][reps]" placeholder="e.g., 10+10+8" />
    `;
  } else {
    newInputGroup.innerHTML = `
      <label for="${exerciseName}_holds">Holds:</label>
      <input type="text" id="${exerciseName}_holds" name="exercises[${exerciseName}][holds]" placeholder="e.g., 30s" />
    `;
  }

  // Insert before the type selector
  exerciseDetails.insertBefore(newInputGroup, typeSelect.closest('.form-group'));
}

function toggleStructuredContent() {
  const useStructured = document.getElementById('useStructuredContent').checked;
  const exerciseFields = document.getElementById('exerciseFields');
  const workoutContent = document.getElementById('workoutContent');
  const routineSelect = document.getElementById('workoutRoutine');

  if (useStructured) {
    exerciseFields.style.display = 'block';
    workoutContent.style.display = 'none';
    generateExerciseInputs(routineSelect.value);
  } else {
    exerciseFields.style.display = 'none';
    workoutContent.style.display = 'block';
  }
}

function onRoutineChange() {
  const routineSelect = document.getElementById('workoutRoutine');
  const useStructured = document.getElementById('useStructuredContent').checked;

  if (useStructured) {
    generateExerciseInputs(routineSelect.value);
  }
}

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

// Toggle workout content field based on level
function toggleWorkoutContent() {
  const workoutRoutine = document.getElementById('workoutRoutine').value;
  const workoutContent = document.getElementById('workoutContent');
  const workoutContentGroup = workoutContent.closest('.form-group');

  // Hide content field for 'rest' level
  if (workoutRoutine === 'rest') {
    workoutContentGroup.style.display = 'none';
    workoutContent.value = '';
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
document.getElementById('workoutLevel').addEventListener('change', toggleWorkoutContent);
document.getElementById('workoutRoutine').addEventListener('change', onRoutineChange);
document.getElementById('useStructuredContent').addEventListener('change', toggleStructuredContent);

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

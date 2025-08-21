import { Routine } from '../types';

export const weeklyRoutines: Record<string, Routine> = {
  monday: {
    id: 'monday',
    name: 'Monday',
    exercises: [
      { name: 'squats' },
      { name: 'push ups' }
    ]
  },
  tuesday: {
    id: 'tuesday',
    name: 'Tuesday',
    exercises: [
      { name: 'lunges' },
      { name: 'planks' }
    ]
  },
  wednesday: {
    id: 'wednesday',
    name: 'Wednesday',
    exercises: [
      { name: 'squats' },
      { name: 'glute bridges' }
    ]
  },
  thursday: {
    id: 'thursday',
    name: 'Thursday',
    exercises: [
      { name: 'deadlifts' },
      { name: 'pull ups' }
    ]
  },
  friday: {
    id: 'friday',
    name: 'Friday',
    exercises: [
      { name: 'squats' },
      { name: 'dips' }
    ]
  },
  saturday: {
    id: 'saturday',
    name: 'Saturday',
    exercises: [
      { name: 'cardio intervals' },
      { name: 'core workout' }
    ]
  },
  sunday: {
    id: 'sunday',
    name: 'Sunday',
    exercises: [
      { name: 'yoga flow' },
      { name: 'stretching' }
    ]
  }
};

export const legacyRoutine: Routine = {
  id: 'legacy',
  name: 'Legacy: squats, knee push ups',
  exercises: [
    { name: 'squats' },
    { name: 'knee push ups' }
  ],
  isLegacy: true
};

export const getAllRoutines = (): Routine[] => {
  return [...Object.values(weeklyRoutines), legacyRoutine];
};

export const getRoutineById = (id: string): Routine | undefined => {
  if (id === 'legacy') {
    return legacyRoutine;
  }
  return weeklyRoutines[id];
};

export const getRoutineForDay = (date: Date): Routine => {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[date.getDay()];
  return weeklyRoutines[dayName];
};

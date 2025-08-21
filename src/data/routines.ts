import { Routine } from '../types';

export const weeklyRoutines: Record<string, Routine> = {
  monday: {
    id: 'monday',
    name: 'Monday',
    exercises: [
      { name: 'squats' },
      { name: 'knee push ups' }
    ]
  },
  tuesday: {
    id: 'tuesday',
    name: 'Tuesday',
    exercises: [
      { name: 'ring rows' },
      { name: 'front plank' }
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
      { name: 'knee push ups' },
      { name: 'side plank' }
    ]
  },
  friday: {
    id: 'friday',
    name: 'Friday',
    exercises: [
      { name: 'ring rows' },
      { name: 'squats' }
    ]
  },
  saturday: {
    id: 'saturday',
    name: 'Saturday',
    exercises: [
      { name: 'knee push ups' },
      { name: 'glute bridges' }
    ]
  },
  sunday: {
    id: 'sunday',
    name: 'Sunday',
    exercises: [
      { name: 'yoga flow' }
    ]
  }
};

export const legacyRoutine: Routine = {
  id: 'legacy',
  name: 'Legacy',
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

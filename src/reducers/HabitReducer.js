export const HabitReducer = (state, action) => {
  switch (action.type) {
    case "SET_HABITS":
      const newHabits = [];
      for (let key in action.habits) {
        newHabits.push({
          id: key,
          name: action.habits[key].name,
          question: action.habits[key].question,
          dates: action.habits[key].dates || [],
        });
      }
      return newHabits;
    case "ADD_HABIT":
      return [
        ...state,
        {
          id: action.id,
          name: action.habit.name,
          question: action.habit.question,
          dates: [],
        },
      ];
    case "REMOVE_HABIT":
      return state.filter((habit) => habit.id !== action.id);
    case "ADD_DATE":
      return state.map((habit) => {
        if (habit.id === action.id) {
          habit.dates[action.dateId] = action.date;
        }
        return habit;
      });
    case "REMOVE_DATE":
      return state.map(habit => {
        if (habit.id === action.id) {
          for (let key of Object.keys(habit.dates)) {
            if (key === action.dateId) {
              delete habit.dates[key];
            }
          }
        }
        return habit;
      })
    default:
      return state;
  }
};

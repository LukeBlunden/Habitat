export const HabitReducer = (state, action) => {
  switch (action.type) {
    case "SET_HABITS":
      const newHabits = [];
      for (let key in action.habits) {
        newHabits.push({
          id: key,
          name: action.habits[key].name,
          question: action.habits[key].question,
          dates: [],
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
          habit.dates = [...habit.dates, action.date];
        }
        return habit;
      });
    default:
      return state;
  }
};

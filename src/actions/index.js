// Coloque aqui suas actions
export const addUserEmail = (email) => ({
  type: 'SEND_USER_EMAIL',
  email,
});

export const addExpense = (expense, total) => ({
  type: 'SEND_EXPENSE',
  expense,
  total,
});

export const deleteExpense = (expense, total) => ({
  type: 'DELETE_EXPENSE',
  expense,
  total,
});

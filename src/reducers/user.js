// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SEND_USER_EMAIL':
    return {
      email: action.email,
    };
  default:
    return state;
  }
}

export default userReducer;

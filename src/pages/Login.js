import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addUserEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  handleClickSubmit() {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addUserEmail(email));
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const passLength = 6;
    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;
    return (
      <div>
        <h2>Login</h2>
        <form>
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => { this.setState({ email: target.value }); } }
          />
          <input
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => { this.setState({ password: target.value }); } }
          />
          <button
            type="submit"
            onClick={ this.handleClickSubmit }
            disabled={ password.length < passLength || !regex.test(email) }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Login);

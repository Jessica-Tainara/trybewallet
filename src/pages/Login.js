/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserEmail } from '../actions';
import login from '../login.png';
import text from '../texto.png';
import logo from '../logo.png';

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
      <div className="login">
        <div className="inputs">
          <img
            className="logo"
            alt="logo"
            src={ logo }
          />
          <div className="float-label">
            <input
              type="email"
              id="email-input"
              value={ email }
              onChange={ ({ target }) => { this.setState({ email: target.value }); } }
            />
            <label
              htmlFor="email-input"
            >
              E-mail

            </label>
          </div>
          <div className="float-label">
            <input
              type="password"
              id="password-input"
              value={ password }
              onChange={ ({ target }) => { this.setState({ password: target.value }); } }
            />
            <label
              htmlFor="password-input"
            >
              Senha

            </label>
          </div>
          <button
            type="button"
            onClick={ this.handleClickSubmit }
            disabled={ password.length < passLength || !regex.test(email) }
          >
            Entrar
          </button>
        </div>

        <img
          alt="login"
          className="img-login"
          src={ login }
        />
        <img
          alt="login"
          className="img"
          src={ text }
        />
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

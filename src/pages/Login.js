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
          <img className="logo" alt="logo" src={ logo } style={ { width: '150px', marginLeft: '200px', marginBottom: '100px' } } />
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
          style={ { width: '1200px', margin: '0', padding: '0' } }
        />
        <img
          alt="login"
          className="img"
          src={ text }
          style={ { width: '450px', marginLeft: '900px', marginTop: '-700px' } }
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

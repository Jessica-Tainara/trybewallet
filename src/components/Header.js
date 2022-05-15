import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    let total = '0.00';
    if (expenses.length > 0) {
      expenses.forEach(({ value, exchangeRates, currency }) => {
        total = (parseFloat(total) + parseFloat(value * exchangeRates[currency].ask))
          .toFixed(2);
      });
    }

    return (
      <div>
        <header className="header">
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <span data-testid="total-field">{`Despesa Total: R$ ${total}`}</span>
          <span data-testid="header-currency-field">BRL</span>
          <button
            type="button"
            className="new"
            onClick={ () => {
              const form = document.getElementsByClassName('form');
              form[0].classList.toggle('visible');
            } }
          >
            +

          </button>
        </header>
      </div>);
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Header);

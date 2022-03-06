import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .map((item) => {
                const {
                  id, description, tag: Tag, method: Method, value: Val,
                  exchangeRates: rates, currency } = item;
                return (
                  <tr key={ id }>
                    <td role="cell">{description}</td>
                    <td role="cell">{Tag}</td>
                    <td role="cell">{Method}</td>
                    <td role="cell">{parseFloat(Val) % 1 === 0 ? `${Val}.00` : Val}</td>
                    <td role="cell">{rates[currency].name}</td>
                    <td role="cell">{parseFloat(rates[currency].ask).toFixed(2)}</td>
                    <td role="cell">{rates[currency].ask * Val}</td>
                    <td role="cell">Real</td>
                    <td role="cell">
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => {
                          dispatch(deleteExpense(item));
                        } }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              }) }

          </tbody>
        </table>
      </div>);
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Table);

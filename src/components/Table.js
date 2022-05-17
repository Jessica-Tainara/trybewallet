import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <div>
        <table className="table" border="1">
          <thead>
            <tr className="cabeçalho">
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
          <tbody className="body">
            {expenses
              .map((item) => {
                const {
                  id, description, tag, method, value,
                  exchangeRates, currency } = item;
                return (
                  <tr className="line" key={ id }>
                    <td role="cell">{description}</td>
                    <td role="cell">{tag}</td>
                    <td role="cell">{method}</td>
                    <td
                      role="cell"
                      name="valor"
                    >
                      {parseFloat(value) % 1 === 0 ? `${value}.00` : value}
                    </td>
                    <td
                      role="cell"
                      name="moeda"
                    >
                      {exchangeRates[currency].name.split('/')[0]}
                    </td>
                    <td
                      role="cell"
                      name="cambio"
                    >
                      {parseFloat(exchangeRates[currency].ask).toFixed(2)}
                    </td>
                    <td
                      role="cell"
                      name="valor-convertido"
                    >
                      {(exchangeRates[currency].ask * value).toFixed(2)}
                    </td>
                    <td role="cell">Real</td>
                    <td role="cell">
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => {
                          dispatch(editExpense(item, true));
                        } }
                      >
                        Editar
                      </button>
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

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  ButtonRemove,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { TransactionsContext } from '../../context/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { Trash } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const { transactions, removeTransaction } = useContextSelector(
    TransactionsContext,
    ({ transactions, removeTransaction }) => {
      return {
        transactions,
        removeTransaction,
      }
    },
  )

  async function handleRemoveTransaction(id: number) {
    removeTransaction(id)
  }

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                <td>
                  <ButtonRemove
                    onClick={() => handleRemoveTransaction(transaction.id)}
                  >
                    <Trash size={24} />
                  </ButtonRemove>
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}

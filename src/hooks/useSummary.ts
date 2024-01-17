import { useContext } from 'react'
import { TransactionsContext } from '../context/TransactionsContext'

export function useSummary() {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce(
    (acm, transaction) => {
      if (transaction.type === 'income') {
        acm.income += transaction.price
        acm.total += transaction.price
      } else {
        acm.outcome += transaction.price
        acm.total -= transaction.price
      }

      return acm
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return summary
}

import { useState } from 'react'
import styles from './App.module.scss'
import Card from './Components/Card/Card'
import data from '../src/data/tickets.json' with { type: "json" }
import Filter from './Components/Filter/Filter'
import { ITicket } from './types'
import { nanoid } from 'nanoid'

export default function App() {
  const initialTickets = data.tickets.map(item => ({...item, id: nanoid()}))
  const [currency, setCurrency] = useState<string>("RUB")
  const [ tickets, setTickets ] = useState<ITicket[]>(initialTickets)
  const ticketsElement = tickets.map((item: ITicket) => <Card ticket={item} key={item.id} currency={currency}/>)

  return (
    <main>
      <Filter 
        setTickets={setTickets} 
        tickets={initialTickets} 
        setCurrency={setCurrency}
        currency={currency}
      />
      <div className={styles.tickets_container}>
        {ticketsElement}
      </div>
    </main>
  )
}

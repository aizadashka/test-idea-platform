import styles from './Card.module.scss'
import TK from '../../assets/TK.png'
import S7 from '../../assets/S7.png'
import SU from '../../assets/SU.png'
import BA from '../../assets/BA.png'
import { ITicket } from '../../types'

type CardProps = { 
    ticket: ITicket,
    currency: string
}

const Card: React.FC<CardProps> = ({ ticket, currency }) => {
    function getLogo(name: string) {
        if (name === "TK") return TK
        if (name === "S7") return S7
        if (name === "SU") return SU
        if (name === "BA") return BA
    }

    function getFormattedDate(date : string) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }

        const parts = date.split('.').map(item => Number(item))
        const newDate = new Date(parts[2] + 2000, parts[1]-1, parts[0]).toLocaleString("ru", options)

        return newDate
    }

    function getFormattedTime(time: string) {
        return ("0" + time).slice(-5)
    }

    function getPrice(price: number) {
        if (currency === "RUB") {
            return `${price}₽`
        } else if (currency === "USD") {
            return `${Math.floor(price / 92)}$`
        }
        return `${Math.floor(price / 98)}€`
    }

    return (
        <div className={styles.card}>
            <div className={styles.card__left_box}>
                <div className={styles.logo_container}>
                    <img src={getLogo(ticket.carrier)} className={styles.logo} />
                </div>
                <button onClick={() => {}} className={styles.card__buyBtn}>Купить<br/>за {getPrice(ticket.price)}</button>
            </div>
            <div className={styles.card__right_box}>
                <div className={styles.card__right_box__item}>
                    <p className={styles.card__time}>{getFormattedTime(ticket.departure_time)}</p>
                    <div className={styles.card__place}>
                        <span>{ticket.origin} </span>
                        <span>{ticket.origin_name}</span>
                    </div>
                    <p className={styles.card__date}>{getFormattedDate(ticket.departure_date)}</p>
                </div>
                <div className={styles.card__stops}>
                    <p className={styles.stops__stops__text}>{`${ticket.stops} пересадк${ticket.stops > 1 ? 'и' : 'а'}`}</p>
                    <svg  className={styles.card__plane_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path fill="#585858" d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"/>
                    </svg>
                </div>
                <div className={styles.card__right_box__item}>
                    <p className={styles.card__time}>{getFormattedTime(ticket.arrival_time)}</p>
                    <div className={styles.card__place}>
                        <span >{ticket.destination} </span>
                        <span >{ticket.destination_name}</span>
                    </div>
                    <p className={styles.card__date}>{getFormattedDate(ticket.arrival_date)}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
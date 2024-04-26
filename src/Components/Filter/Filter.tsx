import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import styles from './Filter.module.scss'
import { ITicket } from '../../types'
import classNames from 'classnames'

type FilterProps = { 
    setTickets: Dispatch<SetStateAction<ITicket[]>>
    tickets: ITicket[]
    setCurrency: Dispatch<SetStateAction<string>>
    currency: string
}

const Filter: React.FC<FilterProps> = ({ setTickets, tickets, setCurrency, currency }) => {
    const [filters, setFilters] = useState<number[]>([0,1,2,3])

    useEffect(() => {
        setTickets(() => {
            if (filters.length === 4) {
                return tickets
            } else {
                return tickets.filter(item => filters.includes(item.stops))
            }
        })
    }, [filters])

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement
        const checkboxNameAsNumber = Number(target.name)

        if (target.checked) {
            setFilters(prev => {
                if (target.name === 'all' || (filters.length === 3 && !filters.includes(checkboxNameAsNumber))) {
                    handleChangeForAll(target.checked)
                    return [0, 1, 2, 3]
                } else {
                    if (filters.length === 4) {
                        return [checkboxNameAsNumber]
                    }
                    return [...prev, checkboxNameAsNumber]
                }
            })
        } else {
            setFilters(prev => {
                if (target.name === 'all') {
                    handleChangeForAll(target.checked)
                    return [0]
                } else if (filters.length === 1) {
                    target.checked = true
                    return [checkboxNameAsNumber]
                } else {
                    const allCheckbox = document.getElementById('all') as HTMLInputElement
                    allCheckbox.checked = false
                    return prev.filter(item => item !== checkboxNameAsNumber)
                }
            })
        }
    }

    function handleChangeForAll(isChecked: boolean) {
        const checkboxes = document.querySelectorAll('input[type=checkbox]') as NodeListOf<HTMLInputElement>
        if (isChecked) {
            checkboxes.forEach(item => item.checked = true)
        } else {
            checkboxes.forEach((item, index) => {
                if (index === 1) {
                    item.checked = true
                    setFilters([0])
                } else {
                    item.checked = false
                }
            })
        }
    }

    function handleCurrencyChange(e: React.MouseEvent<HTMLButtonElement>) {
        const currencyBtn = e.target as HTMLButtonElement
        console.log(currency)
        setCurrency(currencyBtn.value)
    }
    return (
        <div className={styles.filter}>
            <div className={styles.filter__item}>
                <p>ВАЛЮТА</p>
                <div className={styles.filter__btns}>
                    <button 
                        onClick={(e) => handleCurrencyChange(e)} 
                        value="RUB"
                        className={currency === "RUB" ? styles.filter__btns__btn__chosen : styles.filter__btns__btn}
                    >RUB</button>
                    <button 
                        onClick={(e) => handleCurrencyChange(e)} 
                        value="USD"
                        className={currency === "USD" ? styles.filter__btns__btn__chosen : styles.filter__btns__btn}
                    >USD</button>
                    <button 
                        onClick={(e) => handleCurrencyChange(e)} 
                        value="EUR"
                        className={currency === "EUR" ? styles.filter__btns__btn__chosen : styles.filter__btns__btn}
                    >EUR</button>
                </div>
            </div>
            <div className={styles.filter__item}>
                <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
                <div>
                    <label className={styles.container}>Все
                        <input 
                            type="checkbox" 
                            id="all" 
                            name="all" 
                            className={classNames(styles.filter__checkbox, styles.checkbox)} 
                            onChange={(e) => handleChange(e)}
                        />
                        <span className={styles.checkmark}></span>
                    </label><br /> 

                    <label className={styles.container}>Без пересадок
                        <input 
                            type="checkbox" 
                            name="0" 
                            className={classNames(styles.filter__checkbox, styles.checkbox)} 
                            onChange={(e) => handleChange(e)}
                        />
                        <span className={styles.checkmark}></span>
                    </label><br /> 
                    
                    <label className={styles.container}>1 пересадка
                        <input 
                            type="checkbox" 
                            name="1" 
                            className={classNames(styles.filter__checkbox, styles.checkbox)} 
                            onChange={(e) => handleChange(e)}
                        />
                        <span className={styles.checkmark}></span>
                    </label><br /> 
                    
                    <label className={styles.container}>2 пересадки
                        <input 
                            type="checkbox" 
                            name="2" 
                            className={classNames(styles.filter__checkbox, styles.checkbox)} 
                            onChange={(e) => handleChange(e)}
                        />
                        <span className={styles.checkmark}></span>
                    </label><br /> 
                    
                    <label className={styles.container}>3 пересадки
                        <input 
                            type="checkbox" 
                            name="3" 
                            className={classNames(styles.filter__checkbox, styles.checkbox)} 
                            onChange={(e) => handleChange(e)}
                        />
                        <span className={styles.checkmark}></span>
                    </label><br /> 
                </div>
            </div>
        </div>
    )
}

export default Filter
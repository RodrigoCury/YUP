import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Search.css'

import PromotionList from '../List/List'

const PromotionSearch = () => {
    const [promotions, setPromotions] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const params = {}

        if (search) {
            params.title_like = search
        }

        setPromotions([])

        axios.get('http://localhost:3340/promotions?_embed=comments&_order=desc&_sort=id', { params })
            .then(response => {
                setPromotions(response.data)
            })

    }, [search])


    return (
        <div className='promotion-search'>
            <header className='promotion-search__header'>
                <h1>Promo Show</h1>
                <Link to="/create">Nova Promoção</Link>
            </header>
            <input
                className='promotion-search__input'
                type='search'
                placeholder='Pesquisar Promoção'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <PromotionList promotions={promotions} loading={!promotions.length} />
        </div>
    );

}

export default PromotionSearch
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useApi from 'components/utils/useApi'
import './Search.css'

import PromotionList from '../List/List'

const PromotionSearch = () => {
    const mountRef = useRef(null)
    const [search, setSearch] = useState('')
    const [load, loadInfo] = useApi({
        url: '/promotions',
        method: 'get',
        params: {
            _embed: "comments",
            _order: "desc",
            _sort: "id",
            title_like: search || undefined,
        },
        debounceDelay: search ? 300 : 0,
    })

    useEffect(() => {
        load({
            debounced: mountRef.current
        })
        if (!mountRef.current) {
            mountRef.current = true
        }
    }, [search])

    return (
        <div className='promotion-search'>
            <header className='promotion-search__header'>
                <h1>Promo Show</h1>
                <Link className='promotion-card__link' to="/create">Nova Promoção</Link>
            </header>
            <input
                className='promotion-search__input'
                type='search'
                placeholder='Pesquisar Promoção'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <PromotionList
                promotions={loadInfo.data}
                loading={!loadInfo.loading}
                error={loadInfo.error}
            />
        </div>
    );

}

export default PromotionSearch
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useApi from 'components/utils/useApi'
import UIInfiniteScroll from 'components/UI/InfiniteSroll/InfiniteSroll'
import './Search.css'

import PromotionList from '../List/List'

const baseParams = {
    _embed: "comments",
    _order: "desc",
    _sort: "id",
    _limit: 4,

}

const PromotionSearch = () => {
    const [page, setPage] = useState(1)
    const mountRef = useRef(null)
    const [search, setSearch] = useState('')
    const [load, loadInfo] = useApi({
        url: '/promotions',
        method: 'get',
        params: {
            ...baseParams,
            _page: page ,
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

    function fetchMore() {

        const newPage = page + 1

        load({
            isFetchMore: true,
            params: {
                ...baseParams,
                _page: newPage,
                title_like: search || undefined,
            },
            updateRequestInfo: (newRequestInfo, previousRequestInfo) => ({
                ...newRequestInfo,
                data: [
                    ...previousRequestInfo.data,
                    ...newRequestInfo.data,

                ]
            })
        })

        setPage(newPage)
    }

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
            {loadInfo.data && 
             !loadInfo.loading &&
             loadInfo.data?.length < loadInfo.total && 
                <UIInfiniteScroll fetchMore={fetchMore} />
            }
        </div>
    );

}

export default PromotionSearch
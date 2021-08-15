import React from "react"
import PromotionCard from "../Card/Card"
import './List.css'

const PromotionList = ({ loading, promotions }) => {
    if (loading) {
        return <div>Carregando</div>
    }

    return (
        <div className='promotion-list'>
            {promotions.map(p => <PromotionCard promotion={p} key={p.id} />)}
        </div>
    )
}

export default PromotionList
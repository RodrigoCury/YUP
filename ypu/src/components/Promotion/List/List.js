/* eslint-disable react/prop-types */
import React, { useState } from "react"
import PromotionCard from "../Card/Card"
import PromotionModal from "../Modal/Modal"
import './List.css'

const PromotionList = ({ error, loading, promotions }) => {

    const [promotionId, setPromotionId] = useState(null)

    if (error) {
        return <div>Algo de Errado, não está certo</div>
    }

    if (promotions === null) {
        return <div>Carregando...</div>
    }

    if (promotions.length === 0) {
        return <div>Nenhum Item encontrado</div>
    }

    return (
        <div className='promotion-list'>
            {promotions.map(p => {
                return <PromotionCard
                    promotion={p}
                    onClickComments={() => setPromotionId(p.id)}
                    key={p.id}
                />
            })}
            {!loading && (
                <div>Carregando Mais promoções...</div>
            )}
            {promotionId && (
                <PromotionModal
                    promotionId={promotionId}
                    onClickClose={() => setPromotionId(null)}
                />
            )}
        </div>
    )
}

export default PromotionList
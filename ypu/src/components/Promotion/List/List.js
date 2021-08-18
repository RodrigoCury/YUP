import React from "react"
import PromotionCard from "../Card/Card"
import './List.css'

const PromotionList = ({ error, loading, promotions }) => {
    if (error) {
        return <div>Algo de Errado, não está certo</div>
    }

    if (!loading || promotions === null) {
        return <div>Carregando...</div>
    }

    if (promotions.length === 0) {
        return <div>Nenhum Item encontrado</div>
    }

    return (
        <div className='promotion-list'>
            {promotions.map(p => <PromotionCard promotion={p} key={p.id} />)}
        </div>
    )
}

export default PromotionList
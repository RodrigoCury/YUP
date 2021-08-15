import React, { useEffect, useState } from "react";

import PromotionCard from 'components/Promotion/Card/Card'

import axios from "axios"


const PagesPromotionSearch = () => {

    const [promotions, setPromotions] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3340/promotions?_embed=comments')
            .then(response => {
                setPromotions(response.data)
            })

    }, [])


    return (
        <div
            style={{
                maxWidth: 800,
                margin: "30px auto"
            }}>
            {promotions.map(p => <PromotionCard promotion={p} />)}

        </div>
    );
}

export default PagesPromotionSearch
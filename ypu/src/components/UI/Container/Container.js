import React from "react"
import './Container.css'
import UIButton from "../UIButton/Button"
import {Link} from "react-router-dom"

const UIContainer = ({ children }) => {
    return (
        <div className='ui-container'>
            <header className='promotion-search__header'>
                <UIButton theme="no-border-gray" className="promotion-search__title" href='/'>Promo Show</UIButton>
                <UIButton component={Link} theme="contained-green" to="/create">Nova Promoção</UIButton>
            </header>
            {children}
        </div>
    )
}

export default UIContainer
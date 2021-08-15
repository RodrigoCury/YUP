import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from 'axios'
import './Form.css'

const initialValues = {
    title: "",
    price: 0,
    url: "",
    imageUrl: ""
}

const PromotionForm = () => {

    const [values, setValues] = useState(initialValues)
    const history = useHistory()

    function onChange(event) {
        const { name, value } = event.target

        const newValue = { ...values, [name]: value }

        setValues(newValue)
    }

    function onSubmit(event) {
        event.preventDefault()

        axios.post("http://localhost:3340/promotions", values)
            .then(response => {
                history.push('/')
            })
    }

    return (
        <div>
            <h1>Promo Show</h1>
            <h2>Nova promoção</h2>

            <form onSubmit={onSubmit}>
                <div className="promotion-form__group">
                    <label htmlFor='title'>Titulo</label>
                    <input id='title' name='title' type='text' onChange={onChange} />
                </div>

                <div className="promotion-form__group">
                    <label htmlFor='url'>Link</label>
                    <input id='url' name='url' type='text' onChange={onChange} />
                </div>

                <div className="promotion-form__group">
                    <label htmlFor='imageUrl'>Imagem</label>
                    <input id='imageUrl' name='imageUrl' type='text' onChange={onChange} />
                </div>

                <div className="promotion-form__group">
                    <label htmlFor='price'>Preço</label>
                    <input id='price' name='price' type='number' onChange={onChange} />
                </div>

                <div className="promotion-form__group">
                    <button type='submit'>Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default PromotionForm
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from 'axios'
import './Form.css'

const initialValues = {
    title: "",
    price: 0,
    url: "",
    imageUrl: ""
}

const PromotionForm = ({ id }) => {

    const [values, setValues] = useState(id ? null : initialValues)
    const history = useHistory()

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3340/promotions/${id}`)
                .then(response => {
                    if (response.status >= 400) {
                        throw new Error("Id Não Encontrado")
                    }
                    setValues(response.data)
                })
                .catch(error => console.error(error))
        }
    }, [])

    function onChange(event) {
        const { name, value } = event.target

        const newValue = { ...values, [name]: value }

        setValues(newValue)
    }

    function onSubmit(event) {
        event.preventDefault()

        const method = id
            ? 'put'
            : 'post'

        const url = id
            ? `http://localhost:3340/promotions/${id}`
            : `http://localhost:3340/promotions`

        axios[method](url, values)
            .then(response => {
                history.push('/')
            })
    }

    function deletePromo(event) {
        event.preventDefault()

        axios.delete(`http://localhost:3340/promotions/${id}`).then(() => history.push('/'))
    }

    return (
        <div>
            <h1>Promo Show</h1>
            <h2>{id ? "Editar Promoção" : "Nova promoção"}</h2>

            {!values
                ? (<h2>Carregando...</h2>)
                : (
                    <form onSubmit={onSubmit}>
                        <div className="promotion-form__group">
                            <label htmlFor='title'>Titulo</label>
                            <input id='title' name='title' type='text' onChange={onChange} value={values.title} />
                        </div>

                        <div className="promotion-form__group">
                            <label htmlFor='url'>Link</label>
                            <input id='url' name='url' type='text' onChange={onChange} value={values.url} />
                        </div>

                        <div className="promotion-form__group">
                            <label htmlFor='imageUrl'>Imagem</label>
                            <input id='imageUrl' name='imageUrl' type='text' onChange={onChange} value={values.imageUrl} />
                        </div>

                        <div className="promotion-form__group">
                            <label htmlFor='price'>Preço</label>
                            <input id='price' name='price' type='number' onChange={onChange} value={values.price} />
                        </div>

                        <div className="promotion-form__group">
                            <button type='submit'>Salvar</button>
                            <button onClick={() => history.push('/')}>Cancelar</button>
                        </div>

                        <div className="promotion-form__group">
                        </div>

                        {
                            id
                                ?
                                <div className="promotion-form__group">
                                    <button onClick={deletePromo}>Apagar promoção</button>
                                </div>
                                : ""
                        }
                    </form>
                )
            }
        </div>
    )
}

export default PromotionForm
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import './Form.css'
import useApi from "components/utils/useApi"

const initialValues = {
    title: "",
    price: 0,
    url: "",
    imageUrl: ""
}

const PromotionForm = ({ id }) => {
    const [values, setValues] = useState(id ? null : initialValues)

    // Load Values from Server
    const [load, loadInfo] = useApi({
        url: `promotions/${id}`,
        method: "get",
        onCompleted: (response) => !response.error && setValues(response.data),
    })

    // Save Values on Server
    const [save, saveInfo] = useApi({
        url: id
            ? `promotions/${id}`
            : `promotions`,
        method: id
            ? "put"
            : "post",
        onCompleted: (response) => !response.error && history.push('/')
    })

    // Delete Values from Server
    const [del, delInfo] = useApi({
        url: `promotions/${id}`,
        method: "delete",
        onCompleted: (response) => !response.error && history.push('/')
    })

    const history = useHistory()

    useEffect(() => {
        if (id) {
            load({ debounced: false, })
        }
    }, [])

    function onChange(event) {
        const { name, value } = event.target

        const newValue = { ...values, [name]: value }

        setValues(newValue)
    }

    function onSubmit(event) {
        event.preventDefault()
        save({
            data: values,
            debounced: false,
        })
    }

    function deletePromo(event) {
        event.preventDefault()
        del({ debounced: false, })
    }

    return (
        <div>
            <h1>Promo Show</h1>
            <h2>{id ? "Editar Promoção" : "Nova promoção"}</h2>

            {!values
                ? (
                    !loadInfo.error
                        ? (<h2>Carregando...</h2>)
                        : (<h2>Houve Um Erro na Requisição do Item</h2>)
                )
                : (
                    <form onSubmit={onSubmit}>
                        {saveInfo.loading && <span>Salvando Dados...</span>}
                        <div className="promotion-form__group">
                            <label htmlFor='title'>Titulo</label>
                            <input id='title' name='title' type='text' onChange={onChange} value={values?.title} />
                        </div>

                        <div className="promotion-form__group">
                            <label htmlFor='url'>Link</label>
                            <input id='url' name='url' type='text' onChange={onChange} value={values?.url} />
                        </div>

                        <div className="promotion-form__group">
                            <label htmlFor='imageUrl'>Imagem</label>
                            <input id='imageUrl' name='imageUrl' type='text' onChange={onChange} value={values?.imageUrl} />
                        </div>

                        <div className="promotion-form__group">
                            <label htmlFor='price'>Preço</label>
                            <input id='price' name='price' type='number' onChange={onChange} value={values?.price} />
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
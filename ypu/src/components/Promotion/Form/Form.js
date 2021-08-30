/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import Field from 'components/Form/Field/Field'
import { Formik, Form, } from "formik"
import './Form.css'
import useApi from "components/utils/useApi"
import schema from "./schema"
import UIButton from "components/UI/UIButton/Button"

const initialValues = {
    title: "",
    price: 0,
    url: "",
    imageUrl: ""
}

// eslint-disable-next-line react/prop-types
const PromotionForm = ({ id }) => {
    // Load Values from Server
    const [load, loadInfo] = useApi({
        url: `promotions/${id}`,
        method: "get",
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
    const [del] = useApi({
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

    function onSubmit(formValues) {
        const valuesToSave = {
            ...formValues,
            price: Number(formValues.price).toFixed(2) // Remove 0's Desnecessários
        }

        save({
            data: valuesToSave,
            debounced: false,
        })
    }

    function deletePromo(event) {
        event.preventDefault()
        del({ debounced: false, })
    }

    const values = id ? loadInfo.data : initialValues

    const fields = [
        {name: 'title', label: "Título", type: 'text', },
        {name: 'url', label: "Link", type: 'text', },
        {name: 'imageUrl', label: "Imagem", type: 'text', },
        {name: 'price', label: "Preço", type: 'number', },
    ]

    return (
        <div>
            <h2>{id ? "Editar Promoção" : "Nova promoção"}</h2>

            {!values
                ? (
                    !loadInfo.error
                        ? (<h2>Carregando...</h2>)
                        : (<h2>Houve Um Erro na Requisição do Item</h2>)
                )
                : (
                    <Formik
                        initialValues={values}
                        validationSchema={schema}
                        onSubmit={onSubmit}
                    >
                        {()=> (
                            <Form>
                                {saveInfo.loading && <span>Salvando Dados...</span>}
                                
                                {fields.map(field => (
                                    <Field {...field} key="" />
                                ))}

                                <UIButton className="promotion-form__button" component="button" type='submit'>Salvar</UIButton>
                                <UIButton className="promotion-form__button" component="button" onClick={() => history.push('/')}>Cancelar</UIButton>
                                {id && 
                                <UIButton className="promotion-form__button" theme="contained-red" component="button" onClick={deletePromo}>Apagar promoção</UIButton>
                                }

                            </Form>
                        )}
                    </Formik>
                )
            }
        </div>
    )
}

export default PromotionForm
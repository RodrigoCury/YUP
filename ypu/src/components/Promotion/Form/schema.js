import *  as yup from 'yup'

export default yup.object().shape({
    title: yup.string().required("Campo Obrigatório"),
    url: yup.string().url("Campo Precisa ser uma URL").required("Campo Obrigatório"),
    imageUrl: yup.string().url("Campo Precisa ser uma URL").required("Campo Obrigatório"),
    price: yup.number().typeError("Preço precisa ser um número").positive("Valor precisa ser positivo").required("Campo Obrigatório"),
})
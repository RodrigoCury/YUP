import React from 'react'
import { useField } from 'formik'
import './Field.css'

const FormField = ({name, id, label, ...restProps}) => {
    // eslint-disable-next-line no-unused-vars
    const [field, meta, helpers] = useField({name, id, ...restProps})
    return ( 
    <div className="form-field">
        {
            label &&
            <label htmlFor={id ?? name}>{label}</label>
        }
        {meta.error && meta.touched && (<span className="form-field__error-message">{meta.error}</span>)}
        <input {...field} className={meta.error && 'form-field__input-has-error'} name={name} id={id ?? name} />
    </div>
)}

export default FormField
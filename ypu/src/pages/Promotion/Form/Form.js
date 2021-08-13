import React from "react";
import { useParams } from "react-router-dom";

const PagesPromotionForm = () => {

    const { id } = useParams();

    return (
        <form>
            <input type='text' placeholder={`Pesquisar ${id}`} />
            <button type='submit' onClick={(event) => { event.preventDefault() }}>Pesquisar</button>
        </form>
    )
}

export default PagesPromotionForm
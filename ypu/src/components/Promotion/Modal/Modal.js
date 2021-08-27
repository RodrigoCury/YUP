import React, { useEffect, useState } from "react";
import UIModal from 'components/UI/Modal/Modal'
import useApi from "components/utils/useApi";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree";
import './Modal.css'

const PromotionModal = ({ promotionId, onClickClose }) => {

    const [load, loadInfo] = useApi({
        url: `comments/`,
        params: {
            promotionId,
            sort: "id",
            order: 'desc',
            _expand: "user",
        },
        method: 'get',
    })

    // eslint-disable-next-line no-unused-vars
    const [sendComment, sendCommentInfo] = useApi({
        url: `comments/`,
        method: 'POST',
    })

    const [comment, setComment] = useState("");

    useEffect(() => {
        if (promotionId) {
            load({ debounced: false })
        }
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await sendComment({
                data: {
                    userId: 1,
                    promotionId,
                    comment: comment,
                }
            })
            setComment("")
            load({ debounced: false, quietly: true })
        } catch (error) {
            console.log(error);
        }
    }

    async function sendAnswer (answer, parentId) {
        try {
            await sendComment({
                data: {
                    userId: 1,
                    promotionId,
                    comment: answer,
                    parentId,
                }
            })
            load({ debounced: false , quietly: true})
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UIModal isOpen={Boolean(promotionId)} onClickClose={onClickClose}>
            <h1>Comentários</h1>
            <form
                onSubmit={onSubmit}
                className="promotion-modal__comment-form"
            >
                <input
                    placeholder="Visitante"
                    className="promotion-modal__name-box"
                />
                <textarea
                    placeholder="Comentar..."
                    className="promotion-modal__comment-box"
                    onChange={event => setComment(event.target.value)}
                    value={comment}
                    disabled={sendCommentInfo.loading}
                />
                <button type="submit" className='promotion-modal__submit' disabled={sendCommentInfo.loading}>
                    {sendCommentInfo.loading ? "Enviando" : 'Enviar'}
                </button>
            </form>
            <PromotionModalCommentsTree comments={loadInfo.data} sendComment={sendAnswer}/>

        </UIModal>
    )
}

export default PromotionModal
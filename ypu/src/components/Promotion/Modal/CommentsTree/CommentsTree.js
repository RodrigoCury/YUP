/* eslint-disable no-unused-vars */
import React, {useState, useMemo} from "react"
import './commentsTree.css'

function getTree(list) {
    const root = []
    const childrenByParentId = {}

    if(!list){
        return []
    }

    list.forEach(item => {
        if(!item.parentId){
            root.push(item)
            return
        } 
        if (childrenByParentId[item.parentId]) {
            childrenByParentId[item.parentId].push(item)
            return
        }
        
        childrenByParentId[item.parentId] = [item]
        return
    })

    function buildTree(nodes) {
        if(!nodes) {
        return null
        }

        return nodes.map(node => ({
            ...node,
            children: buildTree(childrenByParentId[node.id]),
        }))
    }

    return buildTree(root)
}

const PromotionModalCommentsTree = ({ comments, sendComment }) => {
    
    const tree = useMemo(() => getTree(comments), [comments])
    const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(null)
    const [comment, setComment] = useState("")

    function renderItem(item) {
        return (
            <li key={item.id} className="promotion-modal-comments-tree__item">
                <img
                    src={item.user.avatarUrl}
                    alt={`Foto Usuário ${item.user.name}`}
                    className="promotion-modal-comments-tree__item__avatar"
                />

                <div className="promotion-modal-comments-tree__item__info">
                    <span className='promotion-modal-comments-tree__item__username'>{item.user.name}</span>

                    <p className='promotion-modal-comments-tree__item__comment'>"{item.comment}"</p>

                    <button 
                        type = "button"
                        className = 'promotion-modal-comments-tree__answer-button'
                        onClick={() => {
                            setComment("")
                            setIsCommentBoxVisible(isCommentBoxVisible ===item.id ? null :item.id)
                        }}
                    > 
                        {isCommentBoxVisible !== item.id
                            ? 'Responder'
                            : 'Esconder'
                        } 
                    </button>

                    {isCommentBoxVisible ===item.id &&(
                        <div className = 'promotion-modal-comments-tree__comment-box' >
                            <textarea value={comment} onChange={(ev) => {setComment(ev.target.value)}}/>
                            <button 
                                type='button' 
                                className = 'promotion-modal-comments-tree__send-button'
                                onClick={() => {
                                    sendComment(comment, item.id)
                                    setComment("")
                                    setIsCommentBoxVisible(null)
                                }}
                            >
                                Comentar
                            </button>
                        </div>
                    )}

                    {item.children && renderList(item)}

                </div>
            </li>
        )
    }

    function renderList(list) {
        return (
            <ul className='promotion-modal-comments-tree'>
                {list.map(renderItem)}
            </ul>
        )
    }

    
    if (comments) {
        return renderList(tree)
    }

    return (<h1>Carregando</h1>)


}

PromotionModalCommentsTree.defaultProps = {
    sendComment : (comment, parentId) => {
        console.log({comment, parentId})
    }
}

export default PromotionModalCommentsTree
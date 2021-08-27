import React from "react"
import ReactDOM from "react-dom"
import './Modal.css'

const portalRoot = document.getElementById('portal-root')

const UIModal = ({ children, isOpen, onClickClose }) => {
    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className='ui-modal__overlay' onClick={(ev) => ev.target.className == 'ui-modal__overlay' && onClickClose()}>
            <div className='ui-modal'>
                <button className='ui-modal__close-button' onClick={onClickClose} type='button'>x</button>
                {children}
            </div>
        </div>,
        portalRoot,
    )
}


export default UIModal
import React from 'react'
import './Button.css'

const UIButton = ({ children, className, theme, component: Component, ...props }) => {
    return (
        <Component className={`ui-button ui-button--${theme} ${className}`} {...props}>
            {children}
        </Component>
    )
}

UIButton.defaultProps = {
    theme: "bordered-blue",
    component: "a",
    className: "",
}

export default UIButton
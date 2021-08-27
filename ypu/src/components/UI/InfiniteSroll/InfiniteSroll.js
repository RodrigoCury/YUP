/* eslint-disable no-unused-vars */
import React, {useEffect, useRef} from 'react'

const UIInfiniteScroll = ({ fetchMore }) => {

    const containerRef = useRef()

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 1,
        }

        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting){
                observer.disconnect()
                fetchMore()
            }
        }, observerOptions)

        observer.observe(containerRef.current)

        return () => observer.disconnect()

    },[])
    

    return <div ref={containerRef} id="scrollArea"/>
}

export default UIInfiniteScroll
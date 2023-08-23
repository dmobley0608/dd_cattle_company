import 'animate.css'
import { Fragment } from 'react'

export const ZoomInEntranceAnimation = ({styles,children})=>(
    <div className={`${styles} animate__animated animate__zoomIn`}>
        {children}
    </div>
)

export const HingeExit = ({styles, children})=>(
    <div className={`${styles} animate__animated animate__hinge`}>
        {children}
    </div>
)
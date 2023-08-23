import 'animate.css'

export const ZoomInEntranceAnimation = ({id,styles,children})=>(
    <div id={id} className={`${styles} animate__animated animate__zoomIn`}>
        {children}
    </div>
)

export const HingeExit = ({id,styles, children})=>(
    <div id={id} className={`${styles} animate__animated animate__hinge`}>
        {children}
    </div>
)
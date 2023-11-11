import React, { useCallback, useEffect, useState } from 'react'
import brandU from '../../../../static/images/brand-symbols/U.png'
import brand0 from '../../../../static/images/brand-symbols/0.png'
import brand1 from '../../../../static/images/brand-symbols/1.png'
import brand2 from '../../../../static/images/brand-symbols/2.png'
import brand3 from '../../../../static/images/brand-symbols/3.png'
import brand4 from '../../../../static/images/brand-symbols/4.png'
import brand5 from '../../../../static/images/brand-symbols/5.png'
import brand6 from '../../../../static/images/brand-symbols/6.png'
import brand7 from '../../../../static/images/brand-symbols/7.png'
import brand8 from '../../../../static/images/brand-symbols/8.png'
import brand9 from '../../../../static/images/brand-symbols/9.png'
import './styles.css'

export default function MustangBrand({ brand }) {
    const [images, setImages] = useState([9])


    const setBrandImage = useCallback(() => {
        images[0] = brandU        
        for (let i = 0; i < brand.length; i++) {
            if (brand[i] == 0) {
                images[i + 2] = brand0
            }
            if (brand[i] == 1) {
                images[i + 2] = brand1
            }
            if (brand[i] == 2) {
                images[i + 2] = brand2
            }
            if (brand[i] == 3) {
                images[i + 2] = brand3
            }
            if (brand[i] == 4) {
                images[i + 2] = brand4
            }
            if (brand[i] == 5) {
                images[i + 2] = brand5
            }
            if (brand[i] == 6) {
                images[i + 2] = brand6
            }
            if (brand[i] == 7) {
                images[i + 2] = brand7
            }
            if (brand[i] == 8) {
                images[i + 2] = brand8
            }
            if (brand[i] == 9) {
                images[i + 2] = brand9
            }
        }
    }, [brand, images])

    useEffect(() => {       
        setBrandImage()
    }, [setBrandImage])

    return (
        <div className='brand-container'>
            <div id='us' className='img-container'><img src={images[0]} alt="" /></div>
            <div id="tb" className='img-container'><img src={images[2]} alt="" /></div>
            <div id="bb" className='img-container'><img src={images[3]} alt="" /></div>            
            <div id="r1" className='img-container brand-number'><img src={images[4]} alt="" /></div>
            <div id="r2" className='img-container brand-number'><img src={images[5]} alt="" /></div>
            <div id="b1" className='img-container brand-number'><img src={images[6]} alt="" /></div>
            <div id="b2" className='img-container brand-number'><img src={images[7]} alt="" /></div>
            <div id="b3" className='img-container brand-number'><img src={images[8]} alt="" /></div>
            <div id="b4" className='img-container brand-number'><img src={images[9]} alt="" /></div>
        </div>
    )
}

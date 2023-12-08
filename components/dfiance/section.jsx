
import React, { useEffect, useRef, useState } from 'react';


import classNames from 'classnames';

import { Loader } from '../loader';


function setCoordinates(x = window.innerWidth / 2, y = window.innerHeight / 2) {
    Object.assign(document.documentElement, {
        style: `
            --move-x: ${(x - window.innerWidth / 2) * -.0017}deg;
            --move-y:${(y - window.innerHeight / 2) * -.0022}deg
        `
    })
}

const Dfiance = ({ transition }) => {

    let container = useRef(null);
    const [visible, setVisible] = useState(false)



    useEffect(() => {
        if (transition) return;
        console.log('render dfiance')

        const mouseHander = (e) => {
            setCoordinates(e.clientX, e.clientY)
        }

        if (container.current) {
            console.log('setting listener')
            document.addEventListener("mousemove", mouseHander)
            setCoordinates()
            setTimeout(() => setVisible(true), 1000)
        }


        return () => {
            console.log('unmount dfiance')
            document.removeEventListener("mousemove", mouseHander)
        }
    }, [container, transition])


    return <div className={classNames('dfiance', { visible })} ref={(node) => {
        if (node) {
            container.current = node
        }
    }}>
        <div className="layers__container">
            <div className="layers__item layer-1"></div>
            <div className="layers__item layer-2"></div>
            <div className="layers__item layer-3">
                <p>Dfiance is a PVP strategy card game that simulates a clash of two armies on a battlefield</p>
                <div className='item__buttons'>
                    <a target='_blank' href="https://dfiance.com/">Visit</a>
                    {/* <button>Stack</button> */}
                </div>

            </div>

            <div className="layers__item layer-4"></div>
            <div className="layers__item layer-5"></div>
            <div className="layers__item layer-6"></div>
            <div className="layers__item layer-8">
                <div className="shadow"></div>
            </div>

        </div>
        {!visible && <Loader />}
    </div>

}

const lazyImages = [{
    elementClass: ".layers__item.layer-1",
    src: "/img/dfiance/1-min.png"
}, {
    elementClass: ".layers__item.layer-2",
    src: "/img/dfiance/2-min.png"
}]


export { Dfiance, lazyImages }
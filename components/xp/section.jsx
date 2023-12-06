import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Oxygen } from "next/font/google";
//import { Draggable } from '@shopify/draggable';
import gsap from 'gsap'


const { Draggable } = require('../../node_modules/draggable/Draggable.min.js')
const { InertiaPlugin } = require('../../node_modules/draggable/InertiaPlugin.min.js')

const montserratBold = Oxygen({ subsets: ["latin"], weight: "700" });


const adaptToScreen = () => {
    switch (true) {
        case window.innerWidth < 1600: {
            return 5
        }
        default: {
            return 10
        }
    }
}

const XP = ({ transition = false }) => {
    const [visible, setVisible] = useState(false)

    let draggable = useRef(null)

    useEffect(() => {
        if (transition) return;
        setTimeout(() => {
            setVisible(true)

            gsap.registerPlugin(Draggable);
            gsap.registerPlugin(InertiaPlugin);
            draggable.current = Draggable.create('.gallery', {
                bounds: '.xpSection__container',
                inertia: true
            })

        }, 1000)



    }, [transition])


    useEffect(() => {
        if (visible) {
            // const root = document.querySelector('.xpSection__container h2')

            // root.addEventListener("mouseenter", (e) => {
            //     console.log(e)
            //     draggable.current.disable()
            // })

            const observer = new IntersectionObserver((items) => {
                items.forEach(item => {
                    if (item.isIntersecting) {
                        item.target.classList.add('intersected')
                    } else {
                        item.target.classList.remove('intersected')
                    }
                })
            }, {
                root: null,
                rootMargin: `-${adaptToScreen()}%`,
                threshold: 1.0

            })

            Array.from(document.querySelectorAll('.xpSection__container .gallery img')).forEach(elem => {
                observer.observe(elem)

            })
        }
    }, [visible])


    //  .gallery>(.gallery__item*10>img[src="/img/xp/$.jpg" alt="gal$-img"])*4
    return <div className={classNames('xpSection', { visible })}>
        <div className="xpSection__container">
            {visible && <h2 className={montserratBold.className}>
                <span>XP.NETWORK</span>
                {/* <p>NFT Bridge</p> */}
                <a target='_blank' href="https://xp.network/">Visit</a>

            </h2>}

            <div className="gallery">
                <div className="gallery__item"><img src="/img/xp/1.png" alt="gal1-img" /></div>
                <div className="gallery__item"><img src="/img/xp/2.png" alt="gal2-img" /></div>
                <div className="gallery__item"><img src="/img/xp/3.png" alt="gal3-img" /></div>
                <div className="gallery__item"><img src="/img/xp/4.png" alt="gal4-img" /></div>
                <div className="gallery__item"><img src="/img/xp/5.png" alt="gal5-img" /></div>
                <div className="gallery__item"><img src="/img/xp/6.png" alt="gal6-img" /></div>
                <div className="gallery__item"><img src="/img/xp/7.png" alt="gal7-img" /></div>
                <div className="gallery__item"><img src="/img/xp/8.png" alt="gal8-img" /></div>
                <div className="gallery__item"><img src="/img/xp/9.png" alt="gal9-img" /></div>
                <div className="gallery__item"><img src="/img/xp/10.png" alt="gal10-img" /></div>
                <div className="gallery__item"><img src="/img/xp/11.png" alt="gal11-img" /></div>
                <div className="gallery__item"><img src="/img/xp/12.png" alt="gal12-img" /></div>
                <div className="gallery__item"><img src="/img/xp/13.png" alt="gal13-img" /></div>
                <div className="gallery__item"><img src="/img/xp/14.png" alt="gal14-img" /></div>
                <div className="gallery__item"><img src="/img/xp/15.png" alt="gal15-img" /></div>
                <div className="gallery__item"><img src="/img/xp/16.png" alt="gal16-img" /></div>
                <div className="gallery__item"><img src="/img/xp/17.png" alt="gal17-img" /></div>
                <div className="gallery__item"><img src="/img/xp/18.png" alt="gal18-img" /></div>
                <div className="gallery__item"><img src="/img/xp/19.png" alt="gal19-img" /></div>
                <div className="gallery__item"><img src="/img/xp/20.png" alt="gal20-img" /></div>
                <div className="gallery__item"><img src="/img/xp/1.png" alt="gal1-img" /></div>
                <div className="gallery__item"><img src="/img/xp/2.png" alt="gal2-img" /></div>
                <div className="gallery__item"><img src="/img/xp/3.png" alt="gal3-img" /></div>
                <div className="gallery__item"><img src="/img/xp/4.png" alt="gal4-img" /></div>
                <div className="gallery__item"><img src="/img/xp/5.png" alt="gal5-img" /></div>
                <div className="gallery__item"><img src="/img/xp/6.png" alt="gal6-img" /></div>
                <div className="gallery__item"><img src="/img/xp/7.png" alt="gal7-img" /></div>
                <div className="gallery__item"><img src="/img/xp/8.png" alt="gal8-img" /></div>
                <div className="gallery__item"><img src="/img/xp/9.png" alt="gal9-img" /></div>
                <div className="gallery__item"><img src="/img/xp/10.png" alt="gal10-img" /></div>
                <div className="gallery__item"><img src="/img/xp/11.png" alt="gal11-img" /></div>
                <div className="gallery__item"><img src="/img/xp/12.png" alt="gal12-img" /></div>
                <div className="gallery__item"><img src="/img/xp/13.png" alt="gal13-img" /></div>
                <div className="gallery__item"><img src="/img/xp/14.png" alt="gal14-img" /></div>
                <div className="gallery__item"><img src="/img/xp/15.png" alt="gal15-img" /></div>
                <div className="gallery__item"><img src="/img/xp/16.png" alt="gal16-img" /></div>
                <div className="gallery__item"><img src="/img/xp/17.png" alt="gal17-img" /></div>
                <div className="gallery__item"><img src="/img/xp/18.png" alt="gal18-img" /></div>
                <div className="gallery__item"><img src="/img/xp/19.png" alt="gal19-img" /></div>
                <div className="gallery__item"><img src="/img/xp/20.png" alt="gal20-img" /></div>
                <div className="gallery__item"><img src="/img/xp/1.png" alt="gal1-img" /></div>
                <div className="gallery__item"><img src="/img/xp/2.png" alt="gal2-img" /></div>
                <div className="gallery__item"><img src="/img/xp/3.png" alt="gal3-img" /></div>
                <div className="gallery__item"><img src="/img/xp/4.png" alt="gal4-img" /></div>
                <div className="gallery__item"><img src="/img/xp/5.png" alt="gal5-img" /></div>
                <div className="gallery__item"><img src="/img/xp/6.png" alt="gal6-img" /></div>
                <div className="gallery__item"><img src="/img/xp/7.png" alt="gal7-img" /></div>
                <div className="gallery__item"><img src="/img/xp/8.png" alt="gal8-img" /></div>
                <div className="gallery__item"><img src="/img/xp/9.png" alt="gal9-img" /></div>
                <div className="gallery__item"><img src="/img/xp/10.png" alt="gal10-img" /></div>
                <div className="gallery__item"><img src="/img/xp/11.png" alt="gal11-img" /></div>
                <div className="gallery__item"><img src="/img/xp/12.png" alt="gal12-img" /></div>
                <div className="gallery__item"><img src="/img/xp/13.png" alt="gal13-img" /></div>
                <div className="gallery__item"><img src="/img/xp/14.png" alt="gal14-img" /></div>
                <div className="gallery__item"><img src="/img/xp/15.png" alt="gal15-img" /></div>
                <div className="gallery__item"><img src="/img/xp/16.png" alt="gal16-img" /></div>
                <div className="gallery__item"><img src="/img/xp/17.png" alt="gal17-img" /></div>
                <div className="gallery__item"><img src="/img/xp/18.png" alt="gal18-img" /></div>
                <div className="gallery__item"><img src="/img/xp/19.png" alt="gal19-img" /></div>
                <div className="gallery__item"><img src="/img/xp/20.png" alt="gal20-img" /></div>
                <div className="gallery__item"><img src="/img/xp/1.png" alt="gal1-img" /></div>
                <div className="gallery__item"><img src="/img/xp/2.png" alt="gal2-img" /></div>
                <div className="gallery__item"><img src="/img/xp/3.png" alt="gal3-img" /></div>
                <div className="gallery__item"><img src="/img/xp/4.png" alt="gal4-img" /></div>
                <div className="gallery__item"><img src="/img/xp/5.png" alt="gal5-img" /></div>
                <div className="gallery__item"><img src="/img/xp/6.png" alt="gal6-img" /></div>
                <div className="gallery__item"><img src="/img/xp/7.png" alt="gal7-img" /></div>
                <div className="gallery__item"><img src="/img/xp/8.png" alt="gal8-img" /></div>
                <div className="gallery__item"><img src="/img/xp/9.png" alt="gal9-img" /></div>
                <div className="gallery__item"><img src="/img/xp/10.png" alt="gal10-img" /></div>
                <div className="gallery__item"><img src="/img/xp/11.png" alt="gal11-img" /></div>
                <div className="gallery__item"><img src="/img/xp/12.png" alt="gal12-img" /></div>
                <div className="gallery__item"><img src="/img/xp/13.png" alt="gal13-img" /></div>
                <div className="gallery__item"><img src="/img/xp/14.png" alt="gal14-img" /></div>
                <div className="gallery__item"><img src="/img/xp/15.png" alt="gal15-img" /></div>
                <div className="gallery__item"><img src="/img/xp/16.png" alt="gal16-img" /></div>
                <div className="gallery__item"><img src="/img/xp/17.png" alt="gal17-img" /></div>
                <div className="gallery__item"><img src="/img/xp/18.png" alt="gal18-img" /></div>
                <div className="gallery__item"><img src="/img/xp/19.png" alt="gal19-img" /></div>
                <div className="gallery__item"><img src="/img/xp/20.png" alt="gal20-img" /></div>
            </div>

        </div>
        {!visible && <h2 className={montserratBold.className}>XP.NETWORK<div className="lds-ripple"><div></div><div></div></div></h2>}
        {/* {!visible && <div className="lds-ripple"><div></div><div></div></div>} */}
    </div>
}

const lazyImages = []

export { XP, lazyImages }
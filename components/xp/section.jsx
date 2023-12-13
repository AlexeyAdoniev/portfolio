import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Montserrat } from "next/font/google";
//import { Draggable } from '@shopify/draggable';
import gsap from 'gsap'

import { Loader } from '../loader.jsx';


const { Draggable } = require('./Draggable.min.js')
const { InertiaPlugin } = require('./InertiaPlugin.min.js')

const montserratBold = Montserrat({ subsets: ["latin"], weight: "700" });

const adaptToScreen = () => {
    switch (true) {
        case window.innerWidth < 1600: {
            return 10
        }
        default: {
            return 20
        }
    }
}

const XP = ({ transition }) => {


    const [visible, setVisible] = useState(false)

    let draggable = useRef(null)

    useEffect(() => {
        if (transition) {
            return void setVisible(false)
        };



        setTimeout(() => {
            setVisible(true)

            gsap.registerPlugin(Draggable);
            gsap.registerPlugin(InertiaPlugin);
            draggable.current = Draggable.create('.gallery', {
                bounds: '.xpSection__container',
                inertia: true,
                dragResistance: .5,
            })



        }, 1000)



    }, [transition])


    useEffect(() => {


        if (visible) {

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

            const images = Array.from(document.querySelectorAll('.xpSection__container .gallery img'))
            images.forEach(elem => {
                observer.observe(elem)

            })


            return () => {
                images.forEach(elem => {
                    observer.unobserve(elem)
                })
            }
        }


    }, [visible])


    //  .gallery>(.gallery__item*20>img[src="/img/xp/min/$-min.png" alt="gal$-img"])*6
    return <div className={classNames('xpSection', { visible })}>
        <div className="xpSection__container">
            {visible && <h2 className={montserratBold.className}>
                <span>XP.NETWORK</span>
                {/* <p>NFT Bridge</p> */}
                <a target='_blank' className={`xpVisitBtn ${montserratBold.className}`} rel='noopener noreferrer' href="https://xp.network/">Visit</a>

            </h2>}

            <div className="gallery">
                <div className="gallery__item"><img src="/img/xp/min/1-min.png" alt="gal1-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/2-min.png" alt="gal2-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/3-min.png" alt="gal3-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/4-min.png" alt="gal4-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/5-min.png" alt="gal5-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/6-min.png" alt="gal6-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/7-min.png" alt="gal7-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/8-min.png" alt="gal8-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/9-min.png" alt="gal9-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/10-min.png" alt="gal10-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/11-min.png" alt="gal11-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/12-min.png" alt="gal12-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/13-min.png" alt="gal13-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/14-min.png" alt="gal14-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/15-min.png" alt="gal15-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/16-min.png" alt="gal16-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/17-min.png" alt="gal17-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/18-min.png" alt="gal18-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/19-min.png" alt="gal19-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/20-min.png" alt="gal20-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/1-min.png" alt="gal1-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/2-min.png" alt="gal2-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/3-min.png" alt="gal3-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/4-min.png" alt="gal4-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/5-min.png" alt="gal5-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/6-min.png" alt="gal6-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/7-min.png" alt="gal7-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/8-min.png" alt="gal8-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/9-min.png" alt="gal9-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/10-min.png" alt="gal10-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/11-min.png" alt="gal11-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/12-min.png" alt="gal12-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/13-min.png" alt="gal13-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/14-min.png" alt="gal14-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/15-min.png" alt="gal15-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/16-min.png" alt="gal16-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/17-min.png" alt="gal17-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/18-min.png" alt="gal18-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/19-min.png" alt="gal19-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/20-min.png" alt="gal20-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/1-min.png" alt="gal1-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/2-min.png" alt="gal2-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/3-min.png" alt="gal3-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/4-min.png" alt="gal4-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/5-min.png" alt="gal5-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/6-min.png" alt="gal6-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/7-min.png" alt="gal7-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/8-min.png" alt="gal8-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/9-min.png" alt="gal9-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/10-min.png" alt="gal10-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/11-min.png" alt="gal11-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/12-min.png" alt="gal12-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/13-min.png" alt="gal13-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/14-min.png" alt="gal14-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/15-min.png" alt="gal15-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/16-min.png" alt="gal16-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/17-min.png" alt="gal17-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/18-min.png" alt="gal18-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/19-min.png" alt="gal19-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/20-min.png" alt="gal20-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/1-min.png" alt="gal1-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/2-min.png" alt="gal2-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/3-min.png" alt="gal3-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/4-min.png" alt="gal4-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/5-min.png" alt="gal5-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/6-min.png" alt="gal6-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/7-min.png" alt="gal7-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/8-min.png" alt="gal8-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/9-min.png" alt="gal9-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/10-min.png" alt="gal10-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/11-min.png" alt="gal11-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/12-min.png" alt="gal12-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/13-min.png" alt="gal13-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/14-min.png" alt="gal14-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/15-min.png" alt="gal15-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/16-min.png" alt="gal16-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/17-min.png" alt="gal17-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/18-min.png" alt="gal18-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/19-min.png" alt="gal19-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/20-min.png" alt="gal20-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/1-min.png" alt="gal1-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/2-min.png" alt="gal2-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/3-min.png" alt="gal3-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/4-min.png" alt="gal4-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/5-min.png" alt="gal5-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/6-min.png" alt="gal6-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/7-min.png" alt="gal7-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/8-min.png" alt="gal8-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/9-min.png" alt="gal9-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/10-min.png" alt="gal10-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/11-min.png" alt="gal11-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/12-min.png" alt="gal12-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/13-min.png" alt="gal13-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/14-min.png" alt="gal14-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/15-min.png" alt="gal15-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/16-min.png" alt="gal16-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/17-min.png" alt="gal17-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/18-min.png" alt="gal18-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/19-min.png" alt="gal19-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/20-min.png" alt="gal20-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/1-min.png" alt="gal1-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/2-min.png" alt="gal2-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/3-min.png" alt="gal3-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/4-min.png" alt="gal4-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/5-min.png" alt="gal5-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/6-min.png" alt="gal6-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/7-min.png" alt="gal7-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/8-min.png" alt="gal8-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/9-min.png" alt="gal9-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/10-min.png" alt="gal10-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/11-min.png" alt="gal11-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/12-min.png" alt="gal12-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/13-min.png" alt="gal13-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/14-min.png" alt="gal14-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/15-min.png" alt="gal15-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/16-min.png" alt="gal16-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/17-min.png" alt="gal17-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/18-min.png" alt="gal18-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/19-min.png" alt="gal19-img" loading="lazy" /></div>
                <div className="gallery__item"><img src="/img/xp/min/20-min.png" alt="gal20-img" loading="lazy" /></div>
            </div>



        </div>
        {!visible && <h2 className={montserratBold.className}>XP.NETWORK<Loader /></h2>}

    </div>
}

const lazyImages = [
    "/img/xp/min/1-min.png",
    "/img/xp/min/2-min.png",
    "/img/xp/min/3-min.png",
    "/img/xp/min/4-min.png",
    "/img/xp/min/5-min.png",
    "/img/xp/min/6-min.png",
    "/img/xp/min/7-min.png",
    "/img/xp/min/8-min.png",
    "/img/xp/min/9-min.png",
    "/img/xp/min/10-min.png",
    "/img/xp/min/11-min.png",
    "/img/xp/min/12-min.png",
    "/img/xp/min/13-min.png",
    "/img/xp/min/14-min.png",
    "/img/xp/min/15-min.png",
    "/img/xp/min/16-min.png",
    "/img/xp/min/17-min.png",
    "/img/xp/min/18-min.png",
    "/img/xp/min/19-min.png",
    "/img/xp/min/20-min.png",
]

export { XP, lazyImages }
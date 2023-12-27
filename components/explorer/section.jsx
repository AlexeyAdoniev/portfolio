import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Montserrat, Arsenal } from "next/font/google";
//import { Draggable } from '@shopify/draggable';


import { Loader } from '../loader.jsx';

import { MOBILE } from '@/utils.js';


const montserratBold = Montserrat({ subsets: ["latin"], weight: "700" });
const arsenal = Arsenal({ subsets: ["latin"], weight: "400" });


const Explorer = ({ transition }) => {

    const [visible, setVisible] = useState(false)
    const [textHovered, setTextHovered] = useState(false)

    const overlay = useRef(null);


    function setCoords({ clientY, clientX, maxY, maxX, BASE_WINDOW_SIZE_Y, BASE_WINDOW_SIZE_X }) {
        const precentY = ((clientY / window.innerHeight) * 100) - BASE_WINDOW_SIZE_Y / 2

        const limitY = precentY < 0 || precentY > maxY;
        if (limitY) return
        const y1 = precentY;
        const y2 = precentY + BASE_WINDOW_SIZE_Y


        const precentX = ((clientX / window.innerWidth) * 100) - BASE_WINDOW_SIZE_X / 2

        const limitX = precentX < 0 || precentX > maxX;
        if (limitX) return
        const x1 = precentX;
        const x2 = precentX + BASE_WINDOW_SIZE_X


        Object.assign(document.documentElement, {
            style: `
                --tbox-y1: ${y1}%;
                --tbox-y2: ${y2}%;
                --tbox-x1: ${x1}%;
                --tbox-x2: ${x2}%;
               
            `
        })
    }

    function textMouseEnterHandler() {
        setTextHovered(true)
    }

    function textMouseLeaveHandler() {
        setTextHovered(false)
    }


    useEffect(() => {
        if (transition) {
            return void setVisible(false)
        };

        const xyRatio = MOBILE ? .5 : Math.max(window.innerWidth, window.innerHeight) / Math.min(window.innerWidth, window.innerHeight);
        const BASE_WINDOW_SIZE = MOBILE ? 15 : 40;
        const BASE_WINDOW_SIZE_Y = BASE_WINDOW_SIZE;
        const BASE_WINDOW_SIZE_X = BASE_WINDOW_SIZE / xyRatio;
        const maxY = 100 - BASE_WINDOW_SIZE_Y
        const maxX = 100 - BASE_WINDOW_SIZE_X;
        let mobileAnimation



        const mouseHandler = (e) => setCoords({ clientY: e.clientY, clientX: e.clientX, maxY, maxX, BASE_WINDOW_SIZE_Y, BASE_WINDOW_SIZE_X })


        setTimeout(() => {



            if (MOBILE) {
                let x = 0.2;
                let y = 0.2

                let dir = 'down'
                const step = .005
                setCoords({ clientY: window.innerHeight * y, clientX: window.innerWidth * x, maxY, maxX, BASE_WINDOW_SIZE_Y, BASE_WINDOW_SIZE_X })

                const min_y = BASE_WINDOW_SIZE / 100 - .05;
                const max_y = 1 - BASE_WINDOW_SIZE / 100 + .05;
                const min_x = BASE_WINDOW_SIZE_X / 100 - .1;
                const max_x = 1 - BASE_WINDOW_SIZE_X / 100 + .1;

                function move() {
                    const down = dir === 'down';
                    const right = dir === 'right'
                    const up = dir === 'up'
                    const left = dir === 'left'
                    switch (true) {
                        //Down
                        case down && y < max_y: {
                            y += step;
                            return
                        }
                        case down && y >= max_y: {
                            dir = 'right';
                            return
                        }
                        //Right
                        case right && x < max_x: {
                            x += step / xyRatio
                            return
                        }
                        case right && x >= max_x: {
                            dir = 'up';
                            return
                        }
                        //Up
                        case up && y > min_y: {
                            y -= step;
                            return
                        }
                        case up && y <= min_y: {
                            dir = 'left';
                            return
                        }
                        //LEFT
                        case left && x > min_x: {
                            x -= step / xyRatio
                            return
                        }
                        case left && x <= min_x: {
                            dir = 'down';
                            return
                        }
                    }
                }


                mobileAnimation = setInterval(() => {
                    move()
                    requestAnimationFrame(() => setCoords({ clientY: window.innerHeight * y, clientX: window.innerWidth * x, maxY, maxX, BASE_WINDOW_SIZE_Y, BASE_WINDOW_SIZE_X }));
                }, 50)



            } else {
                overlay.current.addEventListener("mousemove", mouseHandler)
                setCoords({ clientY: window.innerHeight * 0.42, clientX: window.innerWidth * 0.72, maxY, maxX, BASE_WINDOW_SIZE_Y, BASE_WINDOW_SIZE_X })
            }


            setVisible(true)




        }, 1000)

        return () => {
            overlay.current.removeEventListener("mousemove", mouseHandler)
            clearInterval(mobileAnimation)
        }
    }, [transition])


    return <div className={classNames("explorerSection", {
        visible
    })}>

        <div className="scence__contaier">
            <div className="video__container">
                <video autoPlay={true} muted={true} preload="auto" loop={true}
                    aria-hidden="true" src="/explorer-video.mp4" playsInline=""></video>
            </div>

            <div className={classNames("overlay", {
                full: textHovered
            })} ref={overlay}>
                {<div className={arsenal.className + " overlay__text"} onMouseEnter={textMouseEnterHandler} onMouseLeave={textMouseLeaveHandler}>
                    <h4 className={montserratBold.className}>Bridge Explorer</h4>
                    <p>Versatile tool to track NFT transfers<br /> between blockchains.<br /></p>{/**Utilizes websocket technology */}
                    <a target='_blank' rel='noopener noreferrer' href="https://explorer.xp.network/">Visit</a>

                </div>}

            </div>

        </div>

        {!visible && <h2 className={montserratBold.className}>Explorer<Loader /></h2>}
    </div>
}



const lazyImages = [

]

export { Explorer, lazyImages }
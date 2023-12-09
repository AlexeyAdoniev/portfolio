import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Montserrat, Arsenal } from "next/font/google";
//import { Draggable } from '@shopify/draggable';


import { Loader } from '../loader.jsx';


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

        setTimeout(() => {

            const xyRatio = Math.max(window.innerWidth, window.innerHeight) / Math.min(window.innerWidth, window.innerHeight);
            const BASE_WINDOW_SIZE = 40;
            const BASE_WINDOW_SIZE_Y = BASE_WINDOW_SIZE;
            const BASE_WINDOW_SIZE_X = BASE_WINDOW_SIZE / xyRatio;
            const maxY = 100 - BASE_WINDOW_SIZE_Y
            const maxX = 100 - BASE_WINDOW_SIZE_X;



            const mouseHandler = (e) => {

                setCoords({ clientY: e.clientY, clientX: e.clientX, maxY, maxX, BASE_WINDOW_SIZE_Y, BASE_WINDOW_SIZE_X })
            }

            overlay.current.addEventListener("mousemove", mouseHandler)

            setCoords({ clientY: window.innerHeight * 0.42, clientX: window.innerWidth * 0.72, maxY, maxX, BASE_WINDOW_SIZE_Y, BASE_WINDOW_SIZE_X })
            setVisible(true)





            return () => {
                overlay.current.removeEventListener("mousemove", mouseHandler)
            }

        }, 1000)

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
                <div className={arsenal.className + " overlay__text"} onMouseEnter={textMouseEnterHandler} onMouseLeave={textMouseLeaveHandler}>
                    <h4 >Bridge Explorer</h4>
                    <p>Versatile tool to track NFT transfers<br /> between blockchains.<br />Utilizes websocket technology</p>
                    <a target='_blank' href="https://explorer.xp.network/">Visit</a>

                </div>

            </div>

        </div>

        {!visible && <h2 className={montserratBold.className}>Explorer<Loader /></h2>}
    </div>
}



const lazyImages = [

]

export { Explorer, lazyImages }
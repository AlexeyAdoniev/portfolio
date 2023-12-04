"use client";
import React, { useEffect, useRef } from 'react';




export const Dfiance = () => {

    let container = useRef(null);

    useEffect(() => {
        const mouseHander = (e) => {
            Object.assign(document.documentElement, {
                style: `
                    --move-x: ${(e.clientX - window.innerWidth / 2) * -.0013}deg;
                    --move-y:${(e.clientY - window.innerHeight / 2) * -.0018}deg
                `
            })
        }


        container.current && document.addEventListener("mousemove", mouseHander)


        return () => {
            document.removeEventListener("mousemove", mouseHander)
        }
    }, [container])


    return <div className='dfiance' ref={(node) => {
        if (node) {
            container.current = node
        }
    }}>
        <div className="layers__container">
            <div className="layers__item layer-1"></div>
            <div className="layers__item layer-2"></div>
            <div className="layers__item layer-3"></div>
            <div className="layers__item layer-4"></div>
            <div className="layers__item layer-5">
                <p>Dfiance is a PVP strategy card game that simulates a clash of two armies on a battlefield</p>
                <a href="https://dfiance.com/">Visit</a>
            </div>

        </div>
    </div>

}
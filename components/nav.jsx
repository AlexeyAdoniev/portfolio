import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import gsap from "gsap";

import { setAbout, setBoardVisibility } from '@/services/store';

const ANIMATION_DURATION = 1000

export const Nav = () => {

    const dispatch = useDispatch()
    const showAbout = useSelector(state => state.global.showAbout)

    const aboutMe = () => {
        if (showAbout) return;
        const flipper = document.querySelector('.flip-wrapper');
        flipper.classList.add('equator')
        gsap.to(".flip-wrapper", {
            transform: `rotateX(-180deg)`,
            duration: ANIMATION_DURATION / 1000,
        });


        setTimeout(() => {
            dispatch(setBoardVisibility(false))
        }, ANIMATION_DURATION / 2.9)

        setTimeout(() => {
            gsap.to(".flip-wrapper", {
                transform: `rotateX(0deg)`,
                duration: 0,
            });

            dispatch(setAbout(true))
            dispatch(setBoardVisibility(true))
        }, ANIMATION_DURATION + 50)

    }

    const home = () => {
        if (!showAbout) return;
        const flipper = document.querySelector('.flip-wrapper');
        flipper.classList.add('equator')
        gsap.to(".flip-wrapper", {
            transform: `rotateX(-180deg)`,
            duration: ANIMATION_DURATION / 1000,
        });


        setTimeout(() => {
            dispatch(setBoardVisibility(false))
        }, ANIMATION_DURATION / 2.9)

        setTimeout(() => {
            gsap.to(".flip-wrapper", {
                transform: `rotateX(0deg)`,
                duration: 0,
            });

            dispatch(setAbout(false))
            dispatch(setBoardVisibility(true))
        }, ANIMATION_DURATION + 50)
    }

    return <nav>
        <ul>
            <li onClick={home}><span >Home</span></li>
            <li onClick={aboutMe} ><span >About Me</span></li>

        </ul>
    </nav>
}
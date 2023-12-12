import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import gsap from "gsap";

import { setAbout } from '@/services/store';

const ANIMATION_DURATION = 1000

export const Nav = () => {

    const dispatch = useDispatch()

    const aboutMe = () => {
        const flipper = document.querySelector('.flip-wrapper');
        flipper.classList.add('equator')
        gsap.to(".flip-wrapper", {
            transform: `rotateX(-180deg)`,
            duration: ANIMATION_DURATION / 1000,
        });


        setTimeout(() => {

            dispatch(setAbout(true))
        }, ANIMATION_DURATION)

    }

    const home = () => {
        const flipper = document.querySelector('.flip-wrapper');
        flipper.classList.add('equator')
        gsap.to(".flip-wrapper", {
            transform: `rotateX(0)`,
            duration: 1,
        });
        dispatch(setAbout(false))
    }

    return <nav>
        <ul>
            <li><span onClick={home}>Home</span></li>
            <li><span onClick={aboutMe}>About Me</span></li>

        </ul>
    </nav>
}
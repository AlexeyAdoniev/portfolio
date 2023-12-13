import React from 'react';
import { Montserrat } from "next/font/google";

import { letterByLetter } from '@/utils';


const montserrat = Montserrat({ subsets: ["cyrillic"], weight: "500" });

export const About = () => {



    return <div className="about-content">

        <div className="about-content__left">
            <div className={"about-content__hello letter-by-letter " + montserrat.className}>{letterByLetter('Hello', { initialDelay: .1 })}<span className="x-clam">!</span></div>
            <h3 className='letter-by-letter'>{letterByLetter('Hey! My name is Alexey', { initialDelay: .2 })}<br /> {letterByLetter('I\’m Frontend and Backend web developer', { initialDelay: .3 })}</h3>
            <div className="about-text__wrapper">
                <p>After graduating from the factory automation faculty, I worked on my specialty for over two years, but then I realized that the digital realm attracts me more. Using my background in engineering, I’ve started to learn programming patterns and various platforms.</p>
                <p>Having dedicated numerous night shifts during my previous job to the Chrome code snippet tab, I was fortunate to secure my initial position at XP.NETWORK, where my progression increased rapidly in both browser and server development.</p>
                <p>Today, I consider myself a solid middle-level developer with strong understanding  of Javascript and Node. </p>
                <p>Certainly, I acknowledge that there is still a lot for me to grasp, particularly in the fundamental areas of computer science and relational databases theory.</p>
                <p>For now, I am looking for new opportunities for my professional growth, which will also help my partners achieve their business goals.</p>
            </div>

        </div>
        <div className="about-content__right">
            <div className="avatarWrapper">

            </div>

            <ul className="social">
                <li><a target='_blank' rel='noopener noreferrer' href="https://www.linkedin.com/in/alexey-adoniev-a04022176/"><img src="/img/linkedin.svg" alt="linkedin" /></a></li>
                <li><a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/alex.adoniev/'><img src="/img/facebook.svg" alt="facebook" /></a></li>
                <li><a className='button' download={true} href='/cv_adoniev.pdf'>Download CV</a></li>

            </ul>

        </div>
    </div>
}
import React from 'react';
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["cyrillic"], weight: "500" });

export const About = () => {



    return <div className="about-content">

        <div className="about-content__left">
            <div class={"about-content__hello " + montserrat.className}>Hello<span class="x-clam">!</span></div>
            <h3>Hey! My name is Alexey,<br /> I’m Frontend and Backend web developer.</h3>
            <p>After graduating Engineering faculty, I worked on my specialty over a year, but then I realized that digital design attracts me more. Since then I have started to do design, using my old knowledge and getting new ones. I’ve completed several courses in graphic design, UI and UX, and continue my self developing working as a web designer for an international company in Tel Aviv.</p>
            <p>I came to design from architecture, and this fact had strong influence on my thinking. Before creating something new, I always think about user friendliness to build the most comfortable and clear user experience. Besides my current work, in my free time I also have my own freelance projects.</p>
            <p>For now I am looking for new opportunities for my professional growth, which will also help my partners achieve their business goals.</p>

        </div>
        <div className="about-content__right"></div>
    </div>
}
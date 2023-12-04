import React, { useState } from 'react';
import classNames from 'classnames';
import { Montserrat } from "next/font/google";

const montserratBold = Montserrat({ subsets: ["latin"], weight: "800" });


const projects = [
    {
        src: "/img/dfiance/thumb.jpg",
        title: "Dfiance.com"
    },
    {
        src: "/img/dfiance/thumb.jpg",
        title: "Dfiance"
    },
    {
        src: "/img/dfiance/thumb.jpg",
        title: "Dfiance"
    }
]


const letterByLetter = (text, {
    duration = 0.2, delay = 0.02, initialDelay = 0
} = {}) => {
    const id = Math.random();
    let slash = false;
    return text ? text.split('').map((l, i) => {
        const className = classNames({ afterSlash: slash })
        if (l === '/') slash = true;
        const animation = `fadeIn ${duration}s ease-out ${initialDelay + (delay * i)}s forwards`
        return <span className={className} style={{ animation }} key={`split-${id}-${i}`}>{l}</span>
    }) : ''
}


export const Projects = () => {

    const [hovered, setHovered] = useState(0)

    const render = () => projects.map((project, idx) => {
        const key = `proj-${idx}`;

        const enterHandler = (e) => {
            setHovered(idx)
        }

        // const leaveHandler = (e) => {
        //     setHovered(null)
        // }

        return <div onMouseEnter={enterHandler} /*onMouseLeave={leaveHandler}*/ key={key} className={classNames('projectSelector__imageWrapper', {
            hovered: idx === hovered,
            shrinked: hovered !== null && idx !== hovered
        })}><img src={project.src} alt={key} /></div>
    })

    const project = typeof hovered !== null ? projects[hovered] : undefined;

    return <div className="projectsWrapper">
        <div className="projectSelector" onMouseLeave={() => setHovered(null)}>
            {render()}
        </div>
        <div className={classNames('projectInfo', { show: project })}>
            <h3 className={`letter-by-letter ${montserratBold.className}`}>{letterByLetter(project?.title)}</h3>
            <p className='letter-by-letter'>{letterByLetter('Technologies:', { initialDelay: .05 })}</p>
            <ul>
                <li className='letter-by-letter'>{letterByLetter('React/Redux', { initialDelay: .09 })}</li>
                <li className='letter-by-letter'>{letterByLetter('Node.js/MongoDB', { initialDelay: .15 })}</li>
                <li className='letter-by-letter'>{letterByLetter('Googleapi', { initialDelay: .3 })}</li>
                <li className='letter-by-letter'>{letterByLetter('Leaflet', { initialDelay: .5 })}</li>
            </ul>
        </div>
    </div>
}
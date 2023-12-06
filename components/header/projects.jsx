import React, { useState } from 'react';
import classNames from 'classnames';
import { Montserrat } from "next/font/google";

import { demos, selectDemo, setTransition } from '@/services/store';

import { useDispatch } from 'react-redux';

const montserratBold = Montserrat({ subsets: ["latin"], weight: "800" });


const projects = [
    {
        src: "/img/dfiance/thumb.jpg",
        title: "Dfiance.com",
        demo: demos.DFIANCE,
        color: 'rgb(179, 135, 26)',
        description: "Card game website with interactive map",
        tech: [
            "React/Redux",
            "Node.js/MongoDB",
            "Google api",
            "Leaflet"
        ]
    },
    {
        src: "/img/xp/preview.png",
        title: "XP.NETWORK",
        demo: demos.XP,
        color: "rgb(145, 25, 21)",
        description: "Company website",
        tech: [
            "Vanilla JS",
            "Express/MongoDB",
            "React/Redux",
        ]
    },
    {
        src: "/img/explorer/preview.png",
        title: "Explorer",
        demo: demos.EXPLORER,
        description: "Explorer tool for NFT Bridge between blockchains",
        color: 'rgb(20, 58, 161)',
        tech: [
            "React/Redux",
            "Node.js/MongoDB",
            "websocket",
            "web3"
        ]
    }
]


/**
 * 
 * background: linear-gradient(45deg, var(--gold), rgb(22, 22, 22));
  background-size: 400%;
  box-shadow: 0 0 5px var(--gold);
 */


const letterByLetter = (text, {
    duration = 0.2, delay = 0.02, initialDelay = 0, color = 'white'
} = {}) => {
    const id = Math.random();
    let afterSlash = false
    return text ? text.split('').map((l, i) => {
        const style = afterSlash ? {
            color,
            WebkitFilter: 'brightness(1.75)'
        } : {}

        if (l === '/') {
            afterSlash = true
        }

        const animation = `fadeIn ${duration}s ease-out ${initialDelay + (delay * i)}s forwards`
        return <span style={{ animation, ...style }} key={`split-${id}-${i}`}>{l}</span>
    }) : ''
}


export const Projects = () => {

    const [hovered, setHovered] = useState(0)
    const dispatch = useDispatch();

    const render = () => projects.map((project, idx) => {
        const key = `proj-${idx}`;

        const enterHandler = () => {
            setHovered(idx)
        }

        const clickHandler = () => {
            if (idx === hovered) {
                dispatch(setTransition(true))
                setTimeout(() => dispatch(selectDemo(project.demo)))
            }
        }

        const className = classNames('projectSelector__imageWrapper', {
            hovered: idx === hovered,
            shrinked: hovered !== null && idx !== hovered
        })

        const getStyle = () => {
            let style = {}
            if (idx === hovered) {
                style = {
                    background: `linear-gradient(45deg, ${project.color}, rgb(22, 22, 22))`,
                    backgroundSize: "400%",
                    boxShadow: `0 0 5px ${project.color}`,
                }
            }
            return style
        }


        return <div onClick={clickHandler} style={getStyle()} onMouseEnter={enterHandler} key={key} className={className}> <img src={project.src} alt={key} /></div >
    })


    const project = typeof hovered !== null ? projects[hovered] : undefined;

    return <div className="projectsWrapper">
        <div className="projectSelector" onMouseLeave={() => setHovered(null)}>
            {render()}
            {project && <div className={classNames('projectInfo', { show: project })}>
                <h3 className={`letter-by-letter ${montserratBold.className}`}>{letterByLetter(project.title)}</h3>
                <p className='prodecDescr letter-by-letter'>{letterByLetter(project.description, { initialDelay: .03 })}</p>
                <p className='letter-by-letter'>{letterByLetter('Technologies:', { initialDelay: .05 })}</p>
                <ul>
                    {project.tech.map((t, i) => {
                        const initialDelay = 0.1 + (i * 0.05);
                        return <li key={`tech-${t}-${i}`} className='letter-by-letter'>{letterByLetter(t, { initialDelay, color: project.color })}</li>
                    })}

                </ul>
            </div>}
        </div>

    </div>
}
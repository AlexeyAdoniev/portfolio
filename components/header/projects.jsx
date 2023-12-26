import React, { useState } from 'react';
import classNames from 'classnames';

import { demos, selectDemo, setTransition } from '@/services/store';

import { useDispatch } from 'react-redux';

import { Montserrat } from "next/font/google";
import { letterByLetter } from '@/utils';

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





export const Projects = () => {

    const [hovered, setHovered] = useState(null)
    const dispatch = useDispatch();

    const render = () => projects.map((project, idx) => {
        const key = `proj-${idx}`;

        const elemHovered = idx === hovered;
        const shrinked = hovered !== null && idx !== hovered;

        const enterHandler = () => {
            setHovered(idx)
        }

        const clickHandler = () => {
            if (elemHovered) {
                dispatch(setTransition(true))
                setTimeout(() => dispatch(selectDemo(project.demo)))
            }
        }



        const className = classNames('projectSelector__imageWrapper', {
            hovered: elemHovered,
            shrinked
        })

        const getStyle = () => {
            let style = {}
            if (elemHovered) {
                style = {
                    background: `linear-gradient(45deg, ${project.color}, rgb(22, 22, 22))`,
                    backgroundSize: "400%",
                    boxShadow: `0 0 5px ${project.color}`,
                }
            }
            return style
        }


        return <div onClick={clickHandler} style={getStyle()} onMouseEnter={enterHandler} key={key} className={className}>
            {(!elemHovered && !shrinked) && <img src="/img/zoom-21.svg" alt="zoom" className='zoonIcon' />}
            <img src={project.src} alt={key} />
        </div >
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
                    <button className="button letter-by-letter" style={{ "--accent": project.color, WebkitFilter: 'brightness(125%)' }} onClick={() => {
                        dispatch(setTransition(true))
                        setTimeout(() => dispatch(selectDemo(project.demo)))
                    }}>{letterByLetter('Demo', { initialDelay: .2 })}</button>

                </ul>

            </div>}
        </div>

    </div>
}
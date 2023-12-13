import React, { useEffect, useRef, useState } from 'react';
import { withServices } from '../hocs/wtihServices';
import { rejectWindowScroll } from '@/utils';
import classNames from 'classnames';


const adaptToScreen = () => {
    switch (true) {
        case window.innerWidth < 1200: {
            return .8
        }
        case window.innerWidth < 1600: {
            return .6
        }
        default: {
            return .7
        }
    }
}


const Snake = ({ serviceContainer }) => {
    const { _snake } = serviceContainer
    const [running, setRunning] = useState(false);
    const [pushedArrow, setPushed] = useState(null);




    let container = useRef(null);
    let snake = useRef(null);
    let keyHandler = useRef(null)

    const pushHandler = (e) => setPushed(() => e.code)

    const releaseHandler = (e) => setPushed(() => null)

    const unmount = (tm) => {
        snake.current?.stop();
        container.current?.replaceChildren();
        window.removeEventListener("keydown", keyHandler.current);
        window.removeEventListener("keydown", pushHandler);
        window.removeEventListener("keyup", releaseHandler);
        window.removeEventListener("keydown", rejectWindowScroll, false);
        tm && clearTimeout(tm)
    }

    const mount = () => {
        const rectangle = container.current.getBoundingClientRect();

        snake.current = _snake.init({ size: Math.ceil(rectangle.width * adaptToScreen() / 50) * 50 });
        container.current.append(snake.current.canvas());
        keyHandler.current = (e) => {
            snake.current.input(e);
        }
        window.addEventListener("keydown", keyHandler.current);
        window.addEventListener("keydown", pushHandler);
        window.addEventListener("keyup", releaseHandler);
        window.addEventListener("keydown", rejectWindowScroll, false);

    }


    useEffect(() => {
        const tm = setTimeout(mount, 100);
        return () => unmount(tm)
    }, [])



    const startHandler = () => {
        if (running) {
            unmount();
            mount();
        }
        setRunning(true)
        snake.current.start();
    }


    return <><div className="snakeWrapper" ref={container}>
    </div>

        <div className="snake-controls">
            <button className='button snake-start' onClick={startHandler}>{!running ? 'START' : 'RESTART'}</button>
            <div className="arrows">
                <div className="top">
                    <div onClick={() => keyHandler.current && keyHandler.current({ code: 'ArrowUp' })} className={classNames("controls-button", { active: pushedArrow === 'ArrowUp' })}>
                        <i className="fa-solid fa-arrow-up"></i>
                    </div>

                </div>
                <div className="bot">
                    <div onClick={() => keyHandler.current && keyHandler.current({ code: 'ArrowLeft' })} className={classNames("controls-button", { active: pushedArrow === 'ArrowLeft' })}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <div onClick={() => keyHandler.current && keyHandler.current({ code: 'ArrowDown' })} className={classNames("controls-button", { active: pushedArrow === 'ArrowDown' })}>
                        <i className="fa-solid fa-arrow-down"></i>
                    </div><div onClick={() => keyHandler.current && keyHandler.current({ code: 'ArrowRight' })} className={classNames("controls-button", { active: pushedArrow === 'ArrowRight' })}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>

                </div>
            </div>

        </div>

    </>
}

export default withServices(Snake)


import React, { useEffect, useRef, useState } from 'react';
import { withServices } from '../hocs/wtihServices';
import { rejectWindowScroll } from '@/utils';





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

        snake.current = _snake.init({ size: Math.ceil(rectangle.width * .8 / 50) * 50 });
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
            <button onClick={startHandler}>{!running ? 'START' : 'RESTART'}</button>
            <div className="arrows">
                <div className="top">
                    <img src={pushedArrow === 'ArrowUp' ? "/img/key_pushed.png" : "/img/key_idle.png"} alt="idle_top" />
                </div>
                <div className="bot">
                    <img src={pushedArrow === 'ArrowLeft' ? "/img/key_pushed.png" : "/img/key_idle.png"} alt="idle_top" />
                    <img src={pushedArrow === 'ArrowDown' ? "/img/key_pushed.png" : "/img/key_idle.png"} alt="idle_top" />
                    <img src={pushedArrow === 'ArrowRight' ? "/img/key_pushed.png" : "/img/key_idle.png"} alt="idle_top" />
                </div>
            </div>

        </div>

    </>
}

export default withServices(Snake)


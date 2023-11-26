import React, { useEffect, useRef } from 'react';
import { withServices } from '../hocs/wtihServices';

const Snake = ({ serviceContainer }) => {
    const { _snake } = serviceContainer

    let container = useRef(null)
    useEffect(() => {
        let snake;
        let keyHandler;
        const tm = setTimeout(() => {
            //const rectangle = container.current.getBoundingClientRect();
            snake = _snake.init({ size: 300 });
            container.current.append(snake.canvas());
            snake.start()
            keyHandler = (e) => snake.input(e)
            window.addEventListener("keydown", keyHandler);
            //setTimeout(() => snake.stop(), 10_000)
        }, 100);


        return () => {
            snake?.stop()
            window.removeEventListener("keydown", keyHandler);
            clearTimeout(tm)
        }
    }, [])

    return <div className="snakeWrapper" ref={container}>
    </div>
}

export default withServices(Snake)


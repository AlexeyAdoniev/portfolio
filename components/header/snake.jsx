import React, { useEffect, useRef } from 'react';
import { withServices } from '../hocs/wtihServices';

const Snake = ({ serviceContainer }) => {
    const { _snake } = serviceContainer

    let container = useRef(null)



    useEffect(() => {
        let keyHandler;
        const tm = setTimeout(() => {
            const rectangle = container.current.getBoundingClientRect();
            const snake = _snake.init({ size: rectangle.width * .9 });
            container.current.append(snake.canvas());
            snake.start()
            keyHandler = (e) => snake.input(e)
            window.addEventListener("keydown", keyHandler);
            //setTimeout(() => snake.stop(), 10_000)
        }, 100);


        return () => {
            window.removeEventListener("keydown", keyHandler);
            clearTimeout(tm)
        }
    }, [])




    return <div className="snakeWrapper" ref={container}>

    </div>
}


export default withServices(Snake)


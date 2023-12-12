"use client";


import { useEffect, useRef } from "react";
import gsap from "gsap";

import store from "@/services/store";
import { Provider, useSelector } from "react-redux";

import { Nav } from "@/components/nav";

import Flipper from "./flipper";

import { ServiceProvider } from "@/components/hocs/serviceProvider";
import { init } from "@/services/snake";

import { Board } from "./board";
import { About } from "./about";


const ROTATION_THROTTLE_RATE = 12;




function Header() {
    let header = useRef(null);
    let headerInView = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (header) {
                    if (!entry.isIntersecting) {
                        headerInView.current = false;
                    } else {
                        headerInView.current = true;
                    }
                }
            },
            {
                root: null,
            }
        );
        observer.observe(header);

        return () => {
            observer.unobserve(header);
        };
    }, [header.current]);

    useEffect(() => {
        const updateHeaderAnimation = () => {
            const { scrollY } = window;
            const flipper = document.querySelector('.flip-wrapper');
            flipper.classList.remove('equator')
            gsap.to(".flip-wrapper", {
                transform: `rotateX( ${-scrollY / ROTATION_THROTTLE_RATE}deg )`,
                duration: 1,
            });
        };
        const scrollHandler = () => {
            if (headerInView.current) {
                requestAnimationFrame(updateHeaderAnimation);
            }
        };
        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);


    const showAbout = useSelector(state => state.global.showAbout)
    const boardVisibility = useSelector(state => state.global.boardVisibility)

    return (

        <header
            ref={(node) => {
                if (node) {
                    header = node;
                }
            }}
        >
            <div className="top-line">
                <Nav />
            </div>
            <Flipper boardVisibility={boardVisibility}>
                {showAbout ? <About /> : <Board />}
            </Flipper>
        </header>



    );
}

export default () => {
    const serviceContainer = {
        _snake: { init },
    };

    return <ServiceProvider value={{ serviceContainer }}>
        <Provider store={store}>
            <Header />
        </Provider>
    </ServiceProvider>

}

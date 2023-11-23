"use client";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import store from "@/services/store";
import { Provider } from "react-redux";

import { Nav } from "@/components/nav";
import { HeaderMenu } from "@/components/header/header-menu";
import { MenuContent } from "./menu-content";

import { ServiceProvider } from "@/components/hocs/serviceProvider";
import { init } from "@/services/sanke";

const montserrat = Montserrat({ subsets: ["cyrillic"], weight: "700" });

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

    return (
        <main className="home">
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
                <div className="container flip-wrapper">
                    <div className="board main-border">
                        <div className="board-head">
                            <div className="tricolor">
                                <div className="tricolor_item tricolor_item__red"></div>
                                <div className="tricolor_item tricolor_item__yellow"></div>
                                <div className="tricolor_item tricolor_item__green"></div>
                            </div>
                            <img className="signed-user" src="data:image/png;base64,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" />
                        </div>
                        <div className="board-content">
                            <div className="board-content_text">
                                <a href="https://github.com/AlexeyAdoniev" target="_blank">
                                    <span>Github Profile</span>
                                    <Image
                                        src="/img/arrow-right.svg"
                                        width={14}
                                        height={10}
                                        alt="link arrow"
                                    />
                                </a>
                                <h1 className={montserrat.className}>
                                    Alexey
                                    <br /> Adoniev
                                </h1>
                                <p>Passionate developer and web artist</p>
                            </div>
                            <div className="board-content_interactive ">
                                <div className="search-bar"></div>
                                <div className="interactive-menu main-border">
                                    <div className="interactive-menu_sidebar">
                                        <div className="glare"></div>
                                        <HeaderMenu />
                                    </div>
                                    <div className="interactive-menu_content">
                                        <MenuContent />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* <section style={{ height: "200vh" }}>
                <a href="https://www.flaticon.com/free-icons/equipment" title="equipment icons">Equipment icons created by Firststyles - Flaticon</a>
            </section>*/}
        </main>
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

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

            <section style={{ height: "200vh" }}>
                <a href="https://www.flaticon.com/free-icons/equipment" title="equipment icons">Equipment icons created by Firststyles - Flaticon</a>
            </section>
        </main>
    );
}

export default () => {


    return <Provider store={store}>
        <Header />
    </Provider>
}

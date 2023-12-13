"use client";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import { HeaderMenu } from "@/components/header/header-menu";
import { MenuContent } from "./menu-content";



const montserrat = Montserrat({ subsets: ["cyrillic"], weight: "700" });



export const Board = () => {



    return <div className="board-content">
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
            <p>Passionate developer<br /> and web artist</p>
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
}
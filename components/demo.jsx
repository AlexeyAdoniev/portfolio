"use client"
import React, { useEffect, useRef, useMemo } from 'react';

import { Dfiance, lazyImages as dfianceLazyImages } from "@/components/dfiance/section";
import { XP, lazyImages as xpLazyImages } from "@/components/xp/section";

import { useSelector, useDispatch } from 'react-redux';

import store from "@/services/store";
import { Provider } from "react-redux";
import { demos, setTransition, selectDemo } from '@/services/store';

import { EMPTY_RENDER, doScrolling, preloadImage } from '@/utils';


const SCROLL_DURATION = 1200;

const projects = {
    [demos.DFIANCE]: { render: Dfiance, lazyLoad: dfianceLazyImages },
    [demos.XP]: { render: XP, lazyLoad: xpLazyImages },
}


const ProjectDemo = () => {

    const dispatch = useDispatch()

    const demo = /*demos.XP ||*/ useSelector(state => state.global.demo)
    const transition = useSelector(state => state.global.transition);
    const project = projects[demo];
    const Content = useMemo(() => project ? project.render : EMPTY_RENDER, [demo])


    let container = useRef(null)


    const exitDemo = () => {
        const scrollTo = 0;
        dispatch(setTransition(true))
        doScrolling(scrollTo, SCROLL_DURATION).then(() => {
            dispatch(selectDemo(null))
            dispatch(setTransition(false))
        })
    }

    useEffect(() => {

        const project = projects[demo];
        if (project) {

            const scrollUp = (e) => {
                if (e.deltaY < 0) {
                    exitDemo()
                }
                //window.removeEventListener("wheel", scrollUp);
            }

            const section = container.current;

            if (!section) return;
            const scrollTo = window.scrollY + section.getBoundingClientRect().top

            Promise.all([
                doScrolling(scrollTo, SCROLL_DURATION),
                Promise.all(project.lazyLoad.map((item) => preloadImage(item)))
            ]).then(() => {
                dispatch(setTransition(false))
                window.addEventListener("wheel", scrollUp)
            })

            return () => {

                window.removeEventListener("wheel", scrollUp)
            }

        }
    }, [demo])

    return <section id="project" ref={container}>
        {demo && !transition && <div class="scroll-up" >
            <div class="mousey" onClick={exitDemo}>
                <div class="scroller"></div>
            </div>
        </div>}
        <Content transition={transition} />
    </section>
}

export default () => <Provider store={store}>
    <ProjectDemo />
</Provider>
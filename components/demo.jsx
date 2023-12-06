"use client"
import React, { useEffect, useRef, useMemo } from 'react';

import { Dfiance, lazyImages as dfianceLazyImages } from "@/components/dfiance/section";
import { XP, lazyImages as xpLazyImages } from "@/components/xp/section";

import { useSelector, useDispatch } from 'react-redux';

import store from "@/services/store";
import { Provider } from "react-redux";
import { demos, setTransition } from '@/services/store';

import { EMPTY_RENDER, doScrolling, preloadImage } from '@/utils';


const projects = {
    [demos.DFIANCE]: { render: Dfiance, lazyLoad: dfianceLazyImages },
    [demos.XP]: { render: XP, lazyLoad: xpLazyImages },
}


const ProjectDemo = () => {

    const dispatch = useDispatch()

    const demo = demos.XP || useSelector(state => state.global.demo)
    const transition = useSelector(state => state.global.transition);
    console.log(demo)
    const project = projects[demo];
    const Content = useMemo(() => project ? project.render : EMPTY_RENDER, [demo])


    let container = useRef(null)

    useEffect(() => {
        const project = projects[demo];
        if (project) {
            const section = container.current;

            if (!section) return;
            const scrollTo = window.scrollY + section.getBoundingClientRect().top
            doScrolling(scrollTo, 1200)
            console.log('x')
            Promise.all(project.lazyLoad.map((item) => preloadImage(item))).then(() => {
                dispatch(setTransition(false))
            })


        }
    }, [demo])

    return <section id="project" ref={container}>
        <Content transition={transition} />
    </section>
}

export default () => <Provider store={store}>
    <ProjectDemo />
</Provider>
"use client"
import React, { useEffect, useRef } from 'react';

import { Dfiance, lazyImages as dfianceLazyImages } from "@/components/dfiance/section";

import { useSelector, useDispatch } from 'react-redux';

import store from "@/services/store";
import { Provider } from "react-redux";
import { demos, setTransition } from '@/services/store';

import { EMPTY_RENDER, doScrolling, preloadImage } from '@/utils';


const components = {
    [demos.DFIANCE]: Dfiance,
}


const ProjectDemo = () => {

    const dispatch = useDispatch()

    const demo = useSelector(state => state.global.demo);

    const Content = components[demo] ? React.memo(components[demo]) : EMPTY_RENDER

    let container = useRef(null)

    useEffect(() => {
        if (components[demo]) {
            const section = container.current;

            if (!section) return;
            const scrollTo = window.scrollY + section.getBoundingClientRect().top
            //wait for biggest images to load
            Promise.all(dfianceLazyImages.map((item) => preloadImage(item))).then(async () => {
                await doScrolling(scrollTo, 1200)
                console.log('done scrolling')
                dispatch(setTransition(false))
            })

        }
    }, [demo])

    return <section id="project" ref={container}>
        <Content />
    </section>
}

export default () => <Provider store={store}>
    <ProjectDemo />
</Provider>
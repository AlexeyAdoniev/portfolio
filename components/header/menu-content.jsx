import React from 'react';
import { useSelector } from 'react-redux'

import { menuItems } from '@/services/store';
import { Projects } from './projects';
import { Signature } from './signature';
import Snake from './snake'
import { EMPTY_RENDER } from '@/utils';


const components = {
    [menuItems.PROJECTS]: Projects,
    [menuItems.SIGNATURE]: Signature,
    [menuItems.SNAKE]: Snake,
    // [menuItems.DEFAULT]: () => {
    //     useEffect(() => {
    //         const section = document.getElementById("project")
    //         if (!section) return;
    //         const scrollTo = window.scrollY + section.getBoundingClientRect().top
    //         doScrolling(scrollTo, 2000)
    //     }, [])
    //     return ''
    // }
}



export const MenuContent = () => {

    const activeMenuItem = useSelector(state => state.global.activeMenuItem);


    const Content = React.useMemo(components[activeMenuItem] ? () => components[activeMenuItem] : EMPTY_RENDER, [activeMenuItem])


    return <Content />
}
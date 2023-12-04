import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'

import { menuItems } from '@/services/store';
import { Signature } from './signature';
import Snake from './snake'
import { doScrolling } from '@/utils';


const components = {
    [menuItems.SIGNATURE]: Signature,
    [menuItems.SNAKE]: Snake,
    [menuItems.DEFAULT]: () => {
        useEffect(() => {
            const section = document.getElementById("project")
            const scrollTo = window.scrollY + section.getBoundingClientRect().top
            doScrolling(scrollTo, 2000)
        }, [])
        return ''
    }
}

const EMPTY_RENDER = () => ''

export const MenuContent = () => {

    const activeMenuItem = useSelector(state => state.global.activeMenuItem);

    const Content = components[activeMenuItem] ? React.memo(components[activeMenuItem]) : EMPTY_RENDER

    return <Content />
}
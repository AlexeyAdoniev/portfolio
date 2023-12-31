

import React from 'react';
import Image from "next/image";
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux'
import { selectMenuItem, menuItems, toggleHamburger } from '@/services/store';



export const items = [
    {
        icon: () => <Image
            src="/img/figma.svg"
            width={14}
            height={14}
            alt="svg icon"
        />,
        text: 'My Projects',
        content: menuItems.PROJECTS
    },
    {
        icon: () => 'S',
        text: 'Leave a Signature',
        content: menuItems.SIGNATURE
    },
    {
        icon: () => <Image
            src="/img/snake-icon.svg"
            width={14}
            height={14}
            alt="link arrow"
        />,
        text: 'Play Snake',
        content: menuItems.SNAKE
    }
]

export const HeaderMenu = () => {

    const dispatch = useDispatch()
    const activeMenuItem = useSelector(state => state.global.activeMenuItem);
    const expandHamburgerMenu = useSelector(state => state.global.expandHamburgerMenu);


    const clickHandler = (item) => {
        expandHamburgerMenu && dispatch(toggleHamburger())
        dispatch(selectMenuItem(item.content))
    }


    const rednerMenu = () => items.map((item, index) => {

        const active = item.content === activeMenuItem;

        return <li className={classNames('menu-item', {
            active
        })} onClick={() => clickHandler(item)} key={`hmi-${index}`}>
            <div className="menu_button">{item.icon()}</div>
            <span>{item.text}</span>
        </li>
    })

    return <ul>
        {rednerMenu()}
    </ul>
}


import React from 'react';
import Image from "next/image";
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux'
import { selectMenuItem, menuItems } from '@/services/store';



const items = [
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
    },
    {
        icon: () => 'D',
        text: 'Dfiance',
        content: menuItems.DEFAULT
    }
]

export const HeaderMenu = () => {

    const dispatch = useDispatch()
    const activeMenuItem = useSelector(state => state.global.activeMenuItem);


    const rednerMenu = () => items.map((item, index) => {

        const active = item.content === activeMenuItem;

        return <li className={classNames('menu-item', {
            active
        })} onClick={() => dispatch(selectMenuItem(item.content))} key={`hmi-${index}`}>
            <div className="menu_button">{item.icon()}</div>
            <span>{item.text}</span>
        </li>
    })

    return <ul>
        {rednerMenu()}
    </ul>
}

import React from 'react';
import { items } from './header-menu'
import { useDispatch, useSelector } from 'react-redux'
import { toggleHamburger } from '@/services/store';

export const MobileMenu = () => {

    const dispatch = useDispatch()
    const activeMenuItem = useSelector(state => state.global.activeMenuItem);
    const item = items.find(item => item.content === activeMenuItem);

    const hamburgerClickHandler = () => {
        dispatch(toggleHamburger())
    }

    return item && <div className="mobile-interactive-menu">
        <div className="menu-item active-item">
            <div className="menu_button">{item.icon()}</div>
            <span>{item.text}</span>
        </div>
        <div className="hamburger-menu" onClick={hamburgerClickHandler}>
            <div className="icon">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
}
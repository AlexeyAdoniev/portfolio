import React from 'react';
import { items } from './header-menu'
import { useDispatch, useSelector } from 'react-redux'
import { selectMenuItem, menuItems } from '@/services/store';

const MobileMenu = () => {

    const dispatch = useDispatch()
    const activeMenuItem = useSelector(state => state.global.activeMenuItem);

    return <div className="mobile-interactive-menu">

    </div>
}
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { menuItems } from '@/services/store';
import { Signature } from './signature';


const components = {
    [menuItems.SIGNATURE]: Signature
}

const EMPTY_RENDER = () => ''

export const MenuContent = () => {

    const activeMenuItem = useSelector(state => state.global.activeMenuItem);

    const Content = components[activeMenuItem] ? React.memo(components[activeMenuItem]) : EMPTY_RENDER

    return <Content />
}
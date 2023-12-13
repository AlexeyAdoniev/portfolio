import React from 'react';

import { Loader } from './loader';



export const SiteLoader = () => {



    return <div className="siteLoader">
        <div className="siteloader__container">

            <img src="/img/logo.png" alt="logo" />
            <Loader />

        </div>
    </div>
}
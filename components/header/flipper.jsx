import React from 'react';
import { SignatureList } from "@/components/header/signature/signatureList";
import classNames from 'classnames';


const Flipper = ({ children, boardVisibility }) => {
    //boardVisibility
    return <div className="container flip-wrapper ">

        <div className={"board main-border"}>
            <div className={classNames("board-content-wrapper", {
                visible: boardVisibility
            })}>
                <SignatureList />
                <div className="board-head">
                    <div className="tricolor">
                        <div className="tricolor_item tricolor_item__red"></div>
                        <div className="tricolor_item tricolor_item__yellow"></div>
                        <div className="tricolor_item tricolor_item__green"></div>
                    </div>

                </div>
                {children}
            </div>
        </div>
    </div>
}

export default Flipper
import React from "react";

import { ServiceConsumer } from "./serviceProvider";

const withServices = (Wrapped) =>
    function CallBack(props) {
        return (
            <ServiceConsumer>
                {({ serviceContainer }) => (
                    <Wrapped
                        {...props}
                        serviceContainer={serviceContainer}
                    />
                )}
            </ServiceConsumer>
        );
    };

export { withServices };

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSignatures } from '@/services/store'


const OFFSET = 8;

const SignatureList = () => {

    const dispatch = useDispatch();
    const [showLoader, setLoader] = useState(false);
    const [cutIndex, setCutIndex] = useState(0)

    const data = useSelector(state => state.global.signatures)



    useEffect(() => {
        //if (!data?.length) return
        const tm = setTimeout(() => {
            false && fetch('/api/signature').then(res => res.json()).then((res) => {
                Array.isArray(res.result) && dispatch(setSignatures([...res.result]));
            }).catch(() => {
                //TODO
            })
        }, 100)
        return () => {
            clearTimeout(tm)
        }
    }, [])


    useEffect(() => {
        if (data.length) {
            const cotainerHeight = document.querySelector('.board').getBoundingClientRect().height;

            const itemSize = document.querySelector('.signatureContainer').getBoundingClientRect().height;

            const signatureLimit = cotainerHeight * .8;

            const signaturesHeight = itemSize * data.length - OFFSET * data.length;

            const overflow = signaturesHeight > signatureLimit;

            if (overflow) {
                const slicedAmount = Math.ceil((signaturesHeight - signatureLimit) / itemSize);
                setCutIndex(slicedAmount)

            }
        }
    }, [data])



    const renderSignatures = () => data.slice(cutIndex).map((item, idx) => {

        return <div /*onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}*/ key={`sig-${idx}`} className="signatureContainer" style={{ marginTop: `-${OFFSET}px` }}>
            <img style={{ backgroundColor: item.color }} src={item.signature} alt={`sig-${idx}`} />
        </div>
    })


    return <aside >
        <div className="signatureWrapper">
            {renderSignatures()}

        </div>
        {Boolean(cutIndex) && <div className="hiddenSignatures">
            +{cutIndex}
        </div>}
    </aside>

}


export { SignatureList }
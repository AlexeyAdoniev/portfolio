import React, { useEffect, useState } from 'react';


const OFFSET = 4;

const SignatureList = () => {

    const [showLoader, setLoader] = useState(false);
    const [data, setData] = useState([])
    const [cutIndex, setCutIndex] = useState(0)


    useEffect(() => {
        const tm = setTimeout(() => {
            fetch('/api/signature').then(res => res.json()).then((data) => {

                Array.isArray(data.result) && setData(data.result)


            })
        }, 100)
        return () => {
            clearTimeout(tm)
        }
    }, [])


    useEffect(() => {
        if (data.length) {
            const cotainerHeight = document.querySelector('.board').getBoundingClientRect().height;
            console.log(cotainerHeight, 'cotainerHeight')
            const itemSize = document.querySelector('.signatureContainer').getBoundingClientRect().height;

            const signatureLimit = cotainerHeight * .8;
            console.log(signatureLimit, 'signatureLimit')
            const signaturesHeight = itemSize * data.length - OFFSET * data.length;  //itemSize * data.length - OFFSET * data.length;  //
            console.log(signaturesHeight, 'signaturesHeight')
            const overflow = signaturesHeight > signatureLimit;
            if (overflow) {
                const slicedAmount = Math.ceil((signaturesHeight - signatureLimit) / itemSize);
                setCutIndex(slicedAmount)

            }
        }
    }, [data])

    const handleMouseEnter = (e) => {
        e.target.parentElement.classList.add('hovered')
    }

    const handleMouseLeave = (e) => {
        e.target.parentElement.classList.remove('hovered')
    }


    const renderSignatures = () => data.slice(cutIndex).map((item, idx) => {

        return <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={`sig-${idx}`} className="signatureContainer" style={{ margin: `-${OFFSET}px` }}>
            <img style={{ backgroundColor: item.color }} src={item.signature} alt={`sig-${idx}`} />
        </div>
    })

    // console.log(data, 'slicedData')
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
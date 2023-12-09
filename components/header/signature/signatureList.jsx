import React, { useEffect, useState } from 'react';



const SignatureList = () => {

    const [showLoader, setLoader] = useState(false);
    const [data, setData] = useState([])

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


    const renderSignatures = () => data.map((item, idx) => <div key={`sig-${idx}`} className="signatureContainer">
        <img className='signed-user' style={{ backgroundColor: item.color }} src={item.signature} alt={`sig-${idx}`} />
    </div>)


    return <aside>
        {renderSignatures()}
    </aside>
}


export { SignatureList }
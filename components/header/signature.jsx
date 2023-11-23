import React, { useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';
import trimCanvas from 'trim-canvas'


function getTrimmedSignature(signaturePad) {
    const dublicate = document.createElement('canvas');
    dublicate.width = signaturePad.canvas.width
    dublicate.height = signaturePad.canvas.height
    dublicate.getContext('2d').drawImage(signaturePad.canvas, 0, 0);
    trimCanvas(dublicate);
    return dublicate.toDataURL();
}


export const Signature = () => {

    let signaturePad = useRef(null);

    useEffect(() => {
        signaturePad.current = new SignaturePad(document.querySelector("canvas"));
    }, [])

    const clearHandler = () => {
        if (signaturePad.current) {
            signaturePad.current.clear()
        }
    }

    const signHandler = () => {
        if (signaturePad.current) {
            const data = getTrimmedSignature(signaturePad.current);
            signaturePad.current.clear()
            console.log(data);
        }
    }

    return <div className="signatureWrapper">
        <canvas id='signature' className='main-border'></canvas>
        <div className="controls">
            <button onClick={clearHandler}>Clear</button>
            <button onClick={signHandler}>Sign</button>
        </div>
    </div>
}
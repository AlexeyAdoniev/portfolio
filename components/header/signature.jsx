import React, { useEffect } from 'react';
import SignaturePad from 'signature_pad';


export const Signature = () => {


    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const signaturePad = new SignaturePad(canvas);
        console.log(signaturePad);
    }, [])


    return <div className="signatureWrapper main-border ">
        <canvas id='signature'></canvas>
    </div>
}
import React, { useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';
import trimCanvas from 'trim-canvas'

//import { wait } from '@/utils';


function getTrimmedSignature(signaturePad) {
    const dublicate = document.createElement('canvas');
    dublicate.width = signaturePad.canvas.width
    dublicate.height = signaturePad.canvas.height
    dublicate.getContext('2d').drawImage(signaturePad.canvas, 0, 0);
    trimCanvas(dublicate);
    return dublicate.toDataURL();
}


function saveSignature(signaturePad) {
    return fetch('/api/signature', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "*/*"
        },
        body: JSON.stringify({ signature: getTrimmedSignature(signaturePad) })
    }).then((res) => {
        if (res.status === 500) {
            throw new Error(res.status)
        }
        return res.json()
    })
}

function handleSaved(data) {
    console.log(data, 'data');
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
            signaturePad.current.clear();

            saveSignature(signaturePad.current).then(handleSaved).catch(async () => {
                //await wait(5000)
                //saveSignature(signaturePad.current).catch(() => { })

            })
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
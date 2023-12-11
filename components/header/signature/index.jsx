import React, { useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';
import trimCanvas from 'trim-canvas'

import { COLORS } from '@/utils'

import { useDispatch, useSelector } from 'react-redux';

import { setSignatures } from '@/services/store'



function getTrimmedSignature(signaturePad) {
    const dublicate = document.createElement('canvas');
    dublicate.width = signaturePad.canvas.width
    dublicate.height = signaturePad.canvas.height
    dublicate.getContext('2d').drawImage(signaturePad.canvas, 0, 0);
    trimCanvas(dublicate);
    return dublicate.toDataURL();
}


function transferIcon({ signature, color }) {

    return new Promise(resolve => {
        const startPoint = document.getElementById('signature').getBoundingClientRect();
        const { left: x1, top: y1 } = startPoint
        const endPoint = document.querySelector('.board aside .signatureWrapper').getBoundingClientRect();
        const { left: x2, top: y2 } = endPoint;

        const deltaX = x2 - x1;
        const deltaY = y2 - y1;


        // document.querySelector('.canvasWrapper img');

        const sigGhost = document.querySelector('.canvasWrapper img');
        sigGhost.src = signature
        sigGhost.onload = function () {
            sigGhost.classList.add('transfered')
            sigGhost.style.backgroundColor = color;
            sigGhost.style.transform = `translate(${deltaX + 10}px, ${deltaY - 15}px)`;
            setTimeout(() => {
                const canvasWrapper = document.querySelector(".canvasWrapper");
                sigGhost.remove()
                const next = document.createElement("img");
                next.classList.add('sigGhost')
                canvasWrapper.insertAdjacentElement("afterbegin", next)
                resolve(true)
            }, 500)
        }




    })








}


function saveSignature(signature) {

    return fetch('/api/signature', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "*/*"
        },
        body: JSON.stringify(signature)
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

function resizeCanvas() {
    const canvas = document.getElementById('signature');
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);

}


export const Signature = () => {

    let signaturePad = useRef(null);
    const dipatch = useDispatch()
    const signatures = useSelector(state => state.global.signatures)

    useEffect(() => {
        signaturePad.current = new SignaturePad(document.querySelector("canvas"), {
            minWidth: 1,
            maxWidth: 4,
        });
        resizeCanvas();

        const resizeHandler = () => {
            resizeCanvas()
            signaturePad.current.clear()
        }

        window.addEventListener("resize", resizeHandler)

        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    }, [])

    const clearHandler = () => {
        if (signaturePad.current) {
            signaturePad.current.clear()
        }
    }

    const signHandler = async () => {
        if (signaturePad.current) {
            const base64 = getTrimmedSignature(signaturePad.current)

            signaturePad.current.clear();
            const signature = { signature: base64, color: COLORS.random() }
            await transferIcon(signature)
            console.log(signature)
            dipatch(setSignatures([...signatures, signature]))
            false && saveSignature(signature).then(handleSaved).catch(async () => {
                //await wait(5000)
                //saveSignature(signaturePad.current).catch(() => { })

            })
        }
    }

    return <div className="signatureWrapper">


        <div className="canvasWrapper">
            <img src="" alt="" className='sigGhost' />
            <canvas id='signature' className='main-border'>
            </canvas>

        </div>
        <div className="controls">
            <button onClick={clearHandler}>Clear</button>
            <button onClick={signHandler}>Sign</button>
        </div>
    </div>
}
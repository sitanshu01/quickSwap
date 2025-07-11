import React from 'react'
import gsap from 'gsap';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Power4 } from "gsap/all"; // or from "gsap/EasePack"
gsap.registerPlugin(Power4);

const Cursor = () => {
    const cursorRef = useRef();
    const prevX = useRef(0);
    const prevY = useRef(0);
    const prevTime = useRef(performance.now());

    useEffect(() => {
    const handleMousemove = (e) => {
        const { clientX, clientY } = e;
        const currentTime = performance.now();

        const dx = clientX - prevX.current;
        const dy = clientY - prevY.current;
        const dt = currentTime - prevTime.current;

        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = dist / dt; 
        prevX.current = clientX;
        prevY.current = clientY;
        prevTime.current = currentTime;

        gsap.to(cursorRef.current, {
        x: clientX ,
        y: clientY-10,
        backgroundColor : `rgb(${speed*(Math.random()*60)}, ${speed*(Math.random()*60)}, ${speed*(Math.random()*60)})`,
        width : `${speed*10}px`,
        height : `${speed*10}px`,
        duration: 0.2,
        ease: "power4.out",
        });
    };

    window.addEventListener("mousemove", handleMousemove);
    return () => {
        window.removeEventListener("mousemove", handleMousemove);
    };
    }, []);

  return (
    <div ref={cursorRef} className='pointer-events-none fixed min-h-[10px] min-w-[10px] rounded-full border-white border-2 z-50'/>
  )
}

export default Cursor

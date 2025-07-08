import React, {  useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import {ScrambleTextPlugin} from 'gsap/ScrambleTextPlugin'

const btnType ={
    register: "bg-zinc-600 hover:bg-zinc-300 hover:text-zinc-800 rounded-md font-poppins ",
    normal: "rounded-xl font-poppins text-zinc-100",
}
const isGlow = {
    glow : "shadow-[0_0_20px_rgba(255,255,255,0.35)]",
}

const btnSize ={
    small : "px-2 py-1 text-lg font-light",
    medium : "px-7 py-3 text-xl font-medium",
    large: "px-10 py-5 text-3xl font-medium",
}

const Button = ({type, text, glow, size}) => {
    const btnRef = useRef();
    const textRef = useRef();
    gsap.registerPlugin(ScrambleTextPlugin) ;
    let i=1;
    const mouseEnter = (newText)=>{
        if(i>=2) return;
        gsap.to(textRef.current, {
            duration:0.6,
            scrambleText:{
                text: newText,
                chars : "0#$",
                speed: 0.4,
                oldClass : "text-base"
            },  
        })
        i++
    }
    const mouseLeave = ()=>{
        i = i-1
    }

    return (

        <button ref={btnRef} onMouseEnter={()=>{mouseEnter(text)}} onMouseLeave={mouseLeave} className= {`${btnType[type]} ${isGlow[glow]} ${btnSize[size]}`} >
            <Link to={`/${text}`} ref={textRef}>{text}</Link>
        </button>
    )
}

export default Button
    
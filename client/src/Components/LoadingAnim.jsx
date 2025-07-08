import React, {useRef} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {ScrambleTextPlugin} from 'gsap/ScrambleTextPlugin'

const LoadingAnim = () => {
const scrambleTextRef = useRef();
const loadingPageRef = useRef();
gsap.registerPlugin(ScrambleTextPlugin) ;
  
useGSAP(()=>{
    
    const tl = gsap.timeline();
    tl.to(scrambleTextRef.current,{
        duration:1.3,
        scrambleText:{
        text : "hello world from hello...",
        chars : "12X10#XD",
        speed : "0.2",
        oldClass : 'text-zinc-400',
        newClass : 'text-white text-3xl'
        }
    })
    tl.to(".box",{
        duration: 0.7,
        yPercent : 98,
        stagger: 0.35,
        ease : "back.in"
    })

    tl.to(loadingPageRef.current,{
        yPercent : -100,
        duration: 0.5,
        delay : 0.2,
        display : "none"
    })
})

  return (
    <div ref={loadingPageRef} className='h-screen w-full flex justify-center items-center gap-1 bg-zinc-900 fixed top-0 left-0 z-20'>
        <div ref={scrambleTextRef} className='text-2xl text-white '></div>
        <div className='box h-screen w-full bg-red-500 absolute -top-[100%] left-0'> </div> 
        <div className='box h-screen w-full bg-red-600 absolute -top-[100%] left-0'> </div> 
        <div className='box h-screen w-full bg-red-800 absolute -top-[100%] left-0'> </div> 
    </div>
  )
}

export default LoadingAnim

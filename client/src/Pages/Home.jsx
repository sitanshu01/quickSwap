import React, {useRef} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from "gsap/SplitText";
import {ScrambleTextPlugin} from 'gsap/ScrambleTextPlugin'
import LoadingAnim from '../Components/LoadingAnim';
import Button from '../Components/Button';
import Cards from '../Components/Cards';
import Navbar from '../Components/Navbar';
import Cursor from '../Components/Cursor';

const Home = () => {
  const subRef= useRef();
  const titleRef= useRef();
  const btnRef= useRef();
  const backRef = useRef();
  const hello = useRef();
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrambleTextPlugin) ;
  
  useGSAP(()=>{
    
    document.fonts.ready.then(()=>{
      const sub = SplitText.create(subRef.current, {
        type : "chars"
      })
      let title = SplitText.create(titleRef.current, {
        type : "chars"
      })
    
    const tl = gsap.timeline();
      
      tl.from(sub.chars, {
        duration:0.5,
        y: 100,
        scale:0.1,
        skewX : Math.random()*80,
        stagger : {
          amount : 0.2,
          from : "random"
        },
        ease: "power3.out",
        autoAlpha : 0,
        delay : 3,
      })
      tl.from(title.chars, {
        duration:2,
        y : 100,
        stagger : {
          amount : 0.6,
          from : "first"
        },
        ease: "elastic.out(1,0.5)",
        autoAlpha : 0,
      })
      tl.from(btnRef.current, {
        duration:1,
        y: 100,
        stagger : {
          amount : 0.2,
          from : "random"
        },
        ease : "elastic.out(1,0.5)",
        autoAlpha : 0,
      })
    })
      gsap.to(hello.current, {
        x: "-50%",
        duration: 13,
        ease: "none",
        repeat: -1,
      });
  })




  return (
    <>
    <Cursor/>
    <div className='h-max w-full overflow-hidden bg-black '>
      <LoadingAnim />
      
      <div ref={backRef} className='h-screen w-full pt-15'>
        <div className='w-full h-full flex flex-col justify-baseline gap-10 items-center relative'>
          <h1 ref={subRef} className=' text-zinc-300 font-[100] font-barlow tracking-wider text-2xl'>ISTE Summer Project Presents:</h1>
          <h1 ref={titleRef} className='text-slate-100 font-extrabold font-boldonse text-[10rem]  tracking-tight'>Quick__Swap</h1>
          <div className='flex justify-around gap-5 mt-8 items-center'>
            <Button ref={btnRef} type="normal" glow="glow" size="large" text="Buy"/>
            <Button ref={btnRef} type="normal" glow="glow" size ="large"text="Sell"/>
          </div>
        </div>
      </div>
      <div className='h-screen w-full  flex justify-center items-center relative '>
        <div className='h-[14vh] border-2 border-l-0 border-r-0 border-slate-400 w-full absolute -top-[5vh] left-0 '>
          <div ref={hello} className='w-max flex items-center text-white overflow-hidden'>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Electronics"/></div>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Notes"/></div>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Books"/></div>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Foods"/></div>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Stationary"/></div>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Electronics"/></div>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Notes"/></div>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Books"/></div>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Foods"/></div>
            <div  className=' w-fit pr-[20vw]'><Button type="normal" size="small" text="Stationary"/></div>
          </div>
        </div>
        <div>
          <h1 className='text-white text-3xl font-boldonse font-bold '>Latest</h1>
        </div>
      </div>
      <div className='h-[50vh] w-full bg-zinc-900 rounded-t-4xl'></div>
    </div>
    </>
  )
}

export default Home

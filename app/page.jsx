"use client";
import Projects from "./components/Projects/Projects";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// console.log(rowsData);
export default function Home() {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <section className="intro">
        <p>Intro Section</p>
      </section>
      <Projects lenisRef={lenisRef} />
      <section className="outro">
        <p>Outro Section</p>
      </section>
    </>
  );
}

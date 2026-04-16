"use client";
import Projects from "./components/Projects/Projects";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// console.log(rowsData);
export default function Home() {
  const lenisRef = useRef();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    // wait for all images to load
    const images = document.querySelectorAll("img");
    let loaded = 0;

    function onLoad() {
      loaded++;
      if (loaded === images.length) {
        setIsLoading(false);
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener("load", onLoad);
      }
    });

    // safety fallback — hide loader after 5s no matter what
    const fallback = setTimeout(() => setIsLoading(false), 5000);

    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "#fff",
            fontSize: "1.5rem",
          }}
        >
          Loading...
        </div>
      )}
      <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
        <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
        <section className="intro">
          <p>Intro Section</p>
        </section>
        <Projects lenisRef={lenisRef} />
        <section className="outro">
          <p>Outro Section</p>
        </section>
      </div>
    </>
  );
}

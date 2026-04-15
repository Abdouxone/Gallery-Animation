"use client";
import Projects from "./components/Projects/Projects";

// console.log(rowsData);
export default function Home() {
  return (
    <>
      <section className="intro">
        <p>Intro Section</p>
      </section>
      <Projects />
      <section className="outro">
        <p>Outro Section</p>
      </section>
    </>
  );
}

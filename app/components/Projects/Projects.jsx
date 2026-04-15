"use client";
import { useRef } from "react";
import { GALLERY } from "./project.js";

const IMAGES_PER_ROW = 9;
const TOTAL_ROWS = 10;

export default function Projects() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  const rowsData = [];
  let currentImageIndex = 0;

  for (let r = 0; r < TOTAL_ROWS; r++) {
    const images = [];
    for (let c = 0; c < IMAGES_PER_ROW; c++) {
      images.push(GALLERY[currentImageIndex % GALLERY.length]);
      currentImageIndex++;
    }
    rowsData.push(images);
  }
  return (
    <section ref={sectionRef} className="projects">
      {rowsData.map((rowImage, rowIndex) => (
        <div
          key={rowIndex}
          className="projects-row"
          ref={(el) => {
            if (el) rowsRef.current[rowIndex] = el;
          }}
        >
          {rowImage.map((image, colIndex) => (
            <div key={colIndex} className="project">
              <div className="project-img">
                <img src={image.img} alt={image.name} />
              </div>
              <div className="project-info">
                <p>{image.name}</p>
                <p>{image.year}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { GALLERY } from "./project.js";
import gsap from "gsap";

const IMAGES_PER_ROW = 9;
const TOTAL_ROWS = 10;

export default function Projects() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);
  const rowStartWidth = useRef(125);
  const rowEndWidth = useRef(500);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = rowsRef.current;
    const isMobile = window.innerWidth < 1000;
    rowStartWidth.current = isMobile ? 250 : 125;
    rowEndWidth.current = isMobile ? 750 : 500;

    const firstRow = rows[0];
    firstRow.style.width = `${rowEndWidth.current}%`;
    const expandedRowHeight = firstRow.offsetHeight;
    firstRow.style.width = "";

    const sectionGap = parseFloat(getComputedStyle(section).gap || 0);
    const sectionPadding = parseFloat(
      getComputedStyle(section).paddingTop || 0,
    );

    const expandedSectionHeight =
      expandedRowHeight * rows.length +
      sectionGap * (rows.length - 1) +
      sectionPadding * 2;

    section.style.height = `${expandedSectionHeight}px`;

    function onScrollUpdate() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      rows.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const rowTop = rect.top + scrollY;
        const rowBottom = rowTop + rect.height;

        const scrollStart = rowTop - viewportHeight;
        const scrollEnd = rowBottom;

        let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
        progress = Math.max(0, Math.min(1, progress));

        const width =
          rowStartWidth.current +
          (rowEndWidth.current - rowStartWidth.current) * progress;
        row.style.width = `${width}%`;
      });
    }

    gsap.ticker.add(onScrollUpdate);

    const handleResize = () => {
      const isMobile = window.innerWidth < 1000;
      rowStartWidth.current = isMobile ? 250 : 125;
      rowEndWidth.current = isMobile ? 750 : 500;

      firstRow.style.width = `${rowEndWidth.current}%`;
      const newRowHeight = firstRow.offsetHeight;
      firstRow.style.width = "";

      const newSectionHeight =
        newRowHeight * rows.length +
        sectionGap * (rows.length - 1) +
        sectionPadding * 2;

      section.style.height = `${newSectionHeight}px`;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(onScrollUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

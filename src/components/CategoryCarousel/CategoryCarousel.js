"use client";

import { useEffect, useRef, useState } from "react";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import "./category-carousel.css";

export default function CategoryCarousel({ categories }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1280) setItemsPerView(4);
      else if (width >= 1024) setItemsPerView(3);
      else if (width >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalItems = categories.length;
  const totalSlides = Math.ceil(totalItems / itemsPerView);
  const maxIndex = totalSlides - 1;

  useEffect(() => {
    if (!isHovered && totalSlides > 1) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
      }, 4000);
    }
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [isHovered, maxIndex, totalSlides]);

  useEffect(() => {
    if (trackRef.current) {
      const scrollAmount = currentIndex * (100 / itemsPerView);
      trackRef.current.style.transform = `translateX(-${scrollAmount}%)`;
    }
  }, [currentIndex, itemsPerView]);

  const goToNext = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    setTimeout(() => {
      if (!isHovered && totalSlides > 1 && !autoScrollRef.current) {
        autoScrollRef.current = setInterval(() => {
          setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
        }, 4000);
      }
    }, 5000);
  };

  const goToPrev = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
    setTimeout(() => {
      if (!isHovered && totalSlides > 1 && !autoScrollRef.current) {
        autoScrollRef.current = setInterval(() => {
          setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
        }, 4000);
      }
    }, 5000);
  };

  if (totalItems === 0) return null;

  return (
    <div className="category-carousel" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="carousel-container">
        <div className="carousel-track" ref={trackRef}>
          {categories.map((cat) => (
            <div key={cat._id} className="carousel-slide">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </div>
      {totalSlides > 1 && (
        <>
          <button className="carousel-nav prev" onClick={goToPrev}>‹</button>
          <button className="carousel-nav next" onClick={goToNext}>›</button>
          <div className="carousel-dots">
            {[...Array(totalSlides)].map((_, idx) => (
              <button key={idx} className={`dot ${currentIndex === idx ? "active" : ""}`} onClick={() => setCurrentIndex(idx)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
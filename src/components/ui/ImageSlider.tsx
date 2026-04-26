import { useState, useEffect } from "react";
import type { AlbumImage } from "../../types/album";
import { getSliderUrl } from "../../utils/cloudinaryUrl";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import "./ImageSlider.css";

interface ImageSliderProps {
  images: AlbumImage[];
  initialIndex: number;
  onClose: () => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loaded, setLoaded] = useState(false);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  // Prefetch ±2 images
  useEffect(() => {
    setLoaded(false);
    [-2, -1, 1, 2].forEach((offset) => {
      const idx = currentIndex + offset;
      if (idx >= 0 && idx < images.length) {
        const img = new window.Image();
        img.src = getSliderUrl(images[idx].url);
      }
    });
  }, [currentIndex, images]);

  const goToPrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));

  const currentImage = images[currentIndex];

  return (
    <div className="image-slider__overlay" onClick={onClose}>
      <div
        className="image-slider__inner"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="image-slider__close"
          onClick={onClose}
          aria-label="Bezárás"
        >
          ×
        </button>

        {currentIndex > 0 && (
          <button
            className="image-slider__nav image-slider__nav--prev"
            onClick={goToPrev}
            aria-label="Előző kép"
          >
            <ChevronLeftIcon />
          </button>
        )}

        <div className="image-slider__image-wrap">
          {!loaded && <div className="image-slider__spinner" aria-hidden="true" />}
          <img
            key={currentImage.url}
            src={getSliderUrl(currentImage.url)}
            alt={currentImage.altText ?? ""}
            className="image-slider__image"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.2s" }}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {currentIndex < images.length - 1 && (
          <button
            className="image-slider__nav image-slider__nav--next"
            onClick={goToNext}
            aria-label="Következő kép"
          >
            <ChevronRightIcon />
          </button>
        )}

        <div className="image-slider__counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;

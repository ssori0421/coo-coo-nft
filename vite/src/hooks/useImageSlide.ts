import { useEffect } from 'react';

const useImageSlide = () => {
  useEffect(() => {
    const slider = document.getElementById('slider');

    const startAnimation = () => {
      if (slider) {
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';

        requestAnimationFrame(() => {
          setTimeout(() => {
            slider.style.transition = 'transform 60s linear';
            slider.style.transform = `translateX(-${slider.scrollWidth / 2}px)`;
          }, 50);
        });
      }
    };

    const handleTransitionEnd = () => {
      if (slider) {
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        requestAnimationFrame(startAnimation);
      }
    };

    slider?.addEventListener('transitionend', handleTransitionEnd);

    startAnimation();

    return () => {
      slider?.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, []);
};

export default useImageSlide;

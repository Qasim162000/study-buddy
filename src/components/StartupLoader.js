import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import BookLottie from '../assets/lotties/book-with-bookmark.json';

const StartupLoader = () => {
  const lottieRef = useRef(null);

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: BookLottie
    });
    return () => anim.destroy();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700">
      <div className="flex flex-col items-center justify-center">
        <div ref={lottieRef} style={{ width: 'auto', height: 'auto', maxHeight: 600, maxWidth: 600 }} />
        <h1 className="-mt-28 text-4xl md:text-5xl font-extrabold text-primary drop-shadow-lg tracking-tight text-center">Study Buddy</h1>
        <p className="mt-2 text-black text-lg font-medium text-center">Your personal AI-powered academic assistant.</p>
      </div>
    </div>
  );
};

export default StartupLoader; 
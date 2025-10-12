"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import VideoPlaylist from "./ui/VideoPlaylist";
import NewVideoPlaylist from "./ui/NewVideoPlaylist";
import LocalVideo from "./ui/LocalVideo";

export default function Home() {
  const [showJohatsu, setShowJohatsu] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const letterVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
    exit: (i: number) => {
      const randomX = Math.random() * 100 - 50;
      const randomRotation = Math.random() * 60 - 30;
      return {
        opacity: [1, 0.6, 0.3, 0],
        y: [0, -30, -80, -150],
        x: [0, randomX * 0.3, randomX * 0.7, randomX],
        rotate: [0, randomRotation * 0.5, randomRotation],
        scale: [1, 0.8, 0.5, 0.2],
        filter: [
          "blur(0px)",
          "blur(1px)",
          "blur(4px)",
          "blur(8px)",
        ],
        transition: {
          duration: 2.5,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: i * 0.1,
          times: [0, 0.3, 0.6, 1],
        },
      };
    },
  };

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: { index: number; offset: number }) => {
      const { index, offset } = custom;
      const randomX = (Math.random() - 0.5) * 120;
      const randomY = -80 - Math.random() * 100;
      const swirlX = Math.sin(offset * 2) * 30;

      return {
        opacity: [0, 0.6, 0.4, 0],
        y: [0, randomY * 0.3, randomY * 0.6, randomY],
        x: [0, randomX * 0.2 + swirlX, randomX * 0.6 + swirlX * 1.5, randomX + swirlX * 2],
        scale: [0, 0.8, 0.5, 0.2],
        filter: ["blur(0px)", "blur(2px)", "blur(5px)", "blur(10px)"],
        transition: {
          duration: 2 + Math.random() * 0.8,
          delay: index * 0.1 + offset * 0.15,
          ease: [0.22, 1, 0.36, 1] as const,
          times: [0, 0.25, 0.6, 1],
        },
      };
    },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, delay: 1.8, ease: "easeInOut" as const },
    },
  };

  const tickVariants = {
    tick: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.2, repeat: Infinity, repeatDelay: 0.8 },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowJohatsu(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2025-12-01T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans p-8">
      <main className="flex flex-col items-center gap-16 mt-20">
        <div className="relative text-5xl sm:text-7xl font-extrabold tracking-tighter drop-shadow-lg flex flex-col items-center gap-4">
          <AnimatePresence>
            {showJohatsu && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex justify-center"
              >
                {"Johatsu".split("").map((letter, index) => (
                  <div key={index} className="relative inline-block">
                    <motion.span
                      custom={index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                    {/* Multiple layers of smoke particles */}
                    {Array.from({ length: 8 }).map((_, particleIndex) => {
                      const particleSize = particleIndex % 3 === 0 ? "text-sm" : particleIndex % 3 === 1 ? "text-xs" : "text-[8px]";
                      const particleChar = particleIndex % 4 === 0 ? "●" : particleIndex % 4 === 1 ? "○" : particleIndex % 4 === 2 ? "◦" : "∙";
                      return (
                        <motion.span
                          key={`particle-${index}-${particleIndex}`}
                          custom={{ index, offset: particleIndex }}
                          variants={particleVariants}
                          initial="hidden"
                          animate={showJohatsu ? "hidden" : "visible"}
                          className={`absolute top-0 left-1/2 -translate-x-1/2 ${particleSize} text-gray-300`}
                          style={{
                            textShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
                          }}
                        >
                          {particleChar}
                        </motion.span>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!showJohatsu && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={revealVariants}
                className="absolute inset-0 flex justify-center"
              >
                The Evaporated
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-col items-center gap-6 mt-12">
          <div className="flex gap-3 text-4xl sm:text-5xl font-mono bg-black/[.7] px-8 py-6 rounded-xl shadow-2xl border border-red-800/30">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
              const value = Object.values(timeLeft)[i];
              return (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-red-500 select-none">:</span>}
                  <div className="flex flex-col items-center">
                    <motion.span
                      variants={tickVariants}
                      animate="tick"
                      className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                    >
                      {String(value).padStart(2, "0")}
                    </motion.span>
                    <span className="text-sm text-gray-400">{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full max-w-3xl mt-12 aspect-video">
          <Suspense fallback={<p>Loading video...</p>}>
            <VideoPlaylist />
          </Suspense>
        </div>

        {/* NEW Playlist */}
        <div className="w-full max-w-3xl mt-12 aspect-video">
          <Suspense fallback={<p>Loading video...</p>}>
            <NewVideoPlaylist />
          </Suspense>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mt-16 items-center justify-center">
          <div className="w-64 h-64 relative">
            <Image
              src="https://i.pinimg.com/originals/a9/88/7d/a9887d55251c5f8579d8819571d9e110.gif"
              alt="Dean Winchester from Supernatural (Michael's vessel) shows off his archangel wings"
              fill
              className="object-contain rounded-lg shadow-lg"
              unoptimized
              priority
            />
          </div>
          <div className="w-64 mb-12">
            <LocalVideo />
          </div>
        </div>
      </main>
    </div>
  );
}

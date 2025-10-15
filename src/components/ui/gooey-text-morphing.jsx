"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
  style
}) {
  const text1Ref = React.useRef(null);
  const text2Ref = React.useRef(null);

  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let time = Date.now();
    let morph = 0;
    let cooldown = cooldownTime;
    let animationId;
    let isActive = true;

    const setMorph = (fraction) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      if (!isActive) return;
      
      animationId = requestAnimationFrame(animate);
      const newTime = Date.now();
      const shouldIncrementIndex = cooldown > 0;
      const dt = Math.min((newTime - time) / 1000, 0.016); // Cap at 60fps max
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    // Handle visibility change to pause/resume animation
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false;
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      } else {
        isActive = true;
        time = Date.now(); // Reset time to prevent large dt jumps
        animate();
      }
    };

    // Initialize text content
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[textIndex % texts.length];
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animate();

    return () => {
      isActive = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
          style={style}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
          style={style}
        />
      </div>
    </div>
  );
}


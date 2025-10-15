"use client";
import { useEffect, useRef } from "react";

export function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const pointersRef = useRef([{ id: -1, texcoordX: 0, texcoordY: 0, prevTexcoordX: 0, prevTexcoordY: 0, deltaX: 0, deltaY: 0, down: false, moved: false, color: { r: 0, g: 0, b: 0 } }]);
  const configRef = useRef({
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    PAUSED: false,
    BACK_COLOR,
    TRANSPARENT,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let glContext;
    let lastTime = Date.now();
    let colorTimer = 0;

    function initGL() {
      glContext = canvas.getContext("webgl2", { alpha: true, depth: false, stencil: false, antialias: false });
      if (!glContext) return;
      glContext.clearColor(0, 0, 0, 1);
      return glContext;
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function updateColors(dt) {
      colorTimer += dt * configRef.current.COLOR_UPDATE_SPEED;
      if (colorTimer >= 1) {
        colorTimer = colorTimer % 1;
        pointersRef.current.forEach((p) => (p.color = generateColor()));
      }
    }

    function generateColor() {
      const h = Math.random();
      const s = 1;
      const v = 1;
      let r, g, b;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      return { r: r * 0.15, g: g * 0.15, b: b * 0.15 };
    }

    function loop() {
      const now = Date.now();
      const dt = Math.min((now - lastTime) / 1000, 0.016666);
      lastTime = now;

      resizeCanvas();
      updateColors(dt);

      // TODO: call WebGL update step (advection, splat, render, etc.)
      // This is where you integrate your WebGL fluid logic.

      animationRef.current = requestAnimationFrame(loop);
    }

    function handleMouseDown(e) {
      const pointer = pointersRef.current[0];
      const x = e.clientX;
      const y = e.clientY;
      pointer.down = true;
      pointer.texcoordX = x / canvas.width;
      pointer.texcoordY = 1 - y / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.color = generateColor();
      // TODO: trigger splat effect
    }

    function handleMouseMove(e) {
      const pointer = pointersRef.current[0];
      if (!pointer.down) return;
      const x = e.clientX;
      const y = e.clientY;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = x / canvas.width;
      pointer.texcoordY = 1 - y / canvas.height;
      pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX;
      pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY;
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      // TODO: trigger splat effect
    }

    // Attach event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);

    initGL();
    loop();

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

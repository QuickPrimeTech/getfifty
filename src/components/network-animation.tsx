"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface ChildNode {
  x: number;
  y: number;
}

export const NetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const primaryCount = 10;
    const childrenPerNode = 10;

    const primaryNodes: Node[] = [];
    const childNodes: ChildNode[][] = [];

    let centerX = 0;
    let centerY = 0;

    const mouse = { x: 0, y: 0 };

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      centerX = rect.width / 2;
      centerY = rect.height / 2;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    // create 10 main nodes
    for (let i = 0; i < primaryCount; i++) {
      const angle = (i / primaryCount) * Math.PI * 2;
      const distance = 120;

      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      primaryNodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });

      // create 50 child nodes
      const children: ChildNode[] = [];

      for (let j = 0; j < childrenPerNode; j++) {
        const childAngle = Math.random() * Math.PI * 2;
        const childDist = 30 + Math.random() * 60;

        children.push({
          x: x + Math.cos(childAngle) * childDist,
          y: y + Math.sin(childAngle) * childDist,
        });
      }

      childNodes.push(children);
    }

    const getColors = () => {
      const style = getComputedStyle(document.documentElement);

      return {
        primary: style.getPropertyValue("--primary").trim(),
        muted: style.getPropertyValue("--muted").trim(),
        border: style.getPropertyValue("--border").trim(),
      };
    };

    const withAlpha = (color: string, alpha: number) => {
      const temp = document.createElement("div");
      temp.style.color = color;
      document.body.appendChild(temp);

      const computed = getComputedStyle(temp).color;
      document.body.removeChild(temp);

      const match = computed.match(/\d+/g);
      if (!match) return color;

      const [r, g, b] = match;

      return `rgba(${r},${g},${b},${alpha})`;
    };

    const drawPersonIcon = (
      x: number,
      y: number,
      radius: number,
      color: string,
    ) => {
      ctx.save();
      ctx.translate(x, y);

      const scale = radius / 20;
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.arc(0, -8, 6, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, 8, 12, 10, 0, Math.PI, 0);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.restore();
    };

    let colors = getColors();

    const animate = () => {
      colors = getColors();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // animate main nodes
      primaryNodes.forEach((node) => {
        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 150) {
          node.vx -= dxMouse * 0.0008;
          node.vy -= dyMouse * 0.0008;
        }

        node.x += node.vx;
        node.y += node.vy;

        const dx = centerX - node.x;
        const dy = centerY - node.y;

        node.vx += dx * 0.0002;
        node.vy += dy * 0.0002;

        node.vx *= 0.97;
        node.vy *= 0.97;
      });

      // draw center connections
      primaryNodes.forEach((node) => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.x, node.y);

        ctx.strokeStyle = withAlpha(colors.primary, 0.5);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // draw children
      primaryNodes.forEach((node, i) => {
        childNodes[i].forEach((child) => {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(child.x, child.y);

          ctx.strokeStyle = withAlpha(colors.primary, 0.15);
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(child.x, child.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = colors.muted;
          ctx.fill();
        });
      });

      // draw primary nodes
      primaryNodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = colors.primary;
        ctx.fill();
      });

      // draw center user
      ctx.beginPath();
      ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
      ctx.fillStyle = colors.primary;
      ctx.fill();

      drawPersonIcon(centerX, centerY, 12, colors.muted);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

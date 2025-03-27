
import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Neuron {
      x: number;
      y: number;
      radius: number;
      connections: Neuron[];
      vx: number;
      vy: number;
      pulseRadius: number;
      pulseMaxRadius: number;
      pulseGrowth: number;
      pulseAlpha: number;
      pulseActive: boolean;
      timeToNextPulse: number;

      constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.connections = [];
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.pulseRadius = 0;
        this.pulseMaxRadius = radius * 8;
        this.pulseGrowth = 0.8;
        this.pulseAlpha = 0;
        this.pulseActive = false;
        this.timeToNextPulse = Math.random() * 300 + 100;
      }

      update() {
        // Move neuron
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
          this.vx *= -1;
        }
        if (this.y <= this.radius || this.y >= canvas.height - this.radius) {
          this.vy *= -1;
        }

        // Update pulse
        if (this.pulseActive) {
          this.pulseRadius += this.pulseGrowth;
          this.pulseAlpha = 1 - this.pulseRadius / this.pulseMaxRadius;

          if (this.pulseRadius >= this.pulseMaxRadius) {
            this.pulseActive = false;
            this.pulseRadius = 0;
            this.pulseAlpha = 0;
            this.timeToNextPulse = Math.random() * 300 + 100;
          }
        } else {
          this.timeToNextPulse--;
          if (this.timeToNextPulse <= 0) {
            this.pulseActive = true;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw neuron
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120, 153, 235, 0.2)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(120, 153, 235, 0.6)';
        ctx.stroke();

        // Draw connections
        this.connections.forEach((neuron) => {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(neuron.x, neuron.y);
          ctx.strokeStyle = 'rgba(120, 153, 235, 0.15)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });

        // Draw pulse
        if (this.pulseActive) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(120, 153, 235, ${this.pulseAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Create neurons
    const numberOfNeurons = Math.min(30, Math.floor(canvas.width * canvas.height / 40000));
    const neurons: Neuron[] = [];

    for (let i = 0; i < numberOfNeurons; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 2 + 2;
      neurons.push(new Neuron(x, y, radius));
    }

    // Connect neurons
    neurons.forEach((neuron) => {
      const connectionsCount = Math.floor(Math.random() * 2) + 1;
      const possibleConnections = [...neurons].filter((n) => n !== neuron);
      
      for (let i = 0; i < connectionsCount && possibleConnections.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * possibleConnections.length);
        neuron.connections.push(possibleConnections[randomIndex]);
        possibleConnections.splice(randomIndex, 1);
      }
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw neurons
      neurons.forEach((neuron) => {
        neuron.update();
        neuron.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 opacity-40 ${className}`}
    />
  );
};

export default AnimatedBackground;

import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import ThreeWays1 from "../components/ThreeWays1";

import DynamicDash from "../components/DynamicDash";
import Testimonials from "../components/Testimonials";
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slow"></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float-slower"></div>
      <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-35 animate-float-reverse"></div>
    </div>
  );
}

function ParticleField() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 600;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        gradient.addColorStop(0, `rgba(168, 85, 247, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 150) * 0.2;
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

function RisingElements() {
  const elements = ['💪', '🚀', '💜', '⭐', '🎯', '✨', '🌟', '💎'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((emoji, i) => (
        <div
          key={i}
          className="absolute text-3xl opacity-20 animate-rise"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '-50px',
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${8 + i * 0.5}s`
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}

function GlowPulse() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
    </>
  );
}

export default function Home1({onLogin }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
     
      <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-white">
        
        <GlowPulse />
        <FloatingOrbs />
        <ParticleField />
        <RisingElements />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-20">
          
       

          <h1 className={`text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Grow with Confidence
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] animate-gradient inline-block">
              Start Earning Today.
            </span>
          </h1>

          <p className={`max-w-2xl text-gray-600 mt-6 text-lg transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Built for women who want to work on their own terms —
with safety, dignity, and control.
          </p>

          <div className={`flex gap-4 mt-10 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Get Started Free</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group bg-white/80 backdrop-blur-sm text-purple-600 px-8 py-4 rounded-xl flex items-center gap-2 border border-purple-200 hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-md">
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" /> 
              See How It Works
            </button>
          </div>

          <div className={`flex flex-wrap gap-6 mt-14 text-gray-600 text-sm justify-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full hover:scale-110 transition-transform cursor-default shadow-md border border-purple-100">
  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
  <span className="font-semibold text-gray-800">Verified Employers</span>
</span>
<span className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full hover:scale-110 transition-transform cursor-default shadow-md border border-purple-100">
  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></span>
  <span className="font-semibold text-gray-800">Secure Payments</span>
</span>
<span className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full hover:scale-110 transition-transform cursor-default shadow-md border border-purple-100">
  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></span>
  <span className="font-semibold text-gray-800">24/7 Safety Support</span>
</span>
            
          </div>
        </div>
      </section>

     <ThreeWays1 onLogin={onLogin} />
  <DynamicDash />

      <Testimonials />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-40px, 30px) rotate(-8deg); }
          66% { transform: translate(30px, -20px) rotate(8deg); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.1); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(25px, 35px) rotate(-6deg); }
          66% { transform: translate(-30px, -25px) rotate(6deg); }
        }
        
        @keyframes rise {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-600px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.08; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.12; transform: translate(-50%, -50%) scale(1.08); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 30s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 22s ease-in-out infinite;
        }
        
        .animate-rise {
          animation: rise linear infinite;
        }
        
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
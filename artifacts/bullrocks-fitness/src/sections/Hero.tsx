import { useRef, useMemo, useState, useEffect } from "react";

function inSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * radius;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sphere = useMemo(() => inSphere(5000, 1.5), []);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    import("three").then(({ WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, BufferAttribute, Points, PointsMaterial, Color }) => {
      const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      const scene = new Scene();
      const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.z = 1;

      const geometry = new BufferGeometry();
      geometry.setAttribute("position", new BufferAttribute(sphere, 3));
      const material = new PointsMaterial({
        color: new Color("#FF4D00"),
        size: 0.005,
        sizeAttenuation: true,
        transparent: true,
        depthWrite: false,
      });
      const points = new Points(geometry, material);
      points.rotation.z = Math.PI / 4;
      scene.add(points);

      let lastTime = 0;
      function animate(time: number) {
        const delta = (time - lastTime) / 1000;
        lastTime = time;
        points.rotation.x -= delta / 10;
        points.rotation.y -= delta / 15;
        renderer.render(scene, camera);
        animRef.current = requestAnimationFrame(animate);
      }
      animRef.current = requestAnimationFrame(animate);

      const handleResize = () => {
        if (!canvas) return;
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animRef.current);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
      };
    });
  }, [sphere]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function CSSParticleBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        delay: `${Math.random() * 8}s`,
        duration: `${Math.random() * 12 + 10}s`,
        opacity: Math.random() * 0.5 + 0.1,
        orange: Math.random() > 0.5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, rgba(255,77,0,0.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 20%, rgba(255,115,0,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(255,77,0,0.06) 0%, transparent 40%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,77,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,77,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.orange ? "#FF4D00" : "#C0C0C0",
            opacity: p.opacity,
            animation: `float ${p.duration} ${p.delay} ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [webglSupported] = useState(() =>
    typeof window !== "undefined" ? isWebGLSupported() : false
  );

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] bg-background overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {webglSupported ? <ThreeScene /> : <CSSParticleBackground />}
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pointer-events-none">
        <div className="max-w-4xl pt-20">
          <h1 className="text-[clamp(4rem,10vw,12rem)] leading-[0.85] font-heading m-0">
            <span className="block text-white clip-path-reveal">BUILD</span>
            <span className="block text-gradient-orange clip-path-reveal">
              STRENGTH
            </span>
            <span className="block text-white clip-path-reveal mt-4">BREAK</span>
            <span className="block text-gradient-orange clip-path-reveal">
              LIMITS
            </span>
          </h1>

          <p className="mt-8 text-muted-foreground tracking-[0.3em] text-sm uppercase">
            Elite Fitness • Personal Training • Transformations
          </p>

          <div className="mt-12 flex flex-wrap gap-6 pointer-events-auto">
            <a
              href="#contact"
              data-testid="button-join-now"
              className="bg-gradient-orange text-white px-8 py-4 font-bold tracking-wider hover:opacity-90 transition-opacity"
            >
              JOIN NOW
            </a>
            <a
              href="#trainers"
              data-testid="button-book-training"
              className="border border-white text-white px-8 py-4 font-bold tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              BOOK PERSONAL TRAINING
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <div className="w-full h-1/2 bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}

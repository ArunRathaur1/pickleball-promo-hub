import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <main className="relative w-full h-[1000px]">
      {/* Background Spline scene, interaction disabled */}
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <Spline scene="https://prod.spline.design/izyUvqZdae3HLurg/scene.splinecode" />
      </div>
    </main>
  );
}

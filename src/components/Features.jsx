export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-r from-primary to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to <span className="text-accent">HackGround</span>
          </h1>
          <p className="text-lg text-gray-300">
            Your platform for innovation, collaboration, and growth.
          </p>
          <button className="bg-accent px-6 py-3 rounded-md text-lg hover:bg-yellow-500">
            Join Now
          </button>
        </div>
        <div className="flex-1 mt-10 md:mt-0">
          <img src="/hero-image.png" alt="Hero" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
}

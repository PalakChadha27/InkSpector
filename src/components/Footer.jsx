export default function Footer() {
  return (
    <footer className="bg-primary text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <p>© {new Date().getFullYear()} HackGround. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-accent">Privacy Policy</a>
          <a href="#" className="hover:text-accent">Terms</a>
        </div>
      </div>
    </footer>
  );
}

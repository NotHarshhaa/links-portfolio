"use client";

export function SimpleFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-8 px-4 bg-white/90 dark:bg-neutral-900/90 border-t border-neutral-200 dark:border-neutral-800 mt-8 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} Harshhaa Vardhan Reddy
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            DevOps Engineer & Cloud Specialist
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="mailto:harshhaa03@gmail.com"
            className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/NotHarshhaa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            GitHub
          </a>
          <button
            onClick={scrollToTop}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}

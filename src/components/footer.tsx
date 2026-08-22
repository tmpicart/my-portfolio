export default function Footer() {
  return (
    <footer className="flex flex-col items-center bg-gradient-to-t from-canvas-raised to-canvas py-6 text-center">
      <h2 className="mb-2 text-2xl md:text-3xl font-semibold">Let’s Connect</h2>

      <p className="mb-3 text-base md:text-lg text-gray-300">
        Reach me on LinkedIn, GitHub, or send me an email.
      </p>

      <div className="flex space-x-6 text-3xl md:text-4xl">
        <a
          href="https://www.linkedin.com/in/tmpicart"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent"
        >
          <i className="fab fa-linkedin"></i>
        </a>

        <a
          href="https://github.com/tmpicart"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent"
        >
          <i className="fab fa-github"></i>
        </a>

        <a
          href="mailto:tmpicart@gmail.com"
          className="transition-colors hover:text-accent"
        >
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </footer>
  );
}
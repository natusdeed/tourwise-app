export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">404</h2>
        <p className="text-white/70 mb-6">Page not found</p>
        <a
          href="/"
          className="px-4 py-2 bg-neon-cyan text-black font-semibold rounded-lg hover:bg-electric-blue transition-colors inline-block"
        >
          Go back home
        </a>
      </div>
    </div>
  )
}

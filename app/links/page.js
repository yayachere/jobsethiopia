export default function Links() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      {/* Profile */}
      <img
        src="/favicon.png" // Replace with your JobsEthiopia logo
        alt="JobsEthiopia Logo"
        className="w-24 h-24 rounded-full mb-4 shadow-lg"
      />
      <h1 className="text-2xl font-bold">JobsEthiopia</h1>
      <p className="text-gray-400 mb-6">Find Jobs. Build Careers.</p>

      {/* Buttons */}
      <div className="w-80 space-y-4">
        <a
          href="https://jobsethiopia.vercel.app/"
          className="block bg-blue-600 py-3 rounded-xl text-center font-medium hover:bg-blue-700 transition"
        >
          🌐 Visit Website
        </a>
        <a
          href="https://t.me/JobsEthiopiaOfficial"
          className="block bg-green-600 py-3 rounded-xl text-center font-medium hover:bg-green-700 transition"
        >
          📲 Join Telegram
        </a>
        <a
          href="https://www.instagram.com/jobsethiopia/"
          className="block bg-pink-500 py-3 rounded-xl text-center font-medium hover:bg-pink-600 transition"
        >
          📸 Instagram
        </a>
        <a
          href="https://web.facebook.com/profile.php?viewas=100000686899395&id=61578169974603"
          className="block bg-pink-500 py-3 rounded-xl text-center font-medium hover:bg-pink-600 transition"
        >
          📸 Facebook
        </a>
      </div>
    </div>
  );
}

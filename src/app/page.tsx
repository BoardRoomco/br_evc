import { Clipboard, Mail, HelpCircle, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f1f8fa]">
      {/* Left Side Icons Container */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[100]">
        {/* Layout Button */}
        <button 
          className="p-4 transition-colors cursor-pointer"
          aria-label="Layout"
        >
          <div className="flex flex-col items-center gap-1">
            <Clipboard className="w-16 h-16 text-black" strokeWidth={1.0} />
            <span className="text-sm text-gray-600">Layout</span>
          </div>
        </button>

        {/* Messages Button */}
        <button 
          className="p-4 transition-colors cursor-pointer"
          aria-label="Messages"
        >
          <div className="flex flex-col items-center gap-1">
            <Mail className="w-16 h-16 text-black" strokeWidth={1.0} />
            <span className="text-sm text-gray-600">Messages</span>
          </div>
        </button>

        {/* Help Button */}
        <button 
          className="p-4 transition-colors cursor-pointer"
          aria-label="Help"
        >
          <div className="flex flex-col items-center gap-1">
            <HelpCircle className="w-16 h-16 text-black" strokeWidth={1.0} />
            <span className="text-sm text-gray-600">Help</span>
          </div>
        </button>

        {/* Submit Button */}
        <button 
          className="p-4 transition-colors cursor-pointer"
          aria-label="Submit"
        >
          <div className="flex flex-col items-center gap-1">
            <CheckCircle className="w-16 h-16 text-black" strokeWidth={1.0} />
            <span className="text-sm text-gray-600">Submit</span>
          </div>
        </button>
      </div>

      {/* Main content */}
      <main className="container mx-auto p-8 h-screen flex items-center justify-center">
        {/* Logo placeholder - we'll add this later */}
        <div className="w-[400px] h-[100px] opacity-20 bg-gray-200"></div>
      </main>
    </main>
  );
}

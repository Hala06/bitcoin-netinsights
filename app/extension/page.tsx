'use client';

import { motion } from 'framer-motion';
import BitcoinModel from '@/components/BitcoinModel';

export default function ExtensionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002B5B] to-[#660000] p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8"
      >
        <div className="flex items-center mb-8">
          <div className="h-16 w-16 relative mr-4">
            <BitcoinModel height={64} width={64} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Bitcoin NetInsights Extension</h1>
            <p className="text-gray-300">Real-time blockchain insights in your browser</p>
          </div>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Installation Steps</h2>
            <ol className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-bold mr-3">1</span>
                <div>
                  <p>Download the extension files from <a href="/extension.zip" className="text-[#f7931a] hover:underline">here</a>.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-bold mr-3">2</span>
                <div>
                  <p>Unzip the downloaded file to a folder on your computer.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-bold mr-3">3</span>
                <div>
                  <p>Open your browser and navigate to the extensions page:</p>
                  <ul className="mt-2 ml-6 space-y-2 text-sm">
                    <li>• Chrome: chrome://extensions</li>
                    <li>• Edge: edge://extensions</li>
                    <li>• Firefox: about:addons</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-bold mr-3">4</span>
                <div>
                  <p>Enable "Developer mode" (usually a toggle in the top-right corner).</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-bold mr-3">5</span>
                <div>
                  <p>Click "Load unpacked" and select the unzipped extension folder.</p>
                </div>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#f7931a] mr-3"></div>
                <span>Real-time Bitcoin transaction monitoring</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#f7931a] mr-3"></div>
                <span>Mempool status notifications</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#f7931a] mr-3"></div>
                <span>Network health indicators</span>
              </li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

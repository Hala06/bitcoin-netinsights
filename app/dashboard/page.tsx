import BitcoinModel from '@/components/BitcoinModel'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#121212] text-[#FAFAFA] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bitcoin Network Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Network Status</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Transaction Volume</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Node Distribution</h2>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  );
}

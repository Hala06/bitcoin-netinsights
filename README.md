# Bitcoin NetInsights

Real-time dashboard for monitoring Bitcoin network activity, including mempool congestion, OP_RETURN usage, drivechain activity, and BRC-20 token trends.

## Features

- Real-time mempool monitoring
- OP_RETURN data tracking
- Drivechain activity monitoring
- BRC-20 token analytics
- 3D Bitcoin visualization
- Light/Dark mode support
- Responsive design
- User authentication with Clerk

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn
- A Clerk account for authentication

### Setup Authentication

1. Create a Clerk account at [https://clerk.dev](https://clerk.dev)
2. Create a new application in the Clerk dashboard
3. Configure your OAuth providers (optional)
4. Set up your sign-in/sign-up preferences
5. Copy your API keys from the Clerk dashboard

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bitcoin-netinsights.git
cd bitcoin-netinsights
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Clerk API keys and configuration:
     ```env
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
     CLERK_SECRET_KEY=your_secret_key
     ```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Clerk Configuration

For authentication to work properly:

1. In your Clerk dashboard:
   - Configure your allowed domains
   - Set up sign-in/sign-up URLs:
     - Sign-in URL: `/sign-in`
     - Sign-up URL: `/sign-up`
     - After sign-in URL: `/dashboard`
   - Enable the authentication methods you want to support

2. Verify your environment variables match the ones in `.env.example`

3. Protected routes are configured in `middleware.ts`. Adjust the public routes as needed.

## Development

- `/app` - Next.js app directory
  - `/components` - Reusable React components
  - `/lib` - Utility functions and APIs
  - `/contexts` - React context providers
  - `/dashboard` - Main dashboard interface
  - `/sign-in` and `/sign-up` - Authentication pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

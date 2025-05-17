import { redirect } from 'next/navigation';
import BitcoinModel from '@/components/BitcoinModel'

export default function Home() {
  redirect('/onboarding');
}

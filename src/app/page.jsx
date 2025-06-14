import SmartLogo from '@/app/ui/smart-logo';
import { ArrowRightIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-green-500 p-4 md:h-52">
        <SmartLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className={styles.shape} />
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Smart Finance.</strong> Track Your Money Like a Pro.
          </p>
          <p className="text-gray-600">
            Powerful and user-friendly finance management tool that helps you
            track your expenses, set budgets, and achieve your financial goals.
          </p>
          <div className="flex items-center justify-between gap-4 md:gap-6">
            <div>
              <Link
              href="/login"
                className="flex items-center gap-3 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
              >
                <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
              </Link>
            </div>
            <div>
              <Link
                href="/signup"
                className="flex items-center gap-3 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
              >
                <span>Sign up</span> <PencilIcon className="w-4 md:w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Images Here */}
           <Image
        src="/hero-desktop-dash.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile-dash.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshots of the dashboard project showing desktop version"
      />
        </div>
      </div>
    </main>
  );
}

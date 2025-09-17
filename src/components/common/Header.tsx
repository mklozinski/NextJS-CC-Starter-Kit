import { SignInButton } from "@/components/auth/SignInButton";
import Link from "next/link";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";

export default function Header() {
  return (
    <header className="bg-white dark:bg-black shadow-sm dark:border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                Next.js CC Starter Kit
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <SignInButton />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>
  );
}

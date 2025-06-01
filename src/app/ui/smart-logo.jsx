import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function SmartLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-15 w-15 rotate-[25deg]" />
      <p className="text-[25px]">Smart Finance</p>
    </div>
  );
}

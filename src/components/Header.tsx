"use client";
import { useRouter } from 'next/navigation';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useOrgContext } from '@/context/OrganizationContext';

export function Header() {
  const router = useRouter();
  const { user, signOut } = useOrgContext();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center z-10 relative">
      <div className="font-bold text-xl text-primary flex items-center gap-2">
        <span>Elorza Money</span>
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-full transition-colors outline-none focus:ring-2 focus:ring-primary/20">
          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
            <User className="text-gray-500" size={20} />
          </div>
          <ChevronDown className="text-gray-400" size={16} />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">Conta atual</p>
            <p className="font-medium text-gray-900 truncate">{user.email}</p>
          </div>

          <div className="p-2">
            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    focus ? 'bg-red-50 text-red-700' : 'text-gray-700'
                  } flex w-full items-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium transition-colors`}
                >
                  <LogOut size={18} className={focus ? 'text-red-500' : 'text-gray-400'} />
                  Sair
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </header>
  );
}

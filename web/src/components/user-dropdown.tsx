"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/config/firebaseConfig";
import { LogOut } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const UserDropdown = () => {
  const [user] = useAuthState(auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex w-full items-center justify-center md:justify-start">
          <img
            height={36}
            width={36}
            src={user?.photoURL || ""}
            alt="SRM AP Logo"
            className="rounded-full"
          />
          <div className="ml-2 hidden flex-col items-start md:flex">
            <p className="text-xs font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-300">
              {user?.displayName}
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut(auth)}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

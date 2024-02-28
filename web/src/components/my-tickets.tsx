import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebaseConfig";
import { CalendarClockIcon, KeyIcon, MailIcon } from "lucide-react";
import { QRCodeDialog } from "./qrcode-dialog";

export default function MyTickets() {
  const [user] = useAuthState(auth);

  return (
    <div className="mt-8 space-y-3 ">
      {[...Array(3)].map((_, i) => (
        <Card className="relative rounded-lg shadow-lg font-mono" key={i}>
          <div className="absolute inset-0 z-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <CardHeader className="pt-4 pb-1">
            <CardTitle className="text-lg font-light">
              DAY {i + 1} - PRO SHOW TICKET
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-xl font-semibold font-mono">
                @
                {user?.displayName
                  ?.toUpperCase()
                  .split(" ")
                  .join("")
                  .slice(0, 7)}
              </div>

              <div className="space-y-2 pt-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-x-2">
                  <MailIcon className="inline-block w-4 h-4" />
                  {user?.email}
                </div>
                <div className="flex items-center gap-x-2">
                  <KeyIcon className="inline-block w-4 h-4" />
                  SRMAP_ID-{user?.uid}
                </div>
                <div className="flex items-center gap-x-2">
                  <CalendarClockIcon className="inline-block w-4 h-4" />
                  24th March 2024 | 6:00 AM - 11:59 PM IST{" "}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end items-center space-x-3">
            <div className="z-10">
              <QRCodeDialog />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

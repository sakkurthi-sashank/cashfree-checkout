import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCodeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { QRCodeSVG } from "qrcode.react";

export function QRCodeDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex items-center gap-x-1 z-10" size="sm">
          <QrCodeIcon className="inline-block w-4 h-4" />
          View QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center mt-4 space-y-9">
          <QRCodeSVG
            value={"1"}
            size={300}
            bgColor="#ffffff"
            fgColor="#000000"
            level="L"
            includeMargin={false}
          />
          <DialogClose>
            <Button onClick={close} color="red">
              Close QR Code
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

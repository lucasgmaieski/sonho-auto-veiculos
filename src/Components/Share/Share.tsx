"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/Components/ui/dialog"
  import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramIcon,
    WhatsappIcon,
    TwitterIcon,
    LinkedinIcon,
  } from "react-share";
  import { FaCheck } from "react-icons/fa";
  import { LuShare2 } from "react-icons/lu";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CopyIcon } from "lucide-react";
import { useRef, useState } from "react";

  
export default function Share({title}: {title: string}) {
    const [copySuccess, setCopySuccess] = useState(false);
    const inputRef = useRef(null);

    function copyToClipboard(e) {
      inputRef.current.select();
      document.execCommand('copy');
      e.target.focus();
      setCopySuccess(true);
      setInterval(() =>{
        setCopySuccess(false);
      }, 2000)
    };

    return (
        <Dialog>
            <DialogTrigger><LuShare2 className="bg-blue-600 text-white text-3xl p-1 rounded-lg"/></DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="mb-3 text-xl">Compartilhe na suas redes sociais</DialogTitle>
                    <DialogDescription className="flex gap-1">
                        
                        <WhatsappShareButton url={location.href} title={title}><WhatsappIcon size={45} borderRadius={8} /></WhatsappShareButton>
                        <TelegramShareButton url={location.href} title={title}><TelegramIcon size={45} borderRadius={8} /></TelegramShareButton>
                        <FacebookShareButton url={location.href} title={title}><FacebookIcon size={45} borderRadius={8} /></FacebookShareButton>
                        <TwitterShareButton url={location.href} title={title}><TwitterIcon size={45} borderRadius={8} /></TwitterShareButton>
                        <LinkedinShareButton url={location.href} title={title}><LinkedinIcon size={45} borderRadius={8} /></LinkedinShareButton>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                        Link
                        </Label>
                        <Input
                            id="link"
                            ref={inputRef}
                            defaultValue={location.href}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="lg" className="px-3" onClick={copyToClipboard} disabled={copySuccess}>
                        <span className="sr-only">Copy</span>
                        
                        {copySuccess ? <FaCheck className="h-5 w-5"/> : <CopyIcon className="h-5 w-5" />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
      
    );
}
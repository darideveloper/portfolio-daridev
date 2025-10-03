"use client";

import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa6";

type ShareConfig = {
  name: string;
  Button: React.ComponentType<any>;
  icon: React.ReactNode;
};

type ShareButtonsProps = {
  title?: string;
  url?: string;
};

const getCurrentUrl = () =>
  typeof window !== "undefined" ? window.location.href : "";

const shareConfigs: ShareConfig[] = [
  {
    name: "Facebook",
    Button: FacebookShareButton,
    icon: <FaFacebookF size={24} />
  },
  {
    name: "Twitter",
    Button: TwitterShareButton,
    icon: <FaXTwitter size={24} />
  },
  {
    name: "LinkedIn",
    Button: LinkedinShareButton,
    icon: <FaLinkedinIn size={24} />
  },
  {
    name: "WhatsApp",
    Button: WhatsappShareButton,
    icon: <FaWhatsapp size={24} />
  },
  {
    name: "Telegram",
    Button: TelegramShareButton,
    icon: <FaTelegram size={24} />
  },
];

const ShareButtons: React.FC<ShareButtonsProps> = ({
  title = "Check this out!",
  url,
}) => {
  const shareUrl = url || getCurrentUrl();

  return (
    <div className="flex gap-3 items-center">
      {shareConfigs.map(({ name, Button, icon }) => (
        <Button
          key={name}
          url={shareUrl}
          title={title}
          quote={title}
          separator=" - "
        >
          <span
            className={`text-white rounded-full p-4`}
            aria-label={`Share on ${name}`}
          >
            {icon}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default ShareButtons;

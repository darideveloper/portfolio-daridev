'use client';

import { IconButton } from "@/once-ui/components";
import { getBranding } from "@/app/resources/branding";
import styles from './WhatsAppButton.module.scss';
import { useTranslations } from "next-intl";

interface WhatsAppButtonProps {
  brand: '3s' | 'daridev';
}

export const WhatsAppButton = ({ brand }: WhatsAppButtonProps) => {
  const t = useTranslations();
  const branding = getBranding(brand);
  const whatsappNumber = branding.contact.phone;
  
  // Generate WhatsApp link with optional pre-filled message using official API format
  const defaultMessage = t('common.whatsappMessage') || 'Hi! I\'m interested in your services.';
  const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(defaultMessage)}`;

  const handleClick = () => {
    // Track WhatsApp button click for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: brand,
      });
    }
  };

  return (
    <div className={styles.whatsappContainer}>
      <IconButton
        href={whatsappLink}
        icon="whatsapp"
        tooltip={t('common.chatWhatsApp') || 'Chat on WhatsApp'}
        size="l"
        variant="primary"
        className={styles.whatsappButton}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      />
    </div>
  );
};


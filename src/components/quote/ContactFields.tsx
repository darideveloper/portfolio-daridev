"use client";

import { Flex, Input } from '@/once-ui/components';
import { useTranslations } from 'next-intl';

interface ContactFieldsProps {
    clientInfo: {
        name: string;
        email: string;
        company?: string;
        phone?: string;
    };
    onClientInfoChange: (field: string, value: string) => void;
}

export function ContactFields({ clientInfo, onClientInfoChange }: ContactFieldsProps) {
    const t = useTranslations();

    return (
        <Flex
            direction="column"
            gap="m">
            <Input
                id="name"
                label={t('quote.form.name')}
                value={clientInfo.name}
                onChange={(e) => onClientInfoChange('name', e.target.value)}
                required
            />
            <Input
                id="email"
                type="email"
                label={t('quote.form.email')}
                value={clientInfo.email}
                onChange={(e) => onClientInfoChange('email', e.target.value)}
                required
            />
            <Input
                id="company"
                label={t('quote.form.company')}
                value={clientInfo.company || ''}
                onChange={(e) => onClientInfoChange('company', e.target.value)}
            />
            <Input
                id="phone"
                label={t('quote.form.phone')}
                value={clientInfo.phone || ''}
                onChange={(e) => onClientInfoChange('phone', e.target.value)}
            />
        </Flex>
    );
}

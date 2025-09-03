"use client";

import { Flex, Input, Textarea, Text } from '@/once-ui/components';
import { useTranslations } from 'next-intl';
import { ClientInfoFormProps } from '@/types/quote';

export function ClientInfoForm({ 
    clientInfo, 
    customFeatures, 
    questions, 
    onClientInfoChange, 
    onCustomFeaturesChange, 
    onQuestionsChange 
}: ClientInfoFormProps) {
    const t = useTranslations();

    return (
        <Flex
            direction="column"
            gap="l"
            fillWidth>
            <Flex
                direction="column"
                gap="m">
                <Text variant="body-default-m" weight="strong">
                    Contact Information
                </Text>
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
            </Flex>
            
            <Flex
                direction="column"
                gap="m">
                <Text variant="body-default-m" weight="strong">
                    {t('quote.form.customFeatures')}
                </Text>
                <Textarea
                    id="customFeatures"
                    label={t('quote.form.customFeatures')}
                    placeholder={t('quote.form.customFeaturesPlaceholder')}
                    value={customFeatures}
                    onChange={(e) => onCustomFeaturesChange(e.target.value)}
                    rows={3}
                />
            </Flex>
            
            <Flex
                direction="column"
                gap="m">
                <Text variant="body-default-m" weight="strong">
                    {t('quote.form.questions')}
                </Text>
                <Textarea
                    id="questions"
                    label={t('quote.form.questions')}
                    placeholder={t('quote.form.questionsPlaceholder')}
                    value={questions}
                    onChange={(e) => onQuestionsChange(e.target.value)}
                    rows={3}
                />
            </Flex>
        </Flex>
    );
}

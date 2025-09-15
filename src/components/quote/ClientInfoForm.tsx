"use client";

import { Flex, Textarea, Text } from '@/once-ui/components';
import { useTranslations } from 'next-intl';
import { ClientInfoFormProps } from '@/types/quote';
import { ContactFields } from './ContactFields';

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
                <ContactFields
                    clientInfo={clientInfo}
                    onClientInfoChange={onClientInfoChange}
                />
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

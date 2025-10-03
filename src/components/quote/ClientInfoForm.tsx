"use client";

import { Flex, Textarea, Text } from '@/once-ui/components';
import { useTranslations } from 'next-intl';
import { ClientInfoFormProps, ValidationErrors } from '@/types/quote';
import { ContactFields } from './ContactFields';

export function ClientInfoForm({ 
    clientInfo, 
    customFeatures, 
    questions, 
    onClientInfoChange, 
    onCustomFeaturesChange, 
    onQuestionsChange,
    validationErrors 
}: ClientInfoFormProps & { validationErrors?: ValidationErrors['clientInfo'] }) {
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
                    validationErrors={validationErrors}
                />
                <Textarea
                    id="customFeatures"
                    label={t('quote.form.customFeatures')}
                    placeholder={t('quote.form.customFeaturesPlaceholder')}
                    value={customFeatures}
                    onChange={(e) => onCustomFeaturesChange(e.target.value)}
                    rows={3}
                />
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

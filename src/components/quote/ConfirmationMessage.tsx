"use client";

import { Flex, Text, Button, Icon } from '@/once-ui/components';
import { useTranslations } from 'next-intl';
import { ConfirmationMessageProps } from '@/types/quote';

export function ConfirmationMessage({ 
    type, 
    message, 
    onRetry, 
    onNewQuote 
}: ConfirmationMessageProps) {
    const t = useTranslations();

    return (
        <Flex
            direction="column"
            gap="l"
            alignItems="center"
            paddingY="xl">
            <Icon 
                name={type === 'success' ? 'check-circle' : 'alert-circle'} 
                size="l"
                style={{
                    color: type === 'success' ? 'var(--color-success-strong)' : 'var(--color-danger-strong)'
                }}
            />
            <Text 
                variant="body-default-m" 
                align="center"
                style={{
                    color: type === 'success' ? 'var(--color-success-strong)' : 'var(--color-danger-strong)'
                }}>
                {message}
            </Text>
            {type === 'success' && (
                <Flex
                    direction="column"
                    gap="m"
                    alignItems="center"
                    padding="l"
                    style={{
                        backgroundColor: 'var(--color-neutral-weak)',
                        borderRadius: 'var(--border-radius-m)',
                        border: '1px solid var(--color-neutral-medium)',
                        maxWidth: 'var(--responsive-width-s)'
                    }}>
                    <Text 
                        variant="body-default-s" 
                        align="center"
                        onBackground="neutral-strong"
                        weight="strong">
                        {t('quote.form.approximation.title')}
                    </Text>
                    <Text 
                        variant="body-default-s" 
                        align="center"
                        onBackground="neutral-medium">
                        {t('quote.form.approximation.description')}
                    </Text>
                </Flex>
            )}
            <Flex gap="m">
                {type === 'error' && onRetry && (
                    <Button variant="primary" onClick={onRetry}>
                        Try Again
                    </Button>
                )}
                {onNewQuote && (
                    <Button variant="tertiary" onClick={onNewQuote}>
                        New Quote
                    </Button>
                )}
            </Flex>
        </Flex>
    );
}

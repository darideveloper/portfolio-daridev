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

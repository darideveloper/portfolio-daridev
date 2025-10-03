"use client";

import { Flex, Text } from '@/once-ui/components';
import { PriceDisplayProps } from '@/types/quote';

export function PriceDisplay({ totalPrice, currency }: PriceDisplayProps) {
    const formatPrice = (price: number, currency: 'USD' | 'MXN') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(price);
    };

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            paddingY="m"
            paddingX="l"
            style={{
                backgroundColor: 'var(--color-brand-weak)',
                borderRadius: 'var(--border-radius-m)',
                border: '2px solid var(--color-brand-strong)',
                minWidth: '200px',
            }}>
            <Text 
                variant="body-default-s" 
                weight="strong"
                style={{
                    color: 'var(--color-brand-strong)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                Estimated Total
            </Text>
            <Text 
                variant="display-strong-m"
                style={{
                    color: 'var(--color-brand-strong)',
                    margin: 0,
                }}>
                {formatPrice(totalPrice, currency)}
            </Text>
        </Flex>
    );
}

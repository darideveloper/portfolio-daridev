"use client";

import { Flex, Button } from '@/once-ui/components';
import { CurrencySelectorProps } from '@/types/quote';

export function CurrencySelector({ currency, onCurrencyChange }: CurrencySelectorProps) {
    return (
        <Flex
            gap="xs"
            style={{
                backgroundColor: 'var(--color-neutral-weak)',
                borderRadius: 'var(--border-radius-s)',
                padding: '2px',
                border: '1px solid var(--color-neutral-medium)',
            }}>
            <Button
                variant={currency === 'USD' ? 'primary' : 'tertiary'}
                size="s"
                onClick={() => onCurrencyChange('USD')}
                style={{
                    minWidth: '60px',
                    borderRadius: 'var(--border-radius-xs)',
                }}>
                USD
            </Button>
            <Button
                variant={currency === 'MXN' ? 'primary' : 'tertiary'}
                size="s"
                onClick={() => onCurrencyChange('MXN')}
                style={{
                    minWidth: '60px',
                    borderRadius: 'var(--border-radius-xs)',
                }}>
                MXN
            </Button>
        </Flex>
    );
}

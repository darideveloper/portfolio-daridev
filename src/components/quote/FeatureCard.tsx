"use client";

import { Flex, Text, Button, Icon } from '@/once-ui/components';
import { useTranslations } from 'next-intl';
import { FeatureCardProps } from '@/types/quote';
import { getFeaturePrice } from '@/app/resources/pricing';

export function FeatureCard({ 
    feature, 
    selected, 
    currency, 
    sectionCount, 
    onToggle 
}: FeatureCardProps) {
    const t = useTranslations();
    
    const price = getFeaturePrice(feature.id, currency, sectionCount);
    
    const formatPrice = (price: number, currency: 'USD' | 'MXN') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(price);
    };

    return (
        <Flex
            direction="column"
            gap="m"
            padding="m"
            style={{
                border: selected ? '2px solid var(--color-brand-strong)' : '1px solid var(--color-neutral-weak)',
                borderRadius: 'var(--border-radius-m)',
                backgroundColor: selected ? 'var(--color-brand-weak)' : 'transparent',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
            }}
            onClick={onToggle}>
            <Flex
                justifyContent="space-between"
                alignItems="center">
                <Flex alignItems="center" gap="s">
                    <Icon name={feature.icon} size="s" />
                    <Text variant="body-default-m" weight="strong">
                        {t(`quote.features.${feature.name}.name`)}
                    </Text>
                </Flex>
                <Text variant="body-default-m" weight="strong">
                    {formatPrice(price, currency)}
                </Text>
            </Flex>
            <Text variant="body-default-s" onBackground="neutral-weak">
                {t(`quote.features.${feature.name}.description`)}
            </Text>
            <Button
                variant={selected ? 'secondary' : 'tertiary'}
                size="s"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
                fillWidth>
                {selected ? 'Selected' : 'Select'}
            </Button>
        </Flex>
    );
}

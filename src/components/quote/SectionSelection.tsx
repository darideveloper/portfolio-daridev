"use client";

import { Flex, Heading, Text, Button, Icon } from '@/once-ui/components';
import { useTranslations } from 'next-intl';
import { SectionSelectionProps, WebsiteSection } from '@/types/quote';
import { SECTION_CATEGORIES, getSectionsByCategory, getRequiredSections } from '@/app/resources/sections';

export function SectionSelection({ 
    selectedSections, 
    extraSections, 
    onSectionToggle, 
    onExtraSectionsChange,
    onNext,
    onPrevious 
}: SectionSelectionProps) {
    const t = useTranslations();

    const requiredSections = getRequiredSections();
    const totalSelectedSections = selectedSections.length + extraSections;

    return (
        <Flex
            fillWidth
            direction="column"
            gap="xl">
            <Flex
                fillWidth
                direction="column"
                gap="m"
                alignItems="center">
                <Heading
                    as="h3"
                    variant="display-strong-s"
                    align="center">
                    Select Website Sections
                </Heading>
                <Text
                    variant="body-default-m"
                    align="center"
                    onBackground="neutral-weak">
                    Choose the sections you want for your website. Each section costs $20 USD.
                </Text>
                <Text
                    variant="body-default-s"
                    weight="strong"
                    style={{
                        color: 'var(--color-brand-strong)',
                    }}>
                    Total Sections: {totalSelectedSections} (${totalSelectedSections * 20} USD)
                </Text>
            </Flex>

            {/* Required Sections */}
            <Flex
                fillWidth
                direction="column"
                gap="m">
                <Heading
                    as="h4"
                    variant="heading-default-l"
                    weight="strong">
                    Required Sections (Included)
                </Heading>
                <Flex
                    fillWidth
                    gap="m"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    }}>
                    {requiredSections.map((section) => (
                        <SectionCard
                            key={section.id}
                            section={section}
                            selected={true}
                            onToggle={() => {}} // Required sections can't be toggled
                            disabled={true}
                        />
                    ))}
                </Flex>
            </Flex>

            {/* Optional Sections by Category */}
            {Object.keys(SECTION_CATEGORIES).filter(category => category !== 'core').map((categoryKey) => {
                const category = SECTION_CATEGORIES[categoryKey];
                const sections = getSectionsByCategory(categoryKey);
                
                return (
                    <Flex
                        key={categoryKey}
                        fillWidth
                        direction="column"
                        gap="m">
                        <Flex
                            alignItems="center"
                            gap="s">
                            <Icon 
                                name={getCategoryIcon(categoryKey)} 
                                size="s" 
                                style={{ color: 'var(--color-brand-strong)' }}
                            />
                            <Heading
                                as="h4"
                                variant="heading-default-l"
                                weight="strong">
                                {category.name}
                            </Heading>
                        </Flex>
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-weak">
                            {category.description}
                        </Text>
                        <Flex
                            fillWidth
                            gap="m"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            }}>
                            {sections.map((section) => (
                                <SectionCard
                                    key={section.id}
                                    section={section}
                                    selected={selectedSections.includes(section.id)}
                                    onToggle={() => onSectionToggle(section.id)}
                                />
                            ))}
                        </Flex>
                    </Flex>
                );
            })}

            {/* Extra Sections */}
            <Flex
                fillWidth
                direction="column"
                gap="m"
                paddingY="l"
                style={{
                    backgroundColor: 'var(--color-brand-weak)',
                    borderRadius: 'var(--border-radius-m)',
                    padding: 'var(--spacing-l)',
                }}>
                <Flex
                    alignItems="center"
                    gap="s">
                    <Icon 
                        name="checkCircle" 
                        size="s" 
                        style={{ color: 'var(--color-brand-strong)' }}
                    />
                    <Heading
                        as="h4"
                        variant="heading-default-l"
                        weight="strong">
                        Extra Custom Sections
                    </Heading>
                </Flex>
                <Text
                    variant="body-default-s"
                    onBackground="neutral-weak">
                    Add custom sections that are not in the list above
                </Text>
                <Flex
                    alignItems="center"
                    gap="m"
                    justifyContent="center">
                    <Button
                        variant="tertiary"
                        size="s"
                        onClick={() => onExtraSectionsChange(Math.max(0, extraSections - 1))}>
                        -
                    </Button>
                    <Text variant="body-default-m" weight="strong">
                        {extraSections} Extra Sections
                    </Text>
                    <Button
                        variant="tertiary"
                        size="s"
                        onClick={() => onExtraSectionsChange(extraSections + 1)}>
                        +
                    </Button>
                </Flex>
            </Flex>

            {/* Navigation */}
            <Flex
                fillWidth
                justifyContent="space-between"
                alignItems="center"
                paddingY="l"
                style={{
                    borderTop: '1px solid var(--color-neutral-weak)',
                }}>
                <Button
                    variant="tertiary"
                    onClick={onPrevious}>
                    {t('quote.form.previous')}
                </Button>
                
                <Button
                    variant="primary"
                    onClick={onNext}>
                    {t('quote.form.next')}
                </Button>
            </Flex>
        </Flex>
    );
}

// Helper function to get category icons
function getCategoryIcon(categoryKey: string): string {
    const categoryIcons = {
        content: 'book',
        contact: 'email',
        ecommerce: 'grid',
        special: 'checkCircle'
    };
    return categoryIcons[categoryKey] || 'home';
}

interface SectionCardProps {
    section: WebsiteSection;
    selected: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

function SectionCard({ section, selected, onToggle, disabled = false }: SectionCardProps) {
    return (
        <Flex
            direction="column"
            gap="s"
            padding="m"
            style={{
                border: selected ? '2px solid var(--color-brand-strong)' : '1px solid var(--color-neutral-weak)',
                borderRadius: 'var(--border-radius-m)',
                backgroundColor: selected ? 'var(--color-brand-weak)' : 'transparent',
                opacity: disabled ? 0.6 : 1,
                cursor: disabled ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                minHeight: '120px',
            }}
            onClick={disabled ? undefined : onToggle}>
            <Flex
                alignItems="center"
                gap="s"
                style={{ marginBottom: 'var(--spacing-xs)' }}>
                <Icon 
                    name={section.icon} 
                    size="s" 
                    style={{ 
                        color: selected ? 'var(--color-brand-strong)' : 'var(--color-neutral-medium)',
                        minWidth: '16px'
                    }}
                />
                <Text 
                    variant="body-default-s" 
                    weight="strong"
                    style={{
                        color: selected ? 'var(--color-brand-strong)' : 'var(--color-neutral-strong)'
                    }}>
                    {section.name}
                </Text>
                {disabled && (
                    <Text variant="body-default-xs" onBackground="neutral-weak">
                        (Required)
                    </Text>
                )}
            </Flex>
            <Text 
                variant="body-default-xs" 
                onBackground="neutral-weak"
                style={{ 
                    lineHeight: '1.4',
                    flex: 1
                }}>
                {section.description}
            </Text>
            {!disabled && (
                <Button
                    variant={selected ? 'secondary' : 'tertiary'}
                    size="s"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                    fillWidth
                    style={{ marginTop: 'var(--spacing-xs)' }}>
                    {selected ? 'Selected' : 'Select'}
                </Button>
            )}
        </Flex>
    );
}

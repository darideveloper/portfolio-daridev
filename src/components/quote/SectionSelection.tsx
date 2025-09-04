"use client";

import { Flex, Heading, Text, Button, Icon, Accordion } from '@/once-ui/components';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
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
    
    // State for accordion tabs (allow multiple open at once)
    const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set(['content']));
    
    const handleAccordionToggle = (accordionId: string) => {
        setOpenAccordions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(accordionId)) {
                newSet.delete(accordionId);
            } else {
                newSet.add(accordionId);
            }
            return newSet;
        });
    };

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
                    {t('quote.sections.title')}
                </Heading>
                <Text
                    variant="body-default-m"
                    align="center"
                    onBackground="neutral-weak">
                    {t('quote.sections.description')}
                </Text>
                <Text
                    variant="body-default-s"
                    weight="strong"
                    style={{
                        color: 'var(--color-brand-strong)',
                    }}>
                    {t('quote.sections.totalSections')}: {totalSelectedSections} (${totalSelectedSections * 20} USD)
                </Text>
            </Flex>

            <Accordion
                title={t('quote.sections.requiredSections')}
                open={openAccordions.has('required')}>
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
            </Accordion>

            {Object.keys(SECTION_CATEGORIES).filter(category => category !== 'core').map((categoryKey) => {
                const category = SECTION_CATEGORIES[categoryKey];
                const sections = getSectionsByCategory(categoryKey);
                
                return (
                    <Accordion
                        key={categoryKey}
                        title={
                            <Flex alignItems="center" gap="s">
                                <Icon 
                                    name={getCategoryIcon(categoryKey)} 
                                    size="s" 
                                    style={{ color: 'var(--color-brand-strong)' }}
                                />
                                <Text variant="heading-default-l" weight="strong">
                                    {category.name}
                                </Text>
                            </Flex>
                        }
                        open={openAccordions.has(categoryKey)}>
                        <Flex
                            fillWidth
                            direction="column"
                            gap="m">
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
                    </Accordion>
                );
            })}

            <Flex
                fillWidth
                direction="column"
                gap="m"
                padding="l"
                style={{
                    border: '1px solid var(--color-neutral-weak)',
                    borderRadius: 'var(--border-radius-m)',
                    backgroundColor: 'var(--color-neutral-weakest)',
                }}>
                <Flex alignItems="center" gap="s">
                    <Icon 
                        name="checkCircle" 
                        size="s" 
                        style={{ color: 'var(--color-brand-strong)' }}
                    />
                    <Text variant="heading-default-l" weight="strong">
                        {t('quote.sections.extraCustomSections')}
                    </Text>
                </Flex>
                <Text
                    variant="body-default-s"
                    onBackground="neutral-weak">
                    {t('quote.sections.extraDescription')}
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
                            {extraSections} {t('quote.sections.extraSections')}
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
    const t = useTranslations();
    
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
                    {t(`quote.sections.sectionNames.${section.id}`)}
                </Text>
                {disabled && (
                    <Text variant="body-default-xs" onBackground="neutral-weak">
                        ({t('quote.sections.required')})
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
                {t(`quote.sections.sectionDescriptions.${section.id}`)}
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
                    {selected ? t('quote.sections.selected') : t('quote.sections.select')}
                </Button>
            )}
        </Flex>
    );
}

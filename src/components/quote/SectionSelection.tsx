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
                    {t('quote.sections.sectionsCalculation', { 
                        count: totalSelectedSections, 
                        total: totalSelectedSections * 20 
                    })}
                </Text>
                <Text
                    variant="body-default-xs"
                    onBackground="neutral-weak"
                    align="center">
                    {t('quote.sections.sectionsIncludedInTotal')}
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
                                    {t(`quote.sections.categories.${categoryKey}.name`)}
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
                                {t(`quote.sections.categories.${categoryKey}.description`)}
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
            
            {/* Section Skeleton Preview */}
            <div style={{ 
                marginTop: 'var(--spacing-xs)', 
                marginBottom: 'var(--spacing-xs)',
                padding: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <SectionSkeleton sectionId={section.id} />
            </div>
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

// Section Skeleton Preview Component
function SectionSkeleton({ sectionId }: { sectionId: string }) {
    const getSkeletonForSection = (id: string) => {
        switch (id) {
            case 'header':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                            <div style={{ width: '80px', height: '24px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ width: '50px', height: '18px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '50px', height: '18px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '50px', height: '18px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '50px', height: '18px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '1px', backgroundColor: '#e5e7eb' }} />
                    </div>
                );
            
            case 'footer':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '1px', backgroundColor: '#e5e7eb' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div style={{ width: '100px', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '80px', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ width: '24px', height: '24px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                                <div style={{ width: '24px', height: '24px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                                <div style={{ width: '24px', height: '24px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                            </div>
                        </div>
                    </div>
                );
            
            case 'hero':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ width: '100%', height: '80px', backgroundColor: '#d1d5db', borderRadius: '12px' }} />
                        <div style={{ width: '85%', height: '24px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ width: '70%', height: '18px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                        <div style={{ width: '45%', height: '36px', backgroundColor: '#3b82f6', borderRadius: '6px' }} />
                    </div>
                );
            
            case 'about':
                return (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: '#d1d5db', borderRadius: '8px', flexShrink: 0 }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                            <div style={{ width: '100%', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            <div style={{ width: '95%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            <div style={{ width: '90%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            <div style={{ width: '75%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                        </div>
                    </div>
                );
            
            case 'services':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '40px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                                <div style={{ width: '90%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '80%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '40px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                                <div style={{ width: '90%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '80%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '40px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                                <div style={{ width: '90%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '80%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                );
            
            
            case 'gallery':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                            <div style={{ width: '100%', height: '45px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                            <div style={{ width: '100%', height: '45px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                            <div style={{ width: '100%', height: '45px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        </div>
                    </div>
                );
            
            case 'testimonials':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '50px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '24px', height: '24px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                                    <div style={{ width: '80px', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '50px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '24px', height: '24px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                                    <div style={{ width: '80px', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            
            case 'team':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '50px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                                <div style={{ width: '90%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '70%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '50px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                                <div style={{ width: '90%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '70%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '50px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                                <div style={{ width: '90%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '70%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                );
            
            case 'pricing':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, padding: '8px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                <div style={{ width: '100%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '60%', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, padding: '8px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '2px solid #3b82f6' }}>
                                <div style={{ width: '100%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '60%', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, padding: '8px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                <div style={{ width: '100%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '60%', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                );
            
            case 'features':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
                                <div style={{ width: '75%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
                                <div style={{ width: '85%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
                                <div style={{ width: '80%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                );
            
            case 'stats':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, alignItems: 'center', padding: '8px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
                                <div style={{ width: '30px', height: '30px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
                                <div style={{ width: '80%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '60%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, alignItems: 'center', padding: '8px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
                                <div style={{ width: '30px', height: '30px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
                                <div style={{ width: '80%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '60%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, alignItems: 'center', padding: '8px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
                                <div style={{ width: '30px', height: '30px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
                                <div style={{ width: '80%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '60%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, alignItems: 'center', padding: '8px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
                                <div style={{ width: '30px', height: '30px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
                                <div style={{ width: '80%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '60%', height: '12px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                );
            
            case 'faq':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                                <div style={{ width: '80%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '16px', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                                <div style={{ width: '80%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '16px', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                                <div style={{ width: '80%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '16px', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                );
            
            
            
            case 'contact':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '90%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '40px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <div style={{ width: '100%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '90%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '40px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                );
            
            case 'location':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ width: '100%', height: '60px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ width: '60%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                            <div style={{ width: '35%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                        </div>
                    </div>
                );
            
            case 'social':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <div style={{ width: '36px', height: '36px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
                            <div style={{ width: '36px', height: '36px', backgroundColor: '#1da1f2', borderRadius: '50%' }} />
                            <div style={{ width: '36px', height: '36px', backgroundColor: '#0077b5', borderRadius: '50%' }} />
                            <div style={{ width: '36px', height: '36px', backgroundColor: '#e1306c', borderRadius: '50%' }} />
                        </div>
                    </div>
                );
            
            case 'whatsapp':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ 
                                width: '60px', 
                                height: '60px', 
                                backgroundColor: '#25d366', 
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <div style={{ 
                                    width: '30px', 
                                    height: '30px', 
                                    backgroundColor: '#ffffff', 
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{ 
                                        width: '20px', 
                                        height: '20px', 
                                        backgroundColor: '#25d366', 
                                        borderRadius: '4px',
                                        transform: 'rotate(45deg)'
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '80%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                    </div>
                );
            
            default:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '100%', height: '22px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ width: '100%', height: '50px', backgroundColor: '#d1d5db', borderRadius: '6px' }} />
                        <div style={{ width: '90%', height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                        <div style={{ width: '80%', height: '14px', backgroundColor: '#d1d5db', borderRadius: '4px' }} />
                    </div>
                );
        }
    };

    return (
        <div style={{ 
            opacity: 0.25,
            pointerEvents: 'none',
            width: '100%',
            maxWidth: '260px',
            transform: 'scale(0.85)',
            filter: 'blur(0.5px)'
        }}>
            {getSkeletonForSection(sectionId)}
        </div>
    );
}

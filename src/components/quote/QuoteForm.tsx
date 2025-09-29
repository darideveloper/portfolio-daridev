"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Flex, Heading, Text, Button, Checkbox } from '@/once-ui/components';
import { QuoteFormProvider, useQuoteForm } from '@/contexts/QuoteFormContext';
import { StepIndicator } from './StepIndicator';
import { PriceDisplay } from './PriceDisplay';
import { CurrencySelector } from './CurrencySelector';
import { FeatureCard } from './FeatureCard';
import { SectionSelection } from './SectionSelection';
import { ClientInfoForm } from './ClientInfoForm';
import { ConfirmationMessage } from './ConfirmationMessage';
import { getFeaturesByCategory } from '@/app/resources/pricing';

const TOTAL_STEPS = 5; // Basic, Sections, Content, Advanced, Info
const STEP_CATEGORIES = ['basic', 'sections', 'content', 'advanced', 'info'];

function QuoteFormContent() {
    const t = useTranslations();
    const params = useParams();
    const { 
        state, 
        calculateTotal, 
        updateStep, 
        toggleFeature, 
        toggleSection,
        setExtraSections,
        setCurrency,
        setSectionCount,
        updateClientInfo,
        setCustomFeatures,
        setQuestions,
        setPrivacyAccepted,
        submitForm,
        validateForm,
        clearValidationErrors,
        setValidationError
    } = useQuoteForm();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<{ type: 'success'; message: string } | null>(null);

    // Calculate total whenever dependencies change
    useEffect(() => {
        calculateTotal();
    }, [state.selectedFeatures, state.selectedSections, state.extraSections, state.currency, state.sectionCount, calculateTotal]);

    const handleNext = () => {
        if (state.currentStep < TOTAL_STEPS) {
            updateStep(state.currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (state.currentStep > 1) {
            updateStep(state.currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        // Clear any previous validation errors
        clearValidationErrors();
        
        // Validate form before submission
        const isValid = validateForm();
        if (!isValid) {
            return; // Stay on same screen, errors will be displayed inline
        }
        
        setIsSubmitting(true);
        try {
            const result = await submitForm();
            if (result.success) {
                setSubmissionResult({
                    type: 'success',
                    message: result.message
                });
            } else {
                // Handle API errors - could show inline or toast notification
                // For now, we'll handle this in the context
                console.error('Submission failed:', result.message);
            }
        } catch (error) {
            // Handle network errors
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewQuote = () => {
        setSubmissionResult(null);
        clearValidationErrors();
        updateStep(1);
        // Reset form would go here
    };

    // Only show confirmation for success
    if (submissionResult) {
        return (
            <ConfirmationMessage
                type={submissionResult.type}
                message={submissionResult.message}
                onNewQuote={handleNewQuote}
            />
        );
    }

    const currentCategory = STEP_CATEGORIES[state.currentStep - 1];
    const isLastStep = state.currentStep === TOTAL_STEPS;
    const isFirstStep = state.currentStep === 1;

    return (
        <Flex
            fillWidth
            direction="column"
            gap="xl"
            paddingY="l">
            {/* Header Section */}
            <Flex
                fillWidth
                direction="column"
                gap="m"
                alignItems="center">
                <Heading
                    as="h2"
                    variant="display-strong-m"
                    align="center">
                    {t('quote.title')}
                </Heading>
                <Text
                    variant="body-default-m"
                    align="center"
                    onBackground="neutral-weak">
                    {t('quote.description')}
                </Text>
            </Flex>
            
            {/* Progress and Controls Section */}
            <Flex
                fillWidth
                direction="column"
                gap="l"
                paddingY="l"
                style={{
                    backgroundColor: 'var(--color-neutral-weak)',
                    borderRadius: 'var(--border-radius-l)',
                    padding: 'var(--spacing-l)',
                }}>
                
                {/* Step Progress */}
                <Flex
                    fillWidth
                    justifyContent="center">
                    <StepIndicator 
                        currentStep={state.currentStep} 
                        totalSteps={TOTAL_STEPS} 
                    />
                </Flex>
                
                {/* Currency and Price Row */}
                <Flex
                    fillWidth
                    justifyContent="space-between"
                    mobileDirection='column'
                    alignItems="center"
                    gap="l"
                    style={{
                        flexWrap: 'wrap',
                    }}>
                    {/* Currency Selector */}
                    <Flex
                        alignItems="center"
                        gap="m">
                        <Text variant="body-default-s" weight="strong">
                            {t('quote.form.currency')}
                        </Text>
                        <CurrencySelector
                            currency={state.currency}
                            onCurrencyChange={setCurrency}
                        />
                    </Flex>
                    
                    {/* Price Display */}
                    <PriceDisplay
                        totalPrice={state.totalPrice}
                        currency={state.currency}
                    />
                </Flex>
            </Flex>

            {/* Form Content */}
            <Flex
                fillWidth
                direction="column"
                gap="l">
                {state.currentStep === 2 ? (
                    // Section Selection Step
                    <SectionSelection
                        selectedSections={state.selectedSections}
                        extraSections={state.extraSections}
                        onSectionToggle={toggleSection}
                        onExtraSectionsChange={setExtraSections}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                ) : state.currentStep < TOTAL_STEPS ? (
                    // Feature Selection Steps
                    <>
                        <Heading
                            as="h3"
                            variant="display-strong-s"
                            align="center">
                            {t(`quote.steps.${currentCategory}`)}
                        </Heading>
                        
                        
                        <Flex
                            fillWidth
                            gap="m"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            }}>
                            {getFeaturesByCategory(currentCategory).map((feature) => (
                                <FeatureCard
                                    key={feature.id}
                                    feature={feature}
                                    selected={state.selectedFeatures.includes(feature.id)}
                                    currency={state.currency}
                                    sectionCount={state.sectionCount}
                                    selectedSections={state.selectedSections}
                                    extraSections={state.extraSections}
                                    onToggle={() => toggleFeature(feature.id)}
                                />
                            ))}
                        </Flex>
                    </>
                ) : (
                    // Client Information Step
                    <>
                        <Heading
                            as="h3"
                            variant="display-strong-s"
                            align="center">
                            {t('quote.steps.info')}
                        </Heading>
                        
                        <ClientInfoForm
                            clientInfo={state.clientInfo}
                            customFeatures={state.customFeatures}
                            questions={state.questions}
                            onClientInfoChange={updateClientInfo}
                            onCustomFeaturesChange={setCustomFeatures}
                            onQuestionsChange={setQuestions}
                            validationErrors={state.validationErrors.clientInfo}
                        />
                        
                        <Flex
                            fillWidth
                            paddingY="m"
                            style={{
                                backgroundColor: 'var(--color-warning-weak)',
                                border: '1px solid var(--color-warning-strong)',
                                borderRadius: 'var(--border-radius-m)',
                                padding: 'var(--spacing-m)',
                            }}>
                            <Text variant="body-default-s" align="center">
                                {t('quote.form.warning')}
                            </Text>
                        </Flex>
                        
                        {/* Privacy Policy Acceptance */}
                        <Flex
                            fillWidth
                            direction="column"
                            gap="m"
                            paddingY="l"
                            style={{
                                borderTop: '1px solid var(--color-neutral-weak)',
                            }}>
                            <Flex
                                alignItems="center"
                                gap="m"
                                justifyContent="center">
                                <Checkbox
                                    isChecked={state.privacyAccepted}
                                    onToggle={() => {
                                        const newValue = !state.privacyAccepted;
                                        setPrivacyAccepted(newValue);
                                        // Clear privacy error when checked
                                        if (newValue) {
                                            setValidationError('privacyPolicy', undefined);
                                        }
                                    }}
                                />
                                <Text variant="body-default-s">
                                    {t('quote.form.privacyAcceptance.text')}{' '}
                                    <a 
                                        href={`/${params?.locale}/privacy`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        style={{
                                            color: 'var(--color-brand-strong)',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        {t('quote.form.privacyAcceptance.link')}
                                    </a>
                                </Text>
                            </Flex>
                            
                            {/* Privacy Policy Error Message */}
                            {state.validationErrors.privacyPolicy && (
                                <Flex
                                    fillWidth
                                    paddingY="m"
                                    style={{
                                        backgroundColor: 'var(--color-danger-weak)',
                                        border: '1px solid var(--color-danger-strong)',
                                        borderRadius: 'var(--border-radius-m)',
                                        padding: 'var(--spacing-m)',
                                    }}>
                                    <Text 
                                        variant="body-default-s" 
                                        align="center"
                                        style={{
                                            color: 'var(--color-danger-strong)',
                                        }}>
                                        {state.validationErrors.privacyPolicy}
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </>
                )}
            </Flex>
            
            {/* Navigation Buttons - Only show for non-section selection steps */}
            {state.currentStep !== 2 && (
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
                        onClick={handlePrevious}
                        disabled={isFirstStep}>
                        {t('quote.form.previous')}
                    </Button>
                    
                    {isLastStep ? (
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            loading={isSubmitting}
                            disabled={!state.privacyAccepted || !state.clientInfo.name.trim() || !state.clientInfo.email.trim()}>
                            {t('quote.form.submit')}
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleNext}>
                            {t('quote.form.next')}
                        </Button>
                    )}
                </Flex>
            )}
        </Flex>
    );
}

export function QuoteForm() {
    return (
        <QuoteFormProvider>
            <QuoteFormContent />
        </QuoteFormProvider>
    );
}

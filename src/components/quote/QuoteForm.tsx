"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Flex, Heading, Text, Button } from '@/once-ui/components';
import { QuoteFormProvider, useQuoteForm } from '@/contexts/QuoteFormContext';
import { StepIndicator } from './StepIndicator';
import { PriceDisplay } from './PriceDisplay';
import { CurrencySelector } from './CurrencySelector';
import { FeatureCard } from './FeatureCard';
import { ClientInfoForm } from './ClientInfoForm';
import { ConfirmationMessage } from './ConfirmationMessage';
import { getFeaturesByCategory } from '@/app/resources/pricing';

const TOTAL_STEPS = 5;
const STEP_CATEGORIES = ['basic', 'content', 'advanced', 'services', 'info'];

function QuoteFormContent() {
    const t = useTranslations();
    const { 
        state, 
        calculateTotal, 
        updateStep, 
        toggleFeature, 
        setCurrency,
        setSectionCount,
        updateClientInfo,
        setCustomFeatures,
        setQuestions,
        submitForm
    } = useQuoteForm();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // Calculate total whenever dependencies change
    useEffect(() => {
        calculateTotal();
    }, [state.selectedFeatures, state.currency, state.sectionCount, calculateTotal]);

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
        setIsSubmitting(true);
        try {
            const result = await submitForm();
            setSubmissionResult({
                type: result.success ? 'success' : 'error',
                message: result.message
            });
        } catch (error) {
            setSubmissionResult({
                type: 'error',
                message: t('quote.form.error')
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewQuote = () => {
        setSubmissionResult(null);
        updateStep(1);
        // Reset form would go here
    };

    const handleRetry = () => {
        setSubmissionResult(null);
        handleSubmit();
    };

    // Show confirmation message if submission completed
    if (submissionResult) {
        return (
            <ConfirmationMessage
                type={submissionResult.type}
                message={submissionResult.message}
                onRetry={submissionResult.type === 'error' ? handleRetry : undefined}
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
                            Currency:
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
                {state.currentStep < TOTAL_STEPS ? (
                    <>
                        <Heading
                            as="h3"
                            variant="display-strong-s"
                            align="center">
                            {t(`quote.steps.${currentCategory}`)}
                        </Heading>
                        
                        {/* Section Count Input for multi-language step */}
                        {currentCategory === 'services' && (
                            <Flex
                                fillWidth
                                justifyContent="center"
                                alignItems="center"
                                gap="m"
                                paddingY="m"
                                style={{
                                    backgroundColor: 'var(--color-brand-weak)',
                                    borderRadius: 'var(--border-radius-m)',
                                    padding: 'var(--spacing-m)',
                                }}>
                                <Text variant="body-default-s" weight="strong">
                                    Number of sections for multi-language:
                                </Text>
                                <Flex
                                    alignItems="center"
                                    gap="s">
                                    <Button
                                        variant="tertiary"
                                        size="s"
                                        onClick={() => setSectionCount(Math.max(1, state.sectionCount - 1))}>
                                        -
                                    </Button>
                                    <Text variant="body-default-m" weight="strong">
                                        {state.sectionCount}
                                    </Text>
                                    <Button
                                        variant="tertiary"
                                        size="s"
                                        onClick={() => setSectionCount(state.sectionCount + 1)}>
                                        +
                                    </Button>
                                </Flex>
                            </Flex>
                        )}
                        
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
                                    onToggle={() => toggleFeature(feature.id)}
                                />
                            ))}
                        </Flex>
                    </>
                ) : (
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
                    </>
                )}
            </Flex>
            
            {/* Navigation Buttons */}
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
                        loading={isSubmitting}>
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

"use client";

import { Flex, Text } from '@/once-ui/components';
import { StepIndicatorProps } from '@/types/quote';

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <Flex
            fillWidth
            justifyContent="center"
            alignItems="center"
            gap="m"
            paddingY="m">
            {/* Step Dots */}
            <Flex
                alignItems="center"
                gap="s">
                {Array.from({ length: totalSteps }, (_, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;
                    
                    return (
                        <Flex
                            key={stepNumber}
                            alignItems="center"
                            justifyContent="center"
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: isActive 
                                    ? 'var(--color-brand-strong)' 
                                    : isCompleted 
                                        ? 'var(--color-success-strong)' 
                                        : 'var(--color-neutral-weak)',
                                color: isActive || isCompleted 
                                    ? 'var(--color-neutral-strong)' 
                                    : 'var(--color-neutral-medium)',
                                border: isActive 
                                    ? '2px solid var(--color-brand-strong)' 
                                    : '2px solid var(--color-neutral-medium)',
                                transition: 'all 0.3s ease',
                                cursor: 'default',
                            }}>
                            <Text 
                                variant="body-default-s" 
                                weight="strong"
                                style={{
                                    color: 'inherit',
                                }}>
                                {isCompleted ? '✓' : stepNumber}
                            </Text>
                        </Flex>
                    );
                })}
            </Flex>
            
            {/* Step Text */}
            <Text variant="body-default-s" onBackground="neutral-weak">
                Step {currentStep} of {totalSteps}
            </Text>
        </Flex>
    );
}

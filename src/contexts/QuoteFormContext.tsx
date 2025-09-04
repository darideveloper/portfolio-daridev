"use client";

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { 
    QuoteFormState, 
    QuoteFormContextType, 
    Currency, 
    ClientInfo,
    QuoteSubmission 
} from '@/types/quote';
import { calculateTotalPrice } from '@/app/resources/pricing';

// Initial state
const initialState: QuoteFormState = {
    currentStep: 1,
    selectedFeatures: [],
    selectedSections: [],
    extraSections: 0,
    currency: 'USD',
    sectionCount: 1,
    clientInfo: {
        name: '',
        email: '',
        company: '',
        phone: ''
    },
    customFeatures: '',
    questions: '',
    totalPrice: 0
};

// Action types
type QuoteFormAction =
    | { type: 'UPDATE_STEP'; payload: number }
    | { type: 'TOGGLE_FEATURE'; payload: string }
    | { type: 'TOGGLE_SECTION'; payload: string }
    | { type: 'SET_EXTRA_SECTIONS'; payload: number }
    | { type: 'SET_CURRENCY'; payload: Currency }
    | { type: 'SET_SECTION_COUNT'; payload: number }
    | { type: 'UPDATE_CLIENT_INFO'; payload: { field: keyof ClientInfo; value: string } }
    | { type: 'SET_CUSTOM_FEATURES'; payload: string }
    | { type: 'SET_QUESTIONS'; payload: string }
    | { type: 'CALCULATE_TOTAL' }
    | { type: 'RESET_FORM' };

// Reducer
const quoteFormReducer = (state: QuoteFormState, action: QuoteFormAction): QuoteFormState => {
    switch (action.type) {
        case 'UPDATE_STEP':
            return { ...state, currentStep: action.payload };
        
        case 'TOGGLE_FEATURE':
            const featureId = action.payload;
            const isFeatureSelected = state.selectedFeatures.includes(featureId);
            const newSelectedFeatures = isFeatureSelected
                ? state.selectedFeatures.filter(id => id !== featureId)
                : [...state.selectedFeatures, featureId];
            
            return { ...state, selectedFeatures: newSelectedFeatures };
        
        case 'TOGGLE_SECTION':
            const sectionId = action.payload;
            const isSectionSelected = state.selectedSections.includes(sectionId);
            const newSelectedSections = isSectionSelected
                ? state.selectedSections.filter(id => id !== sectionId)
                : [...state.selectedSections, sectionId];
            
            return { ...state, selectedSections: newSelectedSections };
        
        case 'SET_EXTRA_SECTIONS':
            return { ...state, extraSections: action.payload };
        
        case 'SET_CURRENCY':
            return { ...state, currency: action.payload };
        
        case 'SET_SECTION_COUNT':
            return { ...state, sectionCount: action.payload };
        
        case 'UPDATE_CLIENT_INFO':
            return {
                ...state,
                clientInfo: {
                    ...state.clientInfo,
                    [action.payload.field]: action.payload.value
                }
            };
        
        case 'SET_CUSTOM_FEATURES':
            return { ...state, customFeatures: action.payload };
        
        case 'SET_QUESTIONS':
            return { ...state, questions: action.payload };
        
        case 'CALCULATE_TOTAL':
            const totalPrice = calculateTotalPrice(
                state.selectedFeatures,
                state.currency,
                state.sectionCount,
                state.selectedSections,
                state.extraSections
            );
            return { ...state, totalPrice };
        
        case 'RESET_FORM':
            return initialState;
        
        default:
            return state;
    }
};

// Context
const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined);

// Provider component
export const QuoteFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(quoteFormReducer, initialState);
    const t = useTranslations();

    const updateStep = useCallback((step: number) => {
        dispatch({ type: 'UPDATE_STEP', payload: step });
    }, []);

    const toggleFeature = useCallback((featureId: string) => {
        dispatch({ type: 'TOGGLE_FEATURE', payload: featureId });
        // Recalculate total after feature change
        setTimeout(() => dispatch({ type: 'CALCULATE_TOTAL' }), 0);
    }, []);

    const toggleSection = useCallback((sectionId: string) => {
        dispatch({ type: 'TOGGLE_SECTION', payload: sectionId });
        // Recalculate total after section change
        setTimeout(() => dispatch({ type: 'CALCULATE_TOTAL' }), 0);
    }, []);

    const setExtraSections = useCallback((count: number) => {
        dispatch({ type: 'SET_EXTRA_SECTIONS', payload: count });
        // Recalculate total after extra sections change
        setTimeout(() => dispatch({ type: 'CALCULATE_TOTAL' }), 0);
    }, []);

    const setCurrency = useCallback((currency: Currency) => {
        dispatch({ type: 'SET_CURRENCY', payload: currency });
        // Recalculate total after currency change
        setTimeout(() => dispatch({ type: 'CALCULATE_TOTAL' }), 0);
    }, []);

    const setSectionCount = useCallback((count: number) => {
        dispatch({ type: 'SET_SECTION_COUNT', payload: count });
        // Recalculate total after section count change
        setTimeout(() => dispatch({ type: 'CALCULATE_TOTAL' }), 0);
    }, []);

    const updateClientInfo = useCallback((field: keyof ClientInfo, value: string) => {
        dispatch({ type: 'UPDATE_CLIENT_INFO', payload: { field, value } });
    }, []);

    const setCustomFeatures = useCallback((features: string) => {
        dispatch({ type: 'SET_CUSTOM_FEATURES', payload: features });
    }, []);

    const setQuestions = useCallback((questions: string) => {
        dispatch({ type: 'SET_QUESTIONS', payload: questions });
    }, []);

    const calculateTotal = useCallback(() => {
        dispatch({ type: 'CALCULATE_TOTAL' });
    }, []);

    const resetForm = useCallback(() => {
        dispatch({ type: 'RESET_FORM' });
    }, []);

    const submitForm = useCallback(async (): Promise<{ success: boolean; message: string }> => {
        try {
            const submissionData: QuoteSubmission = {
                selectedFeatures: state.selectedFeatures,
                selectedSections: state.selectedSections,
                extraSections: state.extraSections,
                currency: state.currency,
                sectionCount: state.sectionCount,
                totalPrice: state.totalPrice,
                clientInfo: state.clientInfo,
                customFeatures: state.customFeatures,
                questions: state.questions,
                timestamp: new Date().toISOString()
            };

            const response = await fetch('/api/quote-submission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                return {
                    success: true,
                    message: t('quote.form.success')
                };
            } else {
                return {
                    success: false,
                    message: t('quote.form.error')
                };
            }
        } catch (error) {
            return {
                success: false,
                message: t('quote.form.error')
            };
        }
    }, [state, t]);

    const contextValue: QuoteFormContextType = {
        state,
        updateStep,
        toggleFeature,
        toggleSection,
        setExtraSections,
        setCurrency,
        setSectionCount,
        updateClientInfo,
        setCustomFeatures,
        setQuestions,
        calculateTotal,
        resetForm,
        submitForm
    };

    return (
        <QuoteFormContext.Provider value={contextValue}>
            {children}
        </QuoteFormContext.Provider>
    );
};

// Hook to use the context
export const useQuoteForm = (): QuoteFormContextType => {
    const context = useContext(QuoteFormContext);
    if (context === undefined) {
        throw new Error('useQuoteForm must be used within a QuoteFormProvider');
    }
    return context;
};

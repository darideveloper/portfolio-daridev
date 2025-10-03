"use client";

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { 
    QuoteFormState, 
    QuoteFormContextType, 
    Currency, 
    ClientInfo,
    QuoteSubmission,
    ValidationErrors
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
    totalPrice: 0,
    privacyAccepted: false,
    validationErrors: {}
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
    | { type: 'SET_PRIVACY_ACCEPTED'; payload: boolean }
    | { type: 'CALCULATE_TOTAL' }
    | { type: 'RESET_FORM' }
    | { type: 'SET_VALIDATION_ERROR'; payload: { field: keyof ValidationErrors; message: string | undefined } }
    | { type: 'CLEAR_VALIDATION_ERRORS' };

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
        
        case 'SET_PRIVACY_ACCEPTED':
            return { ...state, privacyAccepted: action.payload };
        
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
        
        case 'SET_VALIDATION_ERROR':
            return {
                ...state,
                validationErrors: {
                    ...state.validationErrors,
                    [action.payload.field]: action.payload.message
                }
            };
        
        case 'CLEAR_VALIDATION_ERRORS':
            return {
                ...state,
                validationErrors: {}
            };
        
        default:
            return state;
    }
};

// Validation helper functions
const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const validateClientInfo = (clientInfo: ClientInfo): Partial<ValidationErrors['clientInfo']> => {
    const errors: Partial<ValidationErrors['clientInfo']> = {};
    
    if (!clientInfo.name.trim()) {
        errors.name = 'Name is required';
    }
    
    if (!clientInfo.email.trim()) {
        errors.email = 'Email is required';
    } else if (!validateEmail(clientInfo.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    return errors;
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

    const setPrivacyAccepted = useCallback((accepted: boolean) => {
        dispatch({ type: 'SET_PRIVACY_ACCEPTED', payload: accepted });
    }, []);

    const calculateTotal = useCallback(() => {
        dispatch({ type: 'CALCULATE_TOTAL' });
    }, []);

    const resetForm = useCallback(() => {
        dispatch({ type: 'RESET_FORM' });
    }, []);

    const validateForm = useCallback((): boolean => {
        const clientInfoErrors = validateClientInfo(state.clientInfo);
        const hasClientInfoErrors = clientInfoErrors && Object.keys(clientInfoErrors).length > 0;
        const hasPrivacyError = !state.privacyAccepted;
        
        // Set validation errors
        dispatch({ 
            type: 'SET_VALIDATION_ERROR', 
            payload: { field: 'clientInfo', message: hasClientInfoErrors ? JSON.stringify(clientInfoErrors) : undefined }
        });
        dispatch({ 
            type: 'SET_VALIDATION_ERROR', 
            payload: { field: 'privacyPolicy', message: hasPrivacyError ? 'You must accept the Privacy Policy to submit your quote.' : undefined }
        });
        
        return !hasClientInfoErrors && !hasPrivacyError;
    }, [state.clientInfo, state.privacyAccepted]);

    const clearValidationErrors = useCallback(() => {
        dispatch({ type: 'CLEAR_VALIDATION_ERRORS' });
    }, []);

    const setValidationError = useCallback((field: keyof ValidationErrors, message: string | undefined) => {
        dispatch({ type: 'SET_VALIDATION_ERROR', payload: { field, message } });
    }, []);

    const submitForm = useCallback(async (): Promise<{ success: boolean; message: string }> => {
        try {
            // Privacy policy and form validation are now handled by validateForm()
            // This method only handles API submission

            // Import pricing data to get individual item prices
            const { FEATURES } = await import('@/app/resources/pricing');
            const { WEBSITE_SECTIONS: SECTIONS } = await import('@/app/resources/sections');
            
            // Calculate individual feature prices
            const selectedFeaturePrices = state.selectedFeatures.map(featureId => {
                const feature = FEATURES[featureId];
                return {
                    id: featureId,
                    name: feature?.name || featureId,
                    price: feature?.usdPrice || 0,
                    category: feature?.category || 'unknown'
                };
            });

            // Calculate individual section prices (each section costs $20 USD)
            const selectedSectionPrices = state.selectedSections.map(sectionId => {
                const section = SECTIONS[sectionId];
                return {
                    id: sectionId,
                    name: section?.name || sectionId,
                    price: 20, // Each section costs $20 USD
                    category: section?.category || 'unknown'
                };
            });

            // Calculate extra sections price
            const extraSectionsPrice = state.extraSections * 20; // Each extra section costs $20 USD

            // Create formatted email body (spam-safe format - no numbers with USD)
            const formatPrice = (price: number) => `Price: ${price}`;
            
            const emailBody = `
NEW QUOTE REQUEST

CLIENT INFORMATION
Name: ${state.clientInfo.name}
Email: ${state.clientInfo.email}
Company: ${state.clientInfo.company || 'Not provided'}
Phone: ${state.clientInfo.phone || 'Not provided'}

QUOTE SUMMARY
Currency: ${state.currency}
Total Price: ${state.totalPrice}
Selected Sections: ${state.selectedSections.length}
Extra Sections: ${state.extraSections}
Extra Sections Price: ${extraSectionsPrice}

SELECTED FEATURES
${selectedFeaturePrices.length > 0 ? selectedFeaturePrices.map(feature => 
  `- ${feature.name} (${feature.category}) - Price: ${feature.price}`
).join('\n') : 'No features selected'}

SELECTED SECTIONS
${selectedSectionPrices.length > 0 ? selectedSectionPrices.map(section => 
  `- ${section.name} (${section.category}) - Price: ${section.price}`
).join('\n') : 'No sections selected'}

${state.customFeatures ? `CUSTOM FEATURES\n${state.customFeatures}\n` : ''}
${state.questions ? `QUESTIONS\n${state.questions}\n` : ''}

Submitted: ${new Date().toLocaleString()}
            `.trim();

            // Get API configuration from environment variables
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://services.darideveloper.com/contact-form/';
            const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'aHR9zwVL5r3a8Lo6qRy2v5A';
            const apiUser = process.env.NEXT_PUBLIC_API_USER || 'daridev';

            // Prepare the submission data for the external API
            const submissionData = {
                api_key: apiKey,
                user: apiUser,
                subject: "New Quote Requested",
                message: emailBody,
                // Keep JSON data for API processing if needed
                client_name: state.clientInfo.name,
                client_email: state.clientInfo.email,
                client_company: state.clientInfo.company || '',
                client_phone: state.clientInfo.phone || '',
                currency: state.currency,
                total_price: state.totalPrice,
                section_count: state.selectedSections.length,
                extra_sections: state.extraSections,
                extra_sections_price: extraSectionsPrice,
                selected_features: selectedFeaturePrices,
                selected_sections: selectedSectionPrices,
                custom_features: state.customFeatures || '',
                questions: state.questions || '',
                timestamp: new Date().toISOString()
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                const result = await response.json();
                return {
                    success: true,
                    message: t('quote.form.success')
                };
            } else {
                const errorData = await response.json().catch(() => ({}));
                return {
                    success: false,
                    message: errorData.message || t('quote.form.error')
                };
            }
        } catch (error) {
            console.error('Quote submission error:', error);
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
        setPrivacyAccepted,
        calculateTotal,
        resetForm,
        submitForm,
        validateForm,
        clearValidationErrors,
        setValidationError
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

// TypeScript interfaces for quote form

export type Currency = 'USD' | 'MXN';

export interface QuoteFormState {
    currentStep: number;
    selectedFeatures: string[];
    currency: Currency;
    sectionCount: number;
    clientInfo: ClientInfo;
    customFeatures: string;
    questions: string;
    totalPrice: number;
}

export interface ClientInfo {
    name: string;
    email: string;
    company?: string;
    phone?: string;
}

export interface Feature {
    id: string;
    name: string;
    icon: string;
    category: string;
    usdPrice: number;
    description: string;
    isPerSection?: boolean;
}

export interface FeatureCategory {
    title: string;
    features: string[];
}

export interface QuoteSubmission {
    selectedFeatures: string[];
    currency: Currency;
    sectionCount: number;
    totalPrice: number;
    clientInfo: ClientInfo;
    customFeatures: string;
    questions: string;
    timestamp: string;
}

export interface QuoteFormContextType {
    state: QuoteFormState;
    updateStep: (step: number) => void;
    toggleFeature: (featureId: string) => void;
    setCurrency: (currency: Currency) => void;
    setSectionCount: (count: number) => void;
    updateClientInfo: (field: keyof ClientInfo, value: string) => void;
    setCustomFeatures: (features: string) => void;
    setQuestions: (questions: string) => void;
    calculateTotal: () => void;
    resetForm: () => void;
    submitForm: () => Promise<{ success: boolean; message: string }>;
}

export interface FormStepProps {
    onNext: () => void;
    onPrevious: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
}

export interface FeatureCardProps {
    feature: Feature;
    selected: boolean;
    currency: Currency;
    sectionCount: number;
    onToggle: () => void;
}

export interface PriceDisplayProps {
    totalPrice: number;
    currency: Currency;
}

export interface CurrencySelectorProps {
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
}

export interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export interface ClientInfoFormProps {
    clientInfo: ClientInfo;
    customFeatures: string;
    questions: string;
    onClientInfoChange: (field: keyof ClientInfo, value: string) => void;
    onCustomFeaturesChange: (features: string) => void;
    onQuestionsChange: (questions: string) => void;
}

export interface ConfirmationMessageProps {
    type: 'success' | 'error';
    message: string;
    onRetry?: () => void;
    onNewQuote?: () => void;
}

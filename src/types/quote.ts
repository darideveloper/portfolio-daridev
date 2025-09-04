// TypeScript interfaces for quote form

export type Currency = 'USD' | 'MXN';

export interface QuoteFormState {
    currentStep: number;
    selectedFeatures: string[];
    selectedSections: string[];
    extraSections: number;
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

export interface WebsiteSection {
    id: string;
    name: string;
    icon: string;
    description: string;
    category: string;
    required?: boolean;
}

export interface FeatureCategory {
    title: string;
    features: string[];
}

export interface SectionCategory {
    name: string;
    description: string;
    sections: string[];
}

export interface QuoteSubmission {
    selectedFeatures: string[];
    selectedSections: string[];
    extraSections: number;
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
    toggleSection: (sectionId: string) => void;
    setExtraSections: (count: number) => void;
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
    selectedSections: string[];
    extraSections: number;
    onToggle: () => void;
}

export interface SectionCardProps {
    section: WebsiteSection;
    selected: boolean;
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

export interface SectionSelectionProps {
    selectedSections: string[];
    extraSections: number;
    onSectionToggle: (sectionId: string) => void;
    onExtraSectionsChange: (count: number) => void;
    onNext: () => void;
    onPrevious: () => void;
}

"use client";

import { Button, Flex, Heading, Input, Text, Textarea, Background } from '@/once-ui/components';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ContactFormProps {
    display: boolean;
}

export const ContactForm = ({ display }: ContactFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const t = useTranslations();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Get API configuration from environment variables
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://services.darideveloper.com/contact-form/';
            const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'aHR9zwVL5r3a8Lo6qRy2v5A';
            const apiUser = process.env.NEXT_PUBLIC_API_USER || 'daridev';

            // Create formatted email body (spam-safe format)
            const emailBody = `
NEW CONTACT MESSAGE

CLIENT INFORMATION
Name: ${formData.name}
Email: ${formData.email}

MESSAGE DETAILS
Subject: ${formData.subject}
Message: ${formData.message}

Submitted: ${new Date().toLocaleString()}
            `.trim();

            // Prepare the submission data for the external API
            const submissionData = {
                api_key: apiKey,
                user: apiUser,
                subject: "New Contact Message",
                message: emailBody,
                // Contact form specific data only
                client_name: formData.name,
                client_email: formData.email,
                message_subject: formData.subject,
                message_content: formData.message,
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
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                const errorData = await response.json().catch(() => ({}));
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!display) return null;

    return (
        <Flex
            style={{overflow: 'hidden'}}
            position="relative"
            fillWidth padding="xl" radius="l" marginBottom="m"
            direction="column" alignItems="center" align="center"
            background="surface" border="neutral-medium" borderStyle="solid-1">
            <Background
                position="absolute"
                mask={false}
                gradient={false}
                dots={false}
                lines={false}/>
            <Heading style={{position: 'relative'}}
                marginBottom="s"
                variant="display-strong-xs">
                {t('contact.title')}
            </Heading>
            <Text
                style={{
                    position: 'relative',
                    maxWidth: 'var(--responsive-width-xs)'
                }}
                wrap="balance"
                marginBottom="l"
                onBackground="neutral-medium">
                {t('contact.description')}
            </Text>
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                onSubmit={handleSubmit}>
                <Flex
                    fillWidth maxWidth={24} gap="m"
                    direction="column">
                    <Flex gap="m" mobileDirection="column">
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            label={t('contact.form.name')}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fillWidth
                        />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label={t('contact.form.email')}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fillWidth
                        />
                    </Flex>
                    <Input
                        id="subject"
                        name="subject"
                        type="text"
                        label={t('contact.form.subject')}
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        fillWidth
                    />
                    <Textarea
                        id="message"
                        name="message"
                        label={t('contact.form.message')}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        fillWidth
                    />
                    {submitStatus === 'success' && (
                        <Text onBackground="success-strong" variant="body-default-s">
                            {t('contact.form.success')}
                        </Text>
                    )}
                    {submitStatus === 'error' && (
                        <Text onBackground="error-strong" variant="body-default-s">
                            {t('contact.form.error')}
                        </Text>
                    )}
                    <Button
                        type="submit"
                        size="m"
                        fillWidth
                        disabled={isSubmitting}>
                        {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                    </Button>
                </Flex>
            </form>
        </Flex>
    );
};

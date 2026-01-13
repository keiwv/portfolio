"use client";

import { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import { NextIntlClientProvider } from 'next-intl';

const LanguageContext = createContext<{
    locale: string;
    messages: any;
    changeLanguage: (locale: string) => Promise<void>;
    isLoading: boolean;
}>({
    locale: 'en',
    messages: {},
    changeLanguage: async () => {},
    isLoading: false,
});

export const useLanguageContext = () => useContext(LanguageContext);

interface DynamicIntlProviderProps {
    children: ReactNode;
}

export default function DynamicIntlProvider({ children }: DynamicIntlProviderProps) {
    const [locale, setLocale] = useState('en');
    const [messages, setMessages] = useState<any>({});
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isChangingLanguage, setIsChangingLanguage] = useState(false);

    // Initialize with stored locale and messages
    useEffect(() => {
        const initializeLanguage = async () => {
            const storedLocale = localStorage.getItem('preferred-locale') || 'en';
            try {
                const initialMessages = await import(`../../messages/${storedLocale}.json`);
                setLocale(storedLocale);
                setMessages(initialMessages.default);
                setIsInitialLoading(false);
            } catch (error) {
                console.error('Failed to load initial messages:', error);
            
                const fallbackMessages = await import(`../../messages/en.json`);
                setLocale('en');
                setMessages(fallbackMessages.default);
                setIsInitialLoading(false);
            }
        };

        initializeLanguage();
    }, []);

    const changeLanguage = async (newLocale: string) => {
        if (newLocale === locale) return;
        
        try {
            setIsChangingLanguage(true);
            const newMessages = await import(`../../messages/${newLocale}.json`);
            setLocale(newLocale);
            setMessages(newMessages.default);
            localStorage.setItem('preferred-locale', newLocale);
        } catch (error) {
            console.error('Failed to load messages:', error);
        } finally {
            setIsChangingLanguage(false);
        }
    };

    // Only show loading screen on initial load, not during language changes
    if (isInitialLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <LanguageContext.Provider value={{ locale, messages, changeLanguage, isLoading: isChangingLanguage }}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </LanguageContext.Provider>
    );
}
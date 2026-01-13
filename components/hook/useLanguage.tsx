"use client";

import { useLanguageContext } from '@/components/providers/DynamicIntlProvider';

export type Locale = 'en' | 'es';

export function useLanguage() {
    const { locale, changeLanguage, isLoading } = useLanguageContext();

    const handleChangeLanguage = (newLocale: Locale) => {
        changeLanguage(newLocale);
    };

    return {
        locale: locale as Locale,
        changeLanguage: handleChangeLanguage,
        isLoading,
        availableLocales: ['en', 'es'] as const,
    };
}
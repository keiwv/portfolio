import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
    // Check for stored locale preference, default to 'en'
    let locale = 'en';
    
    if (typeof window !== 'undefined') {
        const storedLocale = localStorage.getItem('preferred-locale');
        if (storedLocale && ['en', 'es'].includes(storedLocale)) {
            locale = storedLocale;
        }
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});

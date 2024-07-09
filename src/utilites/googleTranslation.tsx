

async function translateText(text: any, targetLang: string) {
    const googleApiKey = "AIzaSyB7OSD7K6TILLwBSB9O3kkxzF0gjEkxJOA";
    const url = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                q: text,
                source: 'en',
                target: targetLang,
                format: 'text'
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error translating text:', errorData);
            throw new Error('Failed to translate text');
        }

        const data = await response.json();
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export default translateText ;



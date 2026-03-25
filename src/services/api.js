const API_URL = import.meta.env.VITE_API_URL;

export const fetcher = async (URL, options = {}) => {
    try {
        const response = await fetch(API_URL + URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error (`Http error with status ${response.status}`);
        }
        return response.json();
    }catch (error) {
        console.error("error fetching data:", error);
    }
}
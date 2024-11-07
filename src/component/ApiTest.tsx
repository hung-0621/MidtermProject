import { useState } from 'react';
import { waifu_Url } from '../data/Api';
import { ImageData } from '../interface/WaifuApi';

export default function ApiTest() {
    return (
        <div className='Container Cyan-Shadow'>
            <ApiTestContent />
        </div>
    );
}

function ApiTestContent() {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    type QueryParams = {
        [key: string]: string | string[];
    };

    const params: QueryParams = {};
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
        } else {
            queryParams.set(key, value);
        }
    });

    const requestUrl = `${waifu_Url}?${queryParams.toString()}`;

    async function getOneRandImg() {
        setErrorMsg(null); // Clear any previous error message
        setIsLoading(true); // Show loading state

        try {
            const response = await fetch(requestUrl);

            if (!response.ok) {
                const errorData = await response.json();
                const message = errorData.detail || `Error: ${response.status} ${response.statusText}`;
                setErrorMsg(message);
                throw new Error(message);
            }

            const data: ImageData = await response.json();
            console.log(data);

            if (data.images && data.images.length > 0) {
                setImgSrc(data.images[0].url);
            } else {
                setErrorMsg('No images found in response');
                setIsLoading(false);
            }
        } catch (error) {
            setErrorMsg((error as Error).message || 'An unknown error occurred');
            setIsLoading(false);
        }
    }

    return (
        <div>
            <button onClick={getOneRandImg}>Get Random Image</button>
            <div className="image-container">
                {isLoading && (
                    <div className="placeholder">
                        <div className="spinner" />
                    </div>
                )}
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt="Random Anime Character"
                        onLoad={() => setIsLoading(false)} // Hide loading state when image is fully loaded
                    />
                )}
                {errorMsg && <p className="error-message">{errorMsg}</p>}
            </div>
        </div>
    );
}

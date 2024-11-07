import { useState } from 'react';
import { waifu_Url } from '../data/Api';
import { ImageData } from '../interface/WaifuApi';

export default function ApiTest() {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        try {
            const response = await fetch(requestUrl);

            if (!response.ok) {
                // Try to extract the error message from the response JSON if available
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
            }
        } catch (error) {
            // Generic error handling for unexpected errors
            setErrorMsg((error as Error).message || 'An unknown error occurred');
        }
    }

    return (
        <div>
            <h3 className='Container Cyan-Shadow'>
                <button onClick={getOneRandImg}>Get Random Image</button>
            </h3>
            {imgSrc && <img src={imgSrc} alt="Random Anime Character" />}
            {errorMsg && <p className="error-message">{errorMsg}</p>}
        </div>
    );
}

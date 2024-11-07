import { useState, useEffect, useRef } from 'react';
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
    const [imgSrc, setImgSrc] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const requestUrl = `${waifu_Url}`;
    const isMounted = useRef(false);

    async function getOneRandImg() {
        setErrorMsg(null);
        setIsLoading(true);

        try {
            const response = await fetch(requestUrl);

            if (!response.ok) {
                const errorData = await response.json();
                const message = errorData.detail || `Error: ${response.status} ${response.statusText}`;
                setErrorMsg(message);
                throw new Error(message);
            }

            const data: ImageData = await response.json();
            if (data.images && data.images.length > 0) {
                console.log(data);
                setImgSrc(data.images[0].url);
            } else {
                setErrorMsg('No images found in response');
            }
        } catch (error) {
            setErrorMsg((error as Error).message || 'An unknown error occurred');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!isMounted.current) {
            getOneRandImg();
            isMounted.current = true;
        }
    }, []);

    return (
        <div>
            <button onClick={getOneRandImg}>Get New Random Image</button>
            <div className="image-container White-Shadow">
                {isLoading && (
                    <div className="placeholder">Loading...</div>
                )}
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt="Random Anime Character"
                        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease' }} // Set opacity inline
                        onLoad={() => setIsLoading(false)}
                    />
                )}
                {errorMsg && <p className="">{errorMsg}</p>}
            </div>
        </div>
    );
}

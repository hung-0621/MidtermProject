import { useState, useEffect, useRef } from 'react';
import { waifu_Url } from '../data/Api';
import { ImageData } from '../interface/WaifuApi';

export default function ApiTest() {
    return (
        <div className='Container Cyan-Shadow'>
            <div className='api-test-container'>
                <h3 className='Title'>好宅的 API 測試😅</h3>
                <p>前方高能，請謹慎操作，任何社會性死亡風險皆由使用者自行承擔</p>
                <ApiTestContent />
            </div>
        </div>
    );
}

function ApiTestContent() {
    const [imgSrc, setImgSrc] = useState<string>('');
    const [imgData, setImgData] = useState<ImageData>();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    type QueryParams = {
        [key: string]: string | string[];
    };

    const params: QueryParams = {
        is_nsfw: "false"
    };

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
        } else {
            queryParams.set(key, value);
        }
    });

    const requestUrl = `${waifu_Url}?${queryParams.toString()}`;
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
                setImgData(data);
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
                        onClick={() => {
                            if (imgData) {
                                window.open(imgData.images[0].source, "_blank");
                            }
                        }}
                    />
                )}
                {errorMsg && <p className="">{errorMsg}</p>}
            </div>
            <div className='GeneralButtons'>
                <button
                    onClick={getOneRandImg}>她好婆哦.jpg
                </button>
            </div>
        </div>
    );
}

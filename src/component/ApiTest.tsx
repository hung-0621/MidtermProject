import { useState, useEffect, useRef } from 'react';
import { waifu_Url, secret, key_len } from '../data/Api';
import { ImageData } from '../interface/WaifuApi';
import WaifuApiProps from '../interface/WaifuApi';
import { Md5 } from 'ts-md5'

export default function ApiTest() {

    const [is_nsfw, setIs_nsfw] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    return (
        <div className='Container Cyan-Shadow'>
            <div className='api-test-container'>
                <h3 className='Title'>{is_nsfw ? "好色的 API 測試🥵" : "好宅的 API 測試😅"}</h3>
                <p>前方高能，請謹慎操作，任何社會性死亡風險皆由使用者自行承擔</p>
                <ApiTestContent
                    is_nsfw={is_nsfw}
                    secret={secret}
                    input={input}
                    maxInputLen={key_len}
                    setIs_nsfw={setIs_nsfw}
                    setInput={setInput}>
                </ApiTestContent>
            </div>
        </div>
    );
}

function ApiTestContent(apiProps: WaifuApiProps) {
    const [imgSrc, setImgSrc] = useState<string>('');
    const [imgData, setImgData] = useState<ImageData>();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    type QueryParams = {
        [key: string]: string | string[];
    };

    const params: QueryParams = {
        is_nsfw: apiProps.is_nsfw.toString()
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
            apiProps.setInput("");
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


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (apiProps.input.length < apiProps.maxInputLen) {
                apiProps.setInput((prevInput) => {
                    const newInput = prevInput + event.key;
                    // console.log(newInput);
                    if (apiProps.secret === Md5.hashAsciiStr(newInput)) {
                        apiProps.setIs_nsfw(true);
                    }
                    return newInput;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [apiProps.input]);

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
                    className={apiProps.is_nsfw ? "pink-button" :""}
                    onClick={getOneRandImg}>
                        {apiProps.is_nsfw ? "你好色喔😎" : "她好婆哦.jpg"}
                </button>
            </div>
        </div>
    );
}

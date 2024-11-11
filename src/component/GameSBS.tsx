import { useEffect, useState } from "react";
import { SBS_State } from "../enum/GameSBS_Enum";
import { BaseImgPath } from "../data/BaseImgPath";

export default function GameSBS() {
    return (
        <div className="Container Cyan-Shadow">
            <div className="GameSBS_Container">
                <h3 className="Title">幫桐人撐十秒</h3>
                <GameSBS_Content></GameSBS_Content>
            </div>
        </div>
    );
}

function GameSBS_Content() {
    const [sbs_state, set_sbs_state] = useState<SBS_State>(SBS_State.ready);
    const [isKeyPressing, setIsKeyPressing] = useState(false);
    const [second, setSecond] = useState(0);
    const [isFading, setIsFading] = useState(false);

    function getImage(): string {
        const SBSImgPath = `${BaseImgPath}SBS/`;
        switch (sbs_state) {
            case SBS_State.ready:
                return `${SBSImgPath}10s.png`;
            case SBS_State.operating:
                return `${SBSImgPath}operating.png`;
            case SBS_State.holding:
                return `${SBSImgPath}holding.png`;
            case SBS_State.switching_1:
                return `${SBSImgPath}switching_1.png`;
            case SBS_State.switching_2:
                return `${SBSImgPath}switching_2.png`;
            case SBS_State.failed:
                return `${SBSImgPath}failed.png`;
            case SBS_State.succeed:
                return `${SBSImgPath}SBS.gif`;
            default:
                return "";
        }
    }

    useEffect(() => {
        let intervalId: number | null = null;

        if (isKeyPressing && sbs_state !== SBS_State.succeed) {
            intervalId = setInterval(() => {
                setSecond((prevSecond) => {
                    const newSecond = prevSecond + 1;
                    if (newSecond === 10) {
                        set_sbs_state(SBS_State.succeed);
                    } else if (newSecond === 9) {
                        set_sbs_state(SBS_State.switching_2);
                        setIsFading(false);
                    } else if (newSecond === 8) {
                        set_sbs_state(SBS_State.switching_1);
                        setIsFading(true);
                    } else if (newSecond === 6) {
                        set_sbs_state(SBS_State.holding);
                    } else if (newSecond === 2) {
                        set_sbs_state(SBS_State.operating);
                    }
                    return newSecond;
                });
            }, 1000);
        } else {
            setSecond(0);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isKeyPressing, sbs_state]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isKeyPressing && event.key === 's' && sbs_state !== SBS_State.succeed) {
                set_sbs_state(SBS_State.ready);
                setIsKeyPressing(true);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (isKeyPressing && event.key === 's' && sbs_state !== SBS_State.succeed) {
                setIsKeyPressing(false);
                set_sbs_state(SBS_State.failed);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isKeyPressing, sbs_state]);

    return (
        <div>
            <img
                src={getImage()}
                alt="SBS State"
                className={isFading ? 'fading' : ''}
            />
            <p>{sbs_state}</p>
        </div>
    );
};

import { useState } from "react";
import { SBS_State } from "../enum/GameSBS_Enum"

export default function GameSBS(){
    return (
        <div className="Container Cyan-Shadow">
            <div className="GameSBS_Container">
                <h3>幫桐人撐十秒</h3>
                <GameSBS_Content></GameSBS_Content>
            </div>
        </div>
    )
}

function GameSBS_Content() {
    const [sbs_state, set_sbs_state] = useState<SBS_State>(SBS_State.ready);

    function getImage(): string {
        const baseImgPath = "src/assets/SBS/";
        switch (sbs_state) {
            case SBS_State.ready:
                return `${baseImgPath}10s.png`;
            case SBS_State.operating:
                return `${baseImgPath}operating.png`;
            case SBS_State.failed:
                return `${baseImgPath}failed.jpg`;
            case SBS_State.switching:
                return `${baseImgPath}switching.png`;
            case SBS_State.succeed:
                return `${baseImgPath}SBS.gif`;
            default:
                return "";
        }
    }

    return (
        <div>
            <img src={getImage()} alt="SBS State" />
        </div>
    );
}
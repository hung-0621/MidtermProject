import Members from "./Members";
import Team from "./Team";
import GameSBS from "./GameSBS";
import ApiTest from "./ApiTest";

export default function Content(){
    return (
        <div className="Content Cyan-Border">
            <Team></Team>
            <Members></Members>
            <GameSBS></GameSBS>
            {/* <ApiTest></ApiTest> */}
        </div>
    )
}
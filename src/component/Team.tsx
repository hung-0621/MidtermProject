import { TeamImageProps, TeamIntroProps, TeamTitleProps } from "../interface/TeamProps"

export default function Team() {
    const team_title = "關於團隊"
    const team_intro = ["TKUIDWD - TKUIM Wash Dishes", "中文名為「淡江資管畢業刷碗」", "碰啥鍵盤，刷碗盤比較實際", "---- ZZY 好像這麼說過"]
    const img_src = "src/assets/wd.jpg"

    return (
        <div className="Container Cyan-Shadow">
            <div className="flex flex-col">
                <TeamTitle title={team_title}></TeamTitle>
                <TeamIntro intro={team_intro}></TeamIntro>
            </div>
            <TeamImage src={img_src}></TeamImage>
        </div>
    )
}

function TeamTitle(team_title: TeamTitleProps) {
    return (
        <div>
            <h2>{team_title.title}</h2>
        </div>
    )
}

function TeamIntro(team_intro: TeamIntroProps) {
    return (
        <div>
            {
                team_intro.intro.map((intro, index) => (
                    <p key={index}>{intro}</p> 
                ))
            }
        </div>
    )
}

function TeamImage(team_image: TeamImageProps) {
    return (
        <div>
            <img className="Container.Image" src={team_image.src} alt="" />
        </div>
    )
}

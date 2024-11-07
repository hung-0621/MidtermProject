import {HeaderImageProps, HeaderTitleProps} from "../interface/HeaderProps"
import { BaseImgPath } from "../data/BaseImgPath"

export default function Header(){

    const img_src = `${BaseImgPath}icon.png`
    const navbar_title = "TKUIMWD"

    return (
        <div className="Header Cyan-Border">
            <HeaderIcon src={img_src}></HeaderIcon>
            <HeaderTitle title={navbar_title}></HeaderTitle>
        </div>
    )
}

function HeaderTitle(navbartitle:HeaderTitleProps){
    return (
        <div>
            <h1>{navbartitle.title}</h1>
        </div>
    )
}

function HeaderIcon(img:HeaderImageProps){
    return (
        <div>
            <img className="Icon" src={img.src} alt="" />
        </div>
    )
}
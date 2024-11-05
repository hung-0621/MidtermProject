import {HeaderImageProps, HeaderTitleProps} from "../interface/HeaderProps"

export default function NavBar(){

    const img_src = "src/assets/icon.png"
    const navbar_title = "TKUIMWD"

    return (
        <div className="Header Cyan-Border">
            <NavBarIcon src={img_src}></NavBarIcon>
            <NavBarTitle title={navbar_title}></NavBarTitle>
        </div>
    )
}

function NavBarTitle(navbartitle:HeaderTitleProps){
    return (
        <div>
            <h1>{navbartitle.title}</h1>
        </div>
    )
}

function NavBarIcon(img:HeaderImageProps){
    return (
        <div>
            <img className="Icon" src={img.src} alt="" />
        </div>
    )
}
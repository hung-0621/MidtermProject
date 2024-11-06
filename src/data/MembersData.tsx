import { MemberInfoProps, MembersProps } from "../interface/MembersProps";

const member_1: MemberInfoProps = {
    name: "LCH",
    title: "卍☆煞氣a太麻里隔壁安住音台林老木☆卍",
    description: "台東在地原始人，在地砍柴經歷長達30年。朝五晚九專業伐木，江湖人稱無情的砍柴機器。歡迎來我家看會倒立的山豬",
    img_src:'src/assets/members/1.jpg'
}

const member_2: MemberInfoProps = {
    name: "ZZY",
    title: "實力擔當",
    description: "團隊裡最強，可是一直裝弱，沒人知道為什麼",
    img_src:'src/assets/members/2.jpg'
}

const member_3: MemberInfoProps = {
    name: "LTA",
    title: "洗碗大師",
    description: "10年洗碗經驗，精通各種洗碗技巧，歡迎各大廠商洽談",
    img_src:'src/assets/members/3.jpg'
}

const member_4: MemberInfoProps = {
    name: "HPW",
    title: "很菜的資安肥宅",
    description: "這個人睡眠不足，所以什麼都沒留在這...",
    img_src:'src/assets/members/4.jpg'
}


export const members_data: MembersProps = {
    members: [
        member_1,member_2,member_3,member_4
    ]
}

export const group_pic = "src/assets/members/group.png"
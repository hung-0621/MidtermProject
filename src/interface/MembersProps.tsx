export interface MemberInfoProps{
    name:string;
    title:string;
    description:string;
    img_src:string;
}

export interface MembersProps{
    members:Array<MemberInfoProps>
}

export interface MemberIndexProps{
    index:number;
}
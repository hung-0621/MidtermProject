import { useState } from 'react';
import { group_pic, members_data } from '../data/MembersData';
import { MemberIndexProps, MemberInfoProps } from '../interface/MembersProps';

export default function Members() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const totalMembers: number = members_data.members.length;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalMembers - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < totalMembers - 1 ? prevIndex + 1 : 0));
    };

    return (
        <>
            <div className="Container Cyan-Shadow">
                <div className="MemberInfoContainer">
                    <h3 className="Title">團隊成員</h3>
                    <MemberInfo index={currentIndex} />
                    <div className="NavigationButtons">
                        <button onClick={handlePrev}>&larr;</button>
                        <button onClick={handleNext}>&rarr;</button>
                    </div>
                </div>
            </div>
            <div className="Container Cyan-Shadow">
                <div className="MemberInfoContainer">
                    <h3 className="Title">成員合照</h3>
                    <MembersGroupPic></MembersGroupPic>
                </div>
            </div>
        </>
    );
}

function MemberInfo({ index }: MemberIndexProps) {
    const member: MemberInfoProps = members_data.members[index];

    return (
        <div className="MemberInfo White-Shadow">
            <img src={member.img_src} alt="Member" className="MemberAvatar" />
            <div className="MemberDetails">
                <h4 className="MemberName">{member.name}</h4>
                <h5 className="MemberTitle">{member.title}</h5>
                <p className="MemberDescription">{member.description}</p>
            </div>
        </div>
    );
}


function MembersGroupPic() {
    return (
        <div className='MembersGroupPicContainer'>
            {
                <img src={group_pic} alt="" />
            }
        </div>
    )
}
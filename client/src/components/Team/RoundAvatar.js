import React, { useState } from "react";
import Creepyface from "react-creepyface";
import Modal from "../../containers/Team/Modal";

const RoundAvatar = ({ member }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <div className="round-avatar">
                <Creepyface
                    src={`/${member.firstname}/serious.jpeg`}
                    options={{
                        hover: `/${member.firstname}/hover.jpeg`,
                        looks: [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => ({
                            angle: angle,
                            src: `/${member.firstname}/${angle}.jpeg`,
                        })),
                    }}
                />
                <div
                    className="round-avatar__label"
                    onClick={() => {
                        setModalVisible(true);
                    }}
                >
                    {member.firstname}
                </div>
            </div>

            <Modal
                member={member}
                setModalVisible={setModalVisible}
                visible={modalVisible}
            />
        </>
    );
};

export default RoundAvatar;

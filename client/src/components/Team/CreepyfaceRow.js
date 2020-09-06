import React from "react";
import RoundAvatar from "./RoundAvatar";

const CreepyfaceRow = ({ teamMembers }) => {
    return (
        <div className="CreepyfaceRow">
            {teamMembers.map((member) => (
                <RoundAvatar key={member.firstname} member={member} />
            ))}
        </div>
    );
};

export default CreepyfaceRow;

import React, { useRef } from "react";
import { Icon, Sticky, Label } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const NavigationBottom = ({
    user,
    toggleRecording,
    isRecording,
    selectIrecordToRecord,
    unreadCount,
}) => {
    const stickyRef = useRef(null);
    const classNameRecordIcon = isRecording
        ? "active-navbottom "
        : " header-icon navigationBottom-items";

    const handleClick = () => {
        if (isRecording) {
            toggleRecording(false);
        } else {
            selectIrecordToRecord(null);
            toggleRecording(true);
        }
    };

    return (
        <Sticky
            bottomOffset={0}
            pushing={true}
            // scrollContext={}
            ref={stickyRef}
        >
            <div className="navigationBottom">
                <NavLink to={`/user/${user.slug}`} activeClassName="active-navbottom">
                    <Icon
                        className="header-icon navigationBottom-items"
                        name="user"
                        size="big"
                    />
                </NavLink>
                <NavLink to="/feed" activeClassName="active-navbottom">
                    <Icon
                        className="header-icon navigationBottom-items"
                        name="globe"
                        size="big"
                    />
                </NavLink>
                <div onClick={handleClick}>
                    <Icon className={classNameRecordIcon} name="microphone" size="big" />
                </div>
                <NavLink to="/messages" activeClassName="active-navbottom">
                    <div className="message_dot">
                        <Icon
                            className="header-icon navigationBottom-items"
                            name="envelope"
                            size="big"
                        />
                        { unreadCount >= 1 && <Label circular color={"red"} content={unreadCount} className="message_dot__label"/> }
                    </div>
                </NavLink>
                <NavLink to="/favoris" activeClassName="active-navbottom">
                    <Icon
                        className="header-icon navigationBottom-items"
                        name="favorite"
                        size="big"
                    />
                </NavLink>
            </div>
        </Sticky>
    );
};

export default NavigationBottom;

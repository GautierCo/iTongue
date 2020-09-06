import React, { useRef, useState } from "react";

/* Components */
import { Image, Icon, Loader } from "semantic-ui-react";

/* Style */
import "./updateavatar.scss";

const UpdateAvatar = ({ avatarUrl, isUserAccount, editProfilAvatar, editProfilAvatarLoading }) => {

  const addAvatarRef = useRef(null);
  const [ imageIsLoaded, setImageIsLoaded ] = useState(false);

  const handdleClickAvatar = e => {
    addAvatarRef.current.click();
  };

  const handdleAvatarChange = e => {
    if (e.target.files) {
      editProfilAvatar(e.target.files[0]);
    }
  };

  const handdleLoadingChange = () => {
    setImageIsLoaded(true);
  };

  return (
    <div className="container_avatar">
      <div className="container_avatar__wrapper">
          <Image
            avatar
            size="small"
            src={
              avatarUrl && avatarUrl.slice(0, 4) !== "null"
                ? `${process.env.REACT_APP_FILES_URL}/${avatarUrl}`
                : "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
            }
            bordered
            onLoad={handdleLoadingChange}
            onError={handdleLoadingChange}
          />
          { (!imageIsLoaded || editProfilAvatarLoading) && <div className="avatar-loading_container">
              <Loader active />
            </div>}
        {isUserAccount && (
          <Icon name="add" className="add_image_avatar" circular onClick={handdleClickAvatar} />
        )}
        <input
          type="file"
          ref={addAvatarRef}
          style={{ visibility: "hidden" }}
          onChange={handdleAvatarChange}
        />
      </div>
    </div>
  );
};

export default UpdateAvatar;

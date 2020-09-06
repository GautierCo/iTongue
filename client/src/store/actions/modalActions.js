export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const CHANGE_AVATAR = "CHANGE_AVATAR";

export const toggleModal = () => ({
    type: TOGGLE_MODAL,
});
export const changeAvatar = (payload) => ({
    type: CHANGE_AVATAR,
    payload,
  });

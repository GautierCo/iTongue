import { connect } from "react-redux";
import Profil from "../../components/User/Profil";
import { fetchAllUsers, checkUserSlug, emptyCheckUserSlug } from "../../store/actions/userActions";
import { editProfilAvatar } from "../../store/actions/editProfilActions";

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  isLogged: state.user.isLogged,
  allUsersList: state.user.allUsersList,
  isLoadingallUsers: state.user.isLoadingallUsers,
  userSlugInfos: state.user.userSlugInfos,
  checkUserSlugLoading: state.user.checkUserSlugLoading,
  userSlugUndefined: state.user.userSlugUndefined
});

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => {
    dispatch(fetchAllUsers());
  },
  editProfilAvatar: avatarFile => {
    dispatch(editProfilAvatar(avatarFile));
  },
  checkUserSlug: slug => {
    dispatch(checkUserSlug(slug));
  },
  emptyCheckUserSlug: () => {
    dispatch(emptyCheckUserSlug());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profil);

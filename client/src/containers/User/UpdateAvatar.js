import { connect } from "react-redux";
import UpdateAvatar from "../../components/User/UpdateAvatar";

const mapStateToProps = (state) => ({
    editProfilAvatarLoading: state.user.editProfilAvatarLoading,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAvatar);
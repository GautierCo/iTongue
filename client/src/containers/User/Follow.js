import { connect } from "react-redux";
import Follow from "../../components/User/Follow";
import { follow, unFollow, checkIfUserFollow } from '../../store/actions/followActions';

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    isUserFollowThisUser: state.user.isUserFollowThisUser,
});

const mapDispatchToProps = (dispatch) => ({
    follow: (userId) => {
        dispatch(follow(userId));
    },
    unFollow: (userId) => {
        dispatch(unFollow(userId));
    },
    checkIfUserFollow: (userSlug) => {
        dispatch(checkIfUserFollow(userSlug));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Follow);
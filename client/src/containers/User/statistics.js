import { connect } from "react-redux";
import Statistics from "../../components/User/Statistics";
import { setSelectedUserToFetchSubscriptions } from "../../store/actions/ifollowersifollowingActions";

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
    setSelectedUserToFetchSubscriptions: (userObj) => {
        dispatch(setSelectedUserToFetchSubscriptions(userObj));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);

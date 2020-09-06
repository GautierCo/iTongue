import { connect } from "react-redux";
import Feed from "../components/Feed";
import { fetchFeedUser } from "../store/actions/feedActions";

const mapStateToProps = (state) => ({
    feedUser: state.user.feedUser,
});

const mapDispatchToProps = (dispatch) => ({
    fetchFeedUser: () => {
        dispatch(fetchFeedUser());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

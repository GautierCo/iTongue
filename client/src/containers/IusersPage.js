import { connect } from "react-redux";
import IusersPage from "../components/IusersPage";
import { fetchAllUsers } from "../store/actions/userActions";

const mapStateToProps = (state) => ({
    allUsersList: state.user.allUsersList,
    isLoadingallUsers: state.user.isLoadingallUsers,
    usersListError: state.user.usersListError,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: () => {
        dispatch(fetchAllUsers());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IusersPage);

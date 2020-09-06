import { connect } from "react-redux";
import Search from "../components/Search";
import { fetchAllRecords } from "../store/actions/irecordsActions";
import { fetchAllUsers } from "../store/actions/userActions";

const mapStateToProps = (state) => ({
    isLoadingAllRecords: state.irecords.isLoadingAllRecords,
    allRecordsList: state.irecords.allRecordsList,
    recordsListError: state.irecords.recordsListError,
    user: state.user.currentUser,
    allUsersList: state.user.allUsersList,
    isLoadingallUsers: state.user.isLoadingallUsers,
    usersListError: state.user.usersListError,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllRecords: () => {
        dispatch(fetchAllRecords());
    },
    fetchAllUsers: () => {
        dispatch(fetchAllUsers());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

import { connect } from "react-redux";
import ProfilSearch from "../../components/User/Profil/profilSearch";
import { fetchAllLanguages } from '../../store/actions/languagesAction';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
    fetchAllLanguages: () => {
        dispatch(fetchAllLanguages());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilSearch);
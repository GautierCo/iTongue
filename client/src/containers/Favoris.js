import { connect } from "react-redux";
import Favoris from "../components/Favoris";
import { fetchFavoris } from "../store/actions/likeAndFavorisActions";

const mapStateToProps = (state) => ({
    favorisUser: state.likeAndFavorisReducer.allFavoris,
});

const mapDispatchToProps = (dispatch) => ({
    fetchFavoris: () => {
        dispatch(fetchFavoris());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favoris);

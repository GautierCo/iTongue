import { connect } from "react-redux";
import LikeAndFavoris from "../components/Irecords/LikeAndFavoris";
import {
    addFavoris,
    addLikes,
    unlikes,
    unFavoris,
    fetchFavoris,
    fetchLikes,
} from "../store/actions/likeAndFavorisActions";

const mapStateToProps = (state) => ({
    favorisUser: state.likeAndFavorisReducer.allFavoris,
    likesUser: state.likeAndFavorisReducer.allLikes,
});

const mapDispatchToProps = (dispatch) => ({
    addFavoris: (id) => {
        dispatch(addFavoris(id));
    },
    unFavoris: (id) => {
        dispatch(unFavoris(id));
    },
    addLikes: (id) => {
        dispatch(addLikes(id));
    },
    unlikes: (id) => {
        dispatch(unlikes(id));
    },
    fetchFavoris: () => {
        dispatch(fetchFavoris());
    },
    fetchLikes: () => {
        dispatch(fetchLikes());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndFavoris);

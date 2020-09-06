import { connect } from "react-redux";
import Home from "../components/Home";
import {
  fetchBestUsers,
  fetchBestTranslations,
  fetchBestIrecords,
  emptyBestIrecords
} from "../store/actions/statisticsHomeActions";

const mapStateToProps = state => ({
  bestUsers: state.statisticsHomeReducer.bestUsers,
  bestTranslations: state.statisticsHomeReducer.bestTranslations,
  bestIrecords: state.statisticsHomeReducer.bestIrecords
});

const mapDispatchToProps = dispatch => ({
  fetchBestUsers: () => {
    dispatch(fetchBestUsers());
  },
  fetchBestTranslations: () => {
    dispatch(fetchBestTranslations());
  },
  fetchBestIrecords: () => {
    dispatch(fetchBestIrecords());
  },
  emptyBestIrecords: () => {
    dispatch(emptyBestIrecords());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

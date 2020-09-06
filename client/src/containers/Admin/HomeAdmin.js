
import { connect } from 'react-redux';
import { fetchStats } from '../../store/actions/Admin/statisticsActions';
import HomeAdmin from '../../components/Admin/HomeAdmin';

const mapStateToProps = (state) => ({
    stats: state.statisticsRecuder.stats,
});

const mapDispatchToProps = (dispatch) => ({
    fetchStats: () => {
        dispatch(fetchStats());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeAdmin);
import React from "react";
import { connect } from "react-redux";
import { loadNext } from "actions.js";
import { convertDate } from "utils.js";

class App extends React.Component {
    componentWillMount() {
        this.props.loadNext();
        this.intervalId = setInterval(this.props.loadNext, 5000);
    }

    componentWillUmount() {
        clearInterval(this.intervalId);
    }

    getRowContent(neo) {
        switch (neo.status) {
            case "loaded":
                return <React.Fragment>
                    <td className="name">
                        { neo.maxEstDiam }
                    </td>
                    <td className="name">
                        { neo.hazardCount }
                    </td>

                    <td className="name">
                        { neo.closest }
                    </td>

                    <td className="name">
                        { neo.fastest }
                    </td>
                </React.Fragment>;

            case "pending":
                return <td colSpan="4" className="name"> Loading... </td>;

            case "error":
                return <td colSpan="4" className="name"> Error: { neo.message } </td>;
            default:
                return null;
        }
    }

    render() {
        const { neos, isHazardous } = this.props;

        return (
            <table className="main">
                <tbody>
                    <tr className="header">
                        <td>
                            Date:
                        </td>
                        <td>
                            Max estimated diameter [km]:
                        </td>
                        <td>
                            Number of potentially hazardous NEOs per day [count]
                        </td>
                        <td>
                            Closest NEO [km]:
                        </td>
                        <td>
                            Fastest NEO [kph]:
                        </td>

                    </tr>
                    {
                        neos.map(neo =>
                            <tr className={ `row ${ isHazardous(neo) ? "danger" : "" }` } key={ neo.id }>
                                <td className="name">
                                    { convertDate(neo.date) }
                                </td>
                                { this.getRowContent(neo) }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }
}

const ConnectedApp = connect(
    state => {
        const { neos } = state;
        const dangerHazardCounts = neos
            .filter(({ status }) => status === "loaded")
            .map(({ hazardCount }) => hazardCount)
            .sort((a, b) => b - a) // Max first
            .slice(0, 2);

        const isHazardous = neo => {
            if (neo.status !== "loaded")
                return false;

            return dangerHazardCounts.indexOf(neo.hazardCount) !== -1;
        };

        return {
            neos,
            isHazardous
        };
    },
    dispatch => ({
        loadNext: () => dispatch(loadNext())
    })
)(App);



export default ConnectedApp;

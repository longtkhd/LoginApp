import React from 'react'
import {
    Route,
    RouteProps,
    Redirect,
    RouteComponentProps
} from 'react-router-dom'
import { connect } from 'react-redux'

interface ReduxProps {
    isAuthenticated: boolean
}
interface Props extends ReduxProps, RouteProps {
    component: React.ComponentType<RouteComponentProps>
}

function PrivateRoute(props: Props) {
    const { location } = props;
    const { isAuthenticated, component: Component, ...rest } = props
    return (
        <Route
            {...rest}
            render={props => {
                if (!isAuthenticated && !localStorage.getItem('token')) {
                    return (
                        <Redirect to={{ pathname: '/login', state: { from: location } }} />
                    );
                }
                return <Component {...props} />
            }}
        />
    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.home.isAuthenticated
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)

import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import useSimpleAuth from "./auth/useSimpleAuth"
import { CohortProvider } from "./cohorts/CohortProvider"
import { Callback } from "./auth/Callback"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { StudentViews } from "./StudentViews"

export const LearnOps = () => {
    const { isAuthenticated, getCurrentUser } = useSimpleAuth()
    const location = useLocation()

    return (
        <>
            <Route render={() => {
                if (isAuthenticated()) {
                    if (getCurrentUser().staff) {
                        return <>
                            <NavBar />
                            <ApplicationViews />
                        </>

                    }
                    else {
                        return <>
                            <NavBar />
                            <StudentViews />
                        </>
                    }
                } else {
                    if (location.pathname !== "/auth/github") {
                        return <Redirect to="/login" />
                    }
                }
            }} />

            <Route path="/auth/github">
                <Callback />
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <CohortProvider>
                <Route path="/register">
                    <Register />
                </Route>
            </CohortProvider>

        </>
    )
}
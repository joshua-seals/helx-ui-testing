import { Fragment } from 'react'
import { LocationProvider, Router } from '@reach/router'
import { ActivityProvider, AppProvider, EnvironmentProvider, InstanceProvider } from './contexts'
import {
  ActiveView,
  AvailableView,
  SupportView,
  NotFoundView,
  SearchView,
} from './views'
import { Layout } from './components/layout'
import { SplashScreenView } from "./views/workspaces/splash-screen";

const renderSearchModule = () => {
  if (process.env.REACT_APP_ENABLE_SEMANTIC_SEARCH === 'true') {
    return <Fragment>
      <SearchView path="/" />
      <SearchView path="/search" />
    </Fragment>
  }
}

const renderWorkspacesModule = () => {
  if (process.env.REACT_APP_ENABLE_WORKSPACES === 'true') {
    return <Fragment>
      <AvailableView path="/workspaces" />
      <AvailableView path="/workspaces/available" />
      <ActiveView path="/workspaces/active" />
      <SplashScreenView path="/workspaces/connect/:app_name/:app_url/:app_icon" />
    </Fragment>
  }
}

const routeHomepage = () => {
  if (process.env.REACT_APP_ENABLE_SEMANTIC_SEARCH === 'false'){
    if(process.env.REACT_APP_ENABLE_WORKSPACES === 'true'){
      return <AvailableView path="/" />
    }
    else{
      return <SupportView path="/" />
    }
  }
}

export const App = () => {
  return (
    <EnvironmentProvider>
      <LocationProvider>
        <ActivityProvider>
          <AppProvider>
            <InstanceProvider>
              <Layout>
                <Router basepath="/helx">
                  <SupportView path="/support" />
                  {renderSearchModule()}
                  {renderWorkspacesModule()}
                  {routeHomepage()}
                  <NotFoundView default />
                </Router>
              </Layout>
            </InstanceProvider>
          </AppProvider>
        </ActivityProvider>
      </LocationProvider>
    </EnvironmentProvider >
  )
}

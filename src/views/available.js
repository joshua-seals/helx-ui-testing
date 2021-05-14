import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components'
import { Container } from '../components/layout'
import { useApp } from '../contexts/app-context';
import { AppCard } from '../components/app';
import { WorkSpaceTabGroup } from '../components/workspace/workspace-tab-group';
import { useNotifications } from '@mwatson/react-notifications';
import { LoadingSpinner } from '../components/spinner/loading-spinner';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-content: space-around;
  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(2, auto);
    grid-gap: 2vw;
}
`

const AppContainer = styled.div(({ theme }) => `
  width: 90vw;
  margin: ${theme.spacing.medium};
  @media screen and (min-width: 992px) {
    min-width: 20%;
    max-width: 600px;
}
`)

const Status = styled.div`
  padding-top: 15vh;
  text-align: center;
`

export const Available = () => {
    const theme = useTheme();
    const [apps, setApps] = useState();
    const { addNotification } = useNotifications();
    const [isLoading, setLoading] = useState(false);
    const { loadApps } = useApp();

    useEffect(() => {
        const renderApp = async () => {
            setLoading(true)
            await loadApps()
                .then(r => {
                    setApps(r.data);
                })
                .catch(e => {
                    addNotification({ type: 'error', text: `An error has occurred while loading apps.` })
                    setApps({})
                })
            setLoading(false);
        }
        renderApp();
    }, [])

    return (
        <Container>
            <WorkSpaceTabGroup tab="available" />
            { isLoading ? <LoadingSpinner style={{ margin: theme.spacing.extraLarge }} /> :
                (apps !== undefined ? (Object.keys(apps).length !== 0 ?
                    <GridContainer>{Object.keys(apps).sort().map(appKey => <AppContainer><AppCard key={appKey} {...apps[appKey]} /></AppContainer>)}</GridContainer> : <Status>No apps available</Status>) : <div></div>)}
        </Container>
    )
}
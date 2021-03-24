import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import styled, { useTheme } from 'styled-components'
import { Whitelist } from './whitelist';
import { Container } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { Card } from '../components/card'
import { List, ListGrid } from '../components/list'
import { Button } from '../components/button'
import { Icon } from '../components/icon'
import { Link } from '../components/link'
import { Input } from '../components/input';
import { Dropdown } from '../components/dropdown';
import { Slider } from '../components/slider';
import { Tab, TabGroup } from '../components/tab';
import { useEnvironment } from '../contexts';
import DataTable from 'react-data-table-component';

const Relative = styled.div`
  position: relative;
  flex: 1;
  & ${Card.Body} {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
  }
  &:nth-child(1) { z-index: -1; }
  &:nth-child(2) { z-index: -2; }
  &:nth-child(3) { z-index: -3; }
`

const ConfigSlider = styled(Card.Body)(({ theme, visible }) => `
  height: 100%;
  flex-direction: column;
  transform: translateY(${visible ? '0' : '100%'});
  background-color: ${visible ? theme.color.black : theme.color.grey.dark};
  transition: transform 250ms, background-color 750ms;
  color: ${theme.color.white};
  & * {
    font-family: monospace;
  }
  & a {
    color: ${theme.color.primary.light};
    transition: filter 250ms;
  }
  & a:hover {
    filter: brightness(0.75);
  }
  & .actions {
    position: absolute;
    right: ${theme.spacing.medium};
    bottom: ${theme.spacing.medium};
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing.medium};
  }
  & h5{
    padding-top: 3vh;
  }
`)

const RunningStatus = styled.div(({ theme }) => `
    height: 25px;
    width: 25px;
    background-color: #00ff00;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
`)

const Status = styled.div(({ theme }) => `
    display: flex;
    align-items: center;
    color: black;
`)

const StopButton = styled(Button)(({ theme }) => `
    background-color: #ff0000;
    color: white;
`)

const AppHeader = styled.div(({ theme }) => `
    display: flex;
    justify-content: space-between;
`)

const AppLogo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: scale-down;
`

const AppInfo = styled.div`
  width:80%;
`

const SpecsInput = styled(Input)`
  width: 15%;
  height: 30px;
`

const SpecName = styled.span`
  width: 6vw;
`

const Spec = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SpecContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

const SpecMinMax = styled.span`
  width: 12vw;
`

const SliderMinMaxContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 5vw;
  width: 50vw;
`

const AppCard = ({ name, app_id, description, detail, docs, status, minimum_resources, maximum_resources }) => {
  const theme = useTheme()
  const helxAppstoreUrl = useEnvironment().helxAppstoreUrl;
  const [flipped, setFlipped] = useState(false)

  //create 3 state variables to store specs information
  const [currentMemory, setMemory] = useState(minimum_resources.memory.substring(0, minimum_resources.memory.length - 1));
  const [currentCpu, setCpu] = useState(minimum_resources.cpus);
  const [currentGpu, setGpu] = useState(minimum_resources.gpus);

  const toggleConfig = event => setFlipped(!flipped)

  //app can be launched here using axios to hit the /start endpoint
  const launchApp = event => {
    axios({
      method: 'GET',
      url: `${helxAppstoreUrl}/service/`,
      params: {
        app_id: app_id,
        cpu: currentCpu,
        memory: currentMemory,
        gpu: currentGpu
      }
    })
    alert(`Launching ${name} with ${currentCpu} CPU core, ${currentGpu} GPU Core and ${currentMemory} GB Memory.`)
  }
  const gpuSpecs = [];
  const cpuSpecs = []
  const memorySpecs = [];
  for (let i = 0; i <= 4; i += 0.25) {
    if (i % 1 == 0) gpuSpecs.push(i);
    cpuSpecs.push(i);
    memorySpecs.push(i);
  }

  const getLogoUrl = (app_id) => {
    return `https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/${app_id}/icon.png`
  }

  return (
    <Card style={{ minHeight: '300px', margin: `${theme.spacing.large} 0` }}>
      <Card.Header><AppHeader><b>{name}</b></AppHeader></Card.Header>
      <Relative>
        <Card.Body>
          <AppLogo src={'' + getLogoUrl(app_id)} />
          <AppInfo>
            <Paragraph>{description}</Paragraph>
            <Paragraph dense>{detail}</Paragraph>
            <Link to={docs}>App Documentation</Link>
          </AppInfo>
        </Card.Body>
        <ConfigSlider visible={flipped}>
          <h5>App Config</h5>
          <ul>
            <SpecContainer><SpecName>CPU</SpecName><SliderMinMaxContainer><SpecMinMax>Min: {minimum_resources.cpus} {minimum_resources.cpus > 1 ? 'Cores' : 'Core'}</SpecMinMax><Spec><b>{currentCpu}</b><Slider type="range" min={minimum_resources.cpus} max={maximum_resources.cpus} value={currentCpu} onChange={(e) => setCpu(e.target.value)} /></Spec><SpecMinMax>Max: {maximum_resources.cpus} {maximum_resources.cpus > 1 ? 'Cores' : 'Core'}</SpecMinMax></SliderMinMaxContainer></SpecContainer>
            <SpecContainer><SpecName>GPU</SpecName><SliderMinMaxContainer><SpecMinMax>Min: {minimum_resources.gpus} {minimum_resources.gpus > 1 ? 'Cores' : 'Core'}</SpecMinMax><Spec><b>{currentGpu}</b><Slider type="range" min={minimum_resources.gpus} max={maximum_resources.gpus} value={currentGpu} onChange={(e) => setGpu(e.target.value)} /></Spec><SpecMinMax>Max: {maximum_resources.gpus} {maximum_resources.gpus > 1 ? 'Cores' : 'Core'}</SpecMinMax></SliderMinMaxContainer></SpecContainer>
            <SpecContainer><SpecName>Memory</SpecName><SliderMinMaxContainer><SpecMinMax>Min: {minimum_resources.memory}</SpecMinMax><Spec><b>{currentMemory}</b><Slider type="range" min={minimum_resources.memory.substring(0, minimum_resources.memory.length - 1)} max={maximum_resources.memory.substring(0, maximum_resources.memory.length - 1)} value={currentMemory} onChange={(e) => setMemory(e.target.value)} /></Spec><SpecMinMax>Max: {maximum_resources.memory}</SpecMinMax></SliderMinMaxContainer></SpecContainer>
          </ul>
          <div className="actions">
            <Button small variant="success" onClick={() => { launchApp(); toggleConfig(); }} style={{ width: '150px' }}>
              <Icon icon="check" fill="#eee" /> Confirm
            </Button>
          </div>
        </ConfigSlider>
      </Relative>
      <Card.Footer style={{
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'background-color 400ms'
      }}>
        <Button small variant={flipped ? 'danger' : 'info'} onClick={toggleConfig} style={{ width: '150px' }}>
          <Icon icon={flipped ? 'close' : 'launch'} fill="#eee" />{flipped ? 'Cancel' : 'Launch App'}
        </Button>
      </Card.Footer>
    </Card>
  )
}

const ServiceCard = ({ name, docs, sid, fqsid, creation_time, cpu, gpu, memory }) => {
  const theme = useTheme()
  return (
    <Card style={{ minHeight: '300px', margin: `${theme.spacing.large} 0` }}>
      <Card.Header><AppHeader>{name} <Status class><RunningStatus />Running</Status></AppHeader></Card.Header>
      <Relative>
        <Card.Body>
          <Paragraph style={{ display: 'flex', fontSize: 20, justifyContent: 'space-between' }}><span>CPU: {cpu}</span> <span>GPU: {gpu}</span> <span>Memory: {memory}</span></Paragraph>
          <Paragraph>Creation Time: {creation_time}</Paragraph>
          <Link to={docs}>App Documentation</Link>
        </Card.Body>
      </Relative>
      <Card.Footer style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <StopButton small>Stop App</StopButton>
      </Card.Footer>
    </Card>
  )
}

const app_response = {
  "blackbalsam": {
    "name": "Blackbalsam",
    "app_id": "blackbalsam",
    "description": "An A.I., visualization, and parallel computing environment.",
    "detail": "A.I.(Tensorflow,Keras,PyTorch,Gensim) Vis(Plotly,Bokeh,Seaborn) Compute(Spark).",
    "docs": "https://github.com/stevencox/blackbalsam",
    "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/blackbalsam/docker-compose.yaml",
    "minimum_resources": {
      "cpus": "1",
      "gpus": 0,
      "memory": "1G"
    },
    "maximum_resources": {
      "cpus": "1",
      "gpus": 0,
      "memory": "1G"
    }
  },
  "cloud-top": {
    "name": "Cloud Top",
    "app_id": "cloud-top",
    "description": "CloudTop is a cloud native, browser accessible Linux desktop.",
    "detail": "A Ubuntu graphical desktop environment for experimenting with native applications in the cloud.",
    "docs": "https://helxplatform.github.io/cloudtop-docs/",
    "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/cloud-top/docker-compose.yaml",
    "minimum_resources": {
      "cpus": "1",
      "gpus": 0,
      "memory": "1G"
    },
    "maximum_resources": {
      "cpus": "1",
      "gpus": 0,
      "memory": "1G"
    }
  },
  "imagej": {
    "name": "ImageJ Viewer",
    "app_id": "imagej",
    "description": "Imagej is an image processor developed at NIH/LOCI.",
    "detail": "can display, edit, analyze, process, save and print 8-bit, 16-bit and 32-bit images. It can read many image formats.",
    "docs": "https://imagej.nih.gov/ij/",
    "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/imagej/docker-compose.yaml",
    "minimum_resources": {
      "cpus": ".5",
      "gpus": 0,
      "memory": "2000M"
    },
    "maximum_resources": {
      "cpus": "1",
      "gpus": 0,
      "memory": "4000M"
    }
  },
  "jupyter-ds": {
    "name": "Jupyter Data Science",
    "app_id": "jupyter-ds",
    "description": "Jupyter DataScience - A Jupyter notebook for exploring and visualizing data.",
    "detail": "Includes R, Julia, and Python.",
    "docs": "https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-datascience-notebook",
    "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/jupyter-ds/docker-compose.yaml",
    "minimum_resources": {
      "cpus": "0.50",
      "gpus": 0,
      "memory": "1000M"
    },
    "maximum_resources": {
      "cpus": "0.50",
      "gpus": 0,
      "memory": "1000M"
    }
  },
  "napari": {
    "name": "Napari Image Viewer",
    "app_id": "napari",
    "description": "Napari is a fast, interactive, multi-dimensional image viewer.",
    "detail": "It enables browsing, annotating, and analyzing large multi-dimensional images.",
    "docs": "https://napari.org/",
    "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/napari/docker-compose.yaml",
    "minimum_resources": {
      "cpus": "2",
      "gpus": 0,
      "memory": "8000M"
    },
    "maximum_resources": {
      "cpus": "2",
      "gpus": 0,
      "memory": "8000M"
    }
  }
}

const instance_response = [
  {
    "name": "Jupyter Data Science",
    "docs": "https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-datascience-notebook",
    "sid": "512164ae-beaf-4a04-9f21-f8e47ce992ef",
    "fqsid": "jupyter-ds",
    "creation_time": "time",
    "cpus": 0.0,
    "gpus": 0,
    "memory": "0.0"
  },
  {
    "name": "Jupyter Data Science",
    "docs": "https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-datascience-notebook",
    "sid": "512164ae-beaf-4a04-9f21-f8e47ce992ef",
    "fqsid": "jupyter-ds",
    "creation_time": "time",
    "cpus": 0.0,
    "gpus": 0,
    "memory": "0.0"
  },
  {
    "name": "Jupyter Data Science",
    "docs": "https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-datascience-notebook",
    "sid": "512164ae-beaf-4a04-9f21-f8e47ce992ef",
    "fqsid": "jupyter-ds",
    "creation_time": "time",
    "cpus": 0.0,
    "gpus": 0,
    "memory": "0.0"
  },
  {
    "name": "Jupyter Data Science",
    "docs": "https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-datascience-notebook",
    "sid": "512164ae-beaf-4a04-9f21-f8e47ce992ef",
    "fqsid": "jupyter-ds",
    "creation_time": "time",
    "cpus": 0.0,
    "gpus": 0,
    "memory": "0.0"
  },
  {
    "name": "Jupyter Data Science",
    "docs": "https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-datascience-notebook",
    "sid": "512164ae-beaf-4a04-9f21-f8e47ce992ef",
    "fqsid": "jupyter-ds",
    "creation_time": "time",
    "cpus": 0.0,
    "gpus": 0,
    "memory": "0.0"
  }
]

const columns = [
  {
    name: 'App Name',
    selector: 'name',
    sortable: true
  },
  {
    name: 'Creation Time',
    selector: 'creation_time',
    sortable: true
  },
  {
    name: 'CPU',
    selector: 'cpus',
    sortable: true
  },
  {
    name: 'GPU',
    selector: 'gpus',
    sortable: true
  },
  {
    name: 'Memory',
    selector: 'memory',
    sortable: true
  }
]
const handleChange = (state) => {
  console.log(state.selectedRows);
}

export const Apps = () => {
  const { helxAppstoreUrl } = useEnvironment();
  const helxAppstoreCsrfToken = useEnvironment().csrfToken;
  const [apps, setApps] = useState({});
  const [services, setServices] = useState([]);
  const [active, setActive] = useState('Available');
  const [whitelist, setWhitelist] = useState(false);

  useEffect(async () => {
    if (active === 'Available') {
      setServices([]);
      setApps(app_response);
      // const app_response = await axios({
      //   method: 'GET',
      //   url: helxAppstoreUrl + '/api/v1/apps'
      // }).then(res => {
      //   setApps(res.data);
      // }).catch(e => {
      //   if (e.response.status === 403) {
      //     setWhitelist(true)
      //   }
      // })
    }
    else {
      setApps({});
      setServices(instance_response);
      // const instance_response = await axios({
      //   method: 'GET',
      //   url: helxAppstoreUrl + '/api/v1/instance'
      // })
      // setApps(instance_response.data);
    }
  }, [active])

  // if (whitelist) return (
  //   <Whitelist />
  // )

  return (
    <Container>
      <TabGroup>
        <Tab active={active === 'Available'} onClick={() => setActive('Available')}>Available</Tab>
        <Tab active={active === 'Active'} onClick={() => setActive('Active')}>Active</Tab>
      </TabGroup>
      {Object.keys(apps).sort().map(appKey => <AppCard key={appKey} {...apps[appKey]} />)}
      {services.length > 0 ? < DataTable
        columns={columns}
        data={services}
        selectableRows
        Clicked
        Selected={handleChange}
        contextMessage={{
          singular: 'instance',
          plural: 'instances',
          message: 'selected'
        }}
        contextActions={<StopButton>Stop</StopButton>}
      /> : <span />}
    </Container>
  )
}

import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import styled, { useTheme } from 'styled-components'
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
import { useEnvironment } from '../contexts'

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
  }
  &:nth-child(1) { z-index: -1; }
  &:nth-child(2) { z-index: -2; }
  &:nth-child(3) { z-index: -3; }
`

const ConfigSlider = styled(Card.Body)(({ theme, visible }) => `
  height: 100%;
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

const SpecsInput = styled(Input)`
  width: 15%;
  height: 30px;
`

const AppCard = ({ name, app_id, description, detail, docs, status, cpu, gpu, memory }) => {
  const theme = useTheme()
  const helxAppstoreUrl = useEnvironment().helxAppstoreUrl;
  const [flipped, setFlipped] = useState(false)

  //create 3 state variables to store specs information
  const [currentMemory, setMemory] = useState(memory.substring(0, memory.length-1));
  const [currentCpu, setCpu] = useState(cpu);
  const [currentGpu, setGpu] = useState(gpu);

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

  const handleMemoryChange = event => {
    setMemory(event.target.value);
  }

  const handleCpuChange = event => {
    setCpu(event.target.value);
  }

  const handleGpuChange = event => {
    setGpu(event.target.value);
  }


  return (
    <Card style={{ minHeight: '300px', margin: `${theme.spacing.large} 0` }}>
      <Card.Header><AppHeader>{name} {status === "Running" ? <Status class><RunningStatus />Running</Status> : <span />}</AppHeader></Card.Header>
      <Relative>
        <Card.Body>
          <Paragraph>{description}</Paragraph>
          <Paragraph dense>{detail}</Paragraph>
          <Link to={docs}>App Documentation</Link>
        </Card.Body>
        <ConfigSlider visible={flipped}>
          <h5>App Config</h5>
          <ul>
            <li>CPU<Slider type="range" min={cpu} max="8" value={currentCpu} onChange={(e) => setCpu(e.target.value)} /> {currentCpu}</li>
            <li>GPU<Slider type="range" min={gpu} max="8" value={currentGpu} onChange={(e) => setGpu(e.target.value)} /> {currentGpu}</li>
            <li>Memory<Slider type="range" min={memory.substring(0, memory.length-1)} max="10000" value={currentMemory} onChange={(e) => setMemory(e.target.value)} /> {currentMemory}M</li>
            {/* <Dropdown value={currentMemory} id="memory" placeholder="Memory" onChange={handleMemoryChange}>
              {memorySpecs.map(memory => <option value={memory}>{memory} GB Memory</option>)}
            </Dropdown>
            <Dropdown value={currentCpu} placeholder="CPU" onChange={handleCpuChange}>
              {cpuSpecs.map(cpu => <option value={cpu}>{cpu} CPU Core</option>)}
            </Dropdown>
            <Dropdown value={currentGpu} placeholder="GPU" onChange={handleGpuChange}>
              {gpuSpecs.map(gpu => <option value={gpu}>{gpu} GPU Core</option>)}
            </Dropdown> */}
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
        {status === "Running" ? <StopButton small>Stop App</StopButton> :
          <Button small variant={flipped ? 'danger' : 'info'} onClick={toggleConfig} style={{ width: '150px' }}>
            <Icon icon={flipped ? 'close' : 'launch'} fill="#eee" />{flipped ? 'Cancel' : 'Launch App'}
          </Button>}
      </Card.Footer>
    </Card>
  )
}

export const Apps = () => {
  const context = useEnvironment().config.context;
  const helxAppstoreUrl = useEnvironment().helxAppstoreUrl;
  const [apps, setApps] = useState({});

  const appstoreResponse = {
    "blackbalsam": {
      "name": "Blackbalsam",
      "app_id": "blackbalsam",
      "description": "An A.I., visualization, and parallel computing environment.",
      "detail": "A.I.(Tensorflow,Keras,PyTorch,Gensim) Vis(Plotly,Bokeh,Seaborn) Compute(Spark).",
      "docs": "https://github.com/stevencox/blackbalsam",
      "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/blackbalsam/docker-compose.yaml",
      "cpu": 0,
      "gpu": 0,
      "memory": "1000M"
    },
    "cloud-top": {
      "name": "Cloud Top",
      "app_id": "cloud-top",
      "description": "CloudTop is a cloud native, browser accessible Linux desktop.",
      "detail": "A Ubuntu graphical desktop environment for experimenting with native applications in the cloud.",
      "docs": "https://helxplatform.github.io/cloudtop-docs/",
      "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/cloud-top/docker-compose.yaml",
      "cpu": 0,
      "gpu": 0,
      "memory": "1000M"
    },
    "imagej": {
      "name": "ImageJ Viewer",
      "app_id": "imagej",
      "description": "Imagej is an image processor developed at NIH/LOCI.",
      "detail": "can display, edit, analyze, process, save and print 8-bit, 16-bit and 32-bit images. It can read many image formats.",
      "docs": "https://imagej.nih.gov/ij/",
      "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/imagej/docker-compose.yaml",
      "cpu": 0,
      "gpu": 0,
      "memory": "2000M"
    },
    "jupyter-ds": {
      "name": "Jupyter Data Science",
      "app_id": "jupyter-ds",
      "description": "Jupyter DataScience - A Jupyter notebook for exploring and visualizing data.",
      "detail": "Includes R, Julia, and Python.",
      "docs": "https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-datascience-notebook",
      "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/jupyter-ds/docker-compose.yaml",
      "cpu": 0,
      "gpu": 0,
      "memory": "1000M"
    },
    "napari": {
      "name": "Napari Image Viewer",
      "app_id": "napari",
      "description": "Napari is a fast, interactive, multi-dimensional image viewer.",
      "detail": "It enables browsing, annotating, and analyzing large multi-dimensional images.",
      "docs": "https://napari.org/",
      "spec": "https://github.com/helxplatform/app-support-prototype/raw/master/dockstore-yaml-proposals/napari/docker-compose.yaml",
      "cpu": 0,
      "gpu": 0,
      "memory": "8000M"
    }
  }

  useEffect(async () => {
    // const response = await axios({
    //   url: `${helxAppstoreUrl}/api/v1/apps`,
    //   method: 'GET'
    // }).then((res) => {
    //   console.log(res);

    // }).catch((e) => {
    //   console.log(e);
    // })
    setApps(appstoreResponse);
  }, [])

  if (!apps) return (
    <Container>
      <Title>Apps</Title>
      <Paragraph>
        Sorry &mdash; no apps found!
      </Paragraph>
    </Container>
  )

  return (
    <Container>
      <Title>Apps</Title>

      { Object.keys(apps).sort().map(appKey => <AppCard key={appKey} {...apps[appKey]} />)}

    </Container>
  )
}

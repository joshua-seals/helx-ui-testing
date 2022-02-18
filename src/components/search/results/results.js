import React, { Fragment, useState, useMemo } from 'react'
import { Link } from '../../link'
import { Radio, notification, Spin, Tooltip as TooltipAnt, Typography, Collapse, List } from 'antd'
import {
  LinkOutlined as LinkIcon,
  TableOutlined as GridViewIcon,
  UnorderedListOutlined as ListViewIcon,
  DatabaseOutlined as ConceptViewIcon,
  SmallDashOutlined as VariableViewIcon
} from '@ant-design/icons'
import { PaginationTray, SearchResultCard, useHelxSearch } from '../'
import './results.css'
import { useAnalytics, useEnvironment } from '../../../contexts'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as TooltipRc
} from 'recharts';

const { Panel } = Collapse
const { Text } = Typography

const GRID = 'GRID'
const LIST = 'LIST'

const getAxisYDomain = (data, left, right, ref, offset) => {
  console.log(`left ${left}`)
  console.log(`right ${right}`)
  let sliceFrom = left > 0 || left === "undefined" ? left : 0
  let sliceTo = right === "undefined" ? 0 : right
  const refData = data.slice(sliceFrom, sliceTo);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

function CustomTooltip({ payload, label, active }) {
  if (active) {
    const v = payload[0]["payload"]
    return (
      <div className="custom-tooltip">
        <p className="margin-bottom-0"><span className="tooltip-label">Variable Name: </span>{v.name}</p>
        <p className="margin-bottom-0"><span className="tooltip-label">Description: </span>{v.description}</p>
        <p className="margin-bottom-0"><span className="tooltip-label">Score: </span>{v.score}</p>
        <p className="margin-bottom-0"><span className="tooltip-label">Study: </span>{v.study_name}</p>
        <p className="margin-bottom-0"><span className="tooltip-label">Index: </span>{v.index_pos}</p>
      </div>
    );
  }

  return null;
}

export const SearchResults = () => {
  const { query, results, totalResults, perPage, currentPage, pageCount, isLoadingResults, error, setSelectedResult, studyResults, totalStudyResults, variableResults, totalVariableResults, variableError, isLoadingVariableResults } = useHelxSearch()
  const { basePath } = useEnvironment()
  const analytics = useAnalytics()
  const [layout, setLayout] = useState(GRID)
  const [conceptView, setConceptView] = useState(true)
  const NotifyLinkCopied = () => {
    notification.open({ key: 'key', message: 'Link copied to clipboard' })
    navigator.clipboard.writeText(window.location.href)
    analytics.trackEvent({
      category: "UI Interaction",
      action: "Search URL copied",
      label: "User copied sharable link for search query",
      customParameters: {
        "Search term": query,
        "User ID": ""
      }
    })
  }
  console.log(studyResults)
  // Appropriate???
  const [studyResultsForDisplay, setStudyResultsForDisplay] = useState(studyResults)
  if (studyResultsForDisplay.length === 0 ) {
    setStudyResultsForDisplay(studyResults)
  }

  const yAxisValues = variableResults.map(obj => { return obj.score; });
  const yMax = Math.max(...yAxisValues);
  const yDomainMax = Math.ceil(yMax) + 10

  const xAxisValues = variableResults.map(obj => { return obj.index_pos; });
  const xMax = Math.max(...xAxisValues);
  const xDomainMax = Math.ceil(xMax) + 10

  const chartInitialState = {
    data: variableResults,
    left: 0,
    right: xDomainMax,
    refAreaLeft: '',
    refAreaRight: '',
    top: yDomainMax,
    bottom: 0,
    animation: true,
  };

  function updateStudyResults(refAreaLeft, refAreaRight) {
    console.log(`refAreaLeft: ${refAreaLeft}`)
    console.log(`refAreaRight: ${refAreaRight}`)
    console.log(studyResultsForDisplay)
    console.log(variableResults)

    let filtered_variables = variableResults.filter(obj => {
      return obj.index_pos >= refAreaLeft &&  obj.index_pos <= refAreaRight
    });
    console.log(filtered_variables)
    console.log(filtered_variables.length)
    console.log(variableResults.length)
    let studiesInFilter = [...new Set(filtered_variables.map(obj => obj.study_name))]
    console.log(studiesInFilter)

    let studyResultsFiltered = studyResults.filter(obj => {
      return studiesInFilter.includes(obj.c_name)
    })
    console.log(studyResultsFiltered.length)

    setStudyResultsForDisplay(studyResultsFiltered)
  }


  const VariablesTableByStudy = useMemo(() => (
    <Collapse ghost className="variables-collapse">
      {
        studyResultsForDisplay.map((study, i) => {
          return (
            <Panel
              key={ `panel_${ study.c_name }` }
              header={
                <Text>
                  { study.c_name }{ ` ` }
                  (<Link to={ study.c_link }>{ study.c_id }</Link>)
                </Text>
              }
              extra={ <Text>{ study.elements.length } variable{ study.elements.length === 1 ? '' : 's' }</Text> }
            >
              <List
                className="study-variables-list"
                dataSource={ study.elements }
                renderItem={ variable => (
                  <div className="study-variables-list-item">
                    <Text className="variable-name">
                      { variable.name } &nbsp;
                      ({ variable.e_link ? <a href={ variable.e_link }>{ variable.id }</a> : variable.id })
                    </Text><br />
                    <Text className="variable-description"> { variable.description }</Text>
                  </div>
                ) }
              />
            </Panel>
          )
        })
      }
    </Collapse>
  ), [studyResultsForDisplay])

  const ConceptsList = () => {
    return (
      results.map((result, i) => {
        const index = (currentPage - 1) * perPage + i + 1
        return (
          <SearchResultCard
            key={ `${query}_result_${index}` }
            index={ index }
            result={ result }
            openModalHandler={ () => setSelectedResult(result) }
          />
        )
      })
    )
  }

  const handleChangeLayout = (event) => {
    const newLayout = event.target.value;
    setLayout(newLayout)
    // Only track when layout changes
    if (layout !== newLayout) {
      analytics.trackEvent({
        category: "UI Interaction",
        action: "Search layout changed",
        label: `Layout set to "${newLayout}"`,
        customParameters: {
          "Search term": query,
          "User ID": "",
          "Changed from": layout,
          "Changed to": newLayout
        }
      })
    }
  }

  const handleDataDisplayChange = (event) => {
    setConceptView(event.target.value)
  }

  const MemoizedResultsHeader = useMemo(() => (
    <div className="header">
      <Text>{totalResults} concepts and {totalStudyResults} studies with {totalVariableResults} variables for "{query}" ({pageCount} page{pageCount > 1 && 's'})</Text>
      <TooltipAnt title="Results Toggle" placement="top">
        <Radio.Group value={conceptView} onChange={handleDataDisplayChange}>
          <Radio.Button value={true}><ConceptViewIcon /></Radio.Button>
          <Radio.Button value={false}><VariableViewIcon /></Radio.Button>
        </Radio.Group>
      </TooltipAnt>
      <TooltipAnt title="Layout Toggle" placement="top">
        <Radio.Group value={layout} onChange={handleChangeLayout}>
          <Radio.Button value={GRID}><GridViewIcon /></Radio.Button>
          <Radio.Button value={LIST}><ListViewIcon /></Radio.Button>
        </Radio.Group>
      </TooltipAnt>
      <TooltipAnt title="Shareable link" placement="top">
        <Link to={`${basePath}search?q=${query}&p=${currentPage}`} onClick={NotifyLinkCopied}><LinkIcon /></Link>
      </TooltipAnt>
    </div>
  ), [currentPage, layout, pageCount, totalResults, query, totalStudyResults, totalVariableResults, conceptView])

  if (isLoadingResults) {
    return <Spin style={{ display: 'block', margin: '4rem' }} />
  }

  class HistogramChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = chartInitialState;
    }

    zoom() {
      let { refAreaLeft, refAreaRight } = this.state;
      const { data } = this.state;

      if (refAreaLeft === refAreaRight || refAreaRight === '') {
        this.setState(() => ({
          refAreaLeft: '',
          refAreaRight: '',
        }));
        return;
      }

      // xAxis domain
      if (refAreaLeft === "undefined") {
        refAreaLeft = 0;
      }
      if (refAreaRight === "undefined") {
        refAreaRight = xDomainMax;
      }
      if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

      updateStudyResults(refAreaLeft, refAreaRight)

      // // yAxis domain
      // const [bottom, top] = getAxisYDomain(data, refAreaLeft, refAreaRight, 'score', 1);

      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
        data: data.slice(),
        left: refAreaLeft,
        right: refAreaRight,
        top: yDomainMax,
        bottom: 0
      }));
    }

    zoomOut() {
      const { data } = this.state;
      this.setState(() => ({
        data: data.slice(),
        refAreaLeft: '',
        refAreaRight: '',
        left: 'dataMin',
        right: 'dataMax',
        top: yDomainMax,
        bottom: 0
      }));
      updateStudyResults("", "")
    }

    render() {
      const { data, left, right, top, bottom } = this.state;
      return (
        <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%' }}>
          <button type="button" className="btn update" onClick={this.zoomOut.bind(this)}>
            Zoom Out
          </button>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={800}
              height={300}
              data={data}
              onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
              onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
              // // eslint-disable-next-line react/jsx-no-bind
              onMouseUp={this.zoom.bind(this)}
            >
              <Bar dataKey="score" fill="#8884d8" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis allowDataOverflow domain={[left, right]} dataKey="index_pos" tick={false} type="number" />
              <YAxis allowDataOverflow domain={[bottom, top]} allowDecimals={false} />
              <TooltipRc content={<CustomTooltip />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
  }



  return (
    <Fragment>

      { error && <span>{ error.message }</span> }

      {
        query && !error.message && (
          <div className="results">
            { results.length >= 1 && MemoizedResultsHeader }
            { conceptView ? <div/> : <HistogramChart /> }

            <div className={ layout === GRID ? 'results-list grid' : 'results-list list' }>
              { conceptView ? <ConceptsList/> : VariablesTableByStudy }
            </div>
          </div>
        )
      }

      <br/><br/>

      { pageCount > 1 && conceptView ? <PaginationTray /> : <div/> }

    </Fragment>
  )
}

import { Fragment } from 'react'
import { Typography, Card, Space, Divider, Button, Grid } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { useEnvironment } from '../../contexts'
import { Breadcrumbs } from '../../components/layout'
import './support.css'

const { Title, Link, Text } = Typography
const { useBreakpoint } = Grid

// Support page sections can be hidden using hidden_sections in the configuration. <community, support>

const CommunitySupport = () => (
  <Card title={
    <Title level={4} type="secondary">
      <Link type="secondary" target="_blank" rel="noopener noreferrer" href="https://community.helx.renci.org/invites/B2dnCA8xRi">
        <ExportOutlined />
        <Text style={{ marginLeft: "12px" }}>Community Support</Text>
      </Link>
    </Title>
  }>
    {/* <Title level={1}>Community Support</Title> */}
    <Space direction="vertical" size="middle">
      <Typography>Your HeLx community has access to it's own Discourse, a community-driven forum that provides help and guidance to any HeLx question you may have. On Discourse, you will find members of the HeLx engineering and product management team, as well as other members of your community. Here you can ask questions, answer questions, and engage in community-building for your specific instance of HeLx.</Typography>
      <Typography>Please visit <a href="https://community.helx.renci.org/invites/B2dnCA8xRi" target="_blank" rel="noopener noreferrer">community.helx.renci.org</a> today to create your account, and to join in the discourse!</Typography>
    </Space>
  </Card>
)

const Documentation = () => (
  <Fragment>
    <Card
      bordered
      hoverable
      className="using-dug-card"
      actions={[
        <Button icon={ <ExportOutlined /> }>Open</Button>
      ]}
    >
      <img src="https://www.pinclipart.com/picdir/big/535-5351710_european-robin-transparent-background-clipart.png"/>
      <Card.Meta
        title={
          <Title level={3} style={{ whiteSpace: "normal", marginBottom: "8px" }}>Using Dug</Title>
        }
        description={
          <Text>Familiarize yourself with Dug, our semantic search tool.</Text>
        }
      />
    </Card>
    <Card
      bordered
      hoverable
      className="getting-started-card"
      actions={[
        <Button icon={ <ExportOutlined /> }>Open</Button>
      ]}
    >
      <img src="/static/frontend/kindpng_2545457-removebg-preview.png"/>
      {/* <img src="https://www.pinclipart.com/picdir/big/535-5351710_european-robin-transparent-background-clipart.png"/> */}
      <Card.Meta
        title={
          <Title level={2} style={{ whiteSpace: "normal", marginBottom: "8px" }}>Getting Started</Title>
        }
        description={
          <Text>Not sure how to manage your resources, launch an app, or find your data? Start here.</Text>
        }
      />
    </Card>
    <Card
      bordered
      hoverable
      className="technical-docs-card"
      actions={[
        <Button icon={ <ExportOutlined /> }>Open</Button>
      ]}
      // style={{ marginRight: "16px" }}
    >
      <img src="https://ecdn.teacherspayteachers.com/thumbitem/Science-Owls-Clipart-3380601-1504878498/original-3380601-2.jpg"/>
      <Card.Meta
        title={
          <Title level={3} style={{ whiteSpace: "normal", marginBottom: "8px" }}>Technical Docs</Title>
        }
        description={
          <Text>Find our GitHub READMEs and more technical documentation here.</Text>
        }
      />
    </Card>
  </Fragment>
)
  // <Card title={
  //   <Title level={4} type="secondary">
  //     <Link type="secondary" target="_blank" rel="noopener noreferrer" href="https://helx.gitbook.io/helx-documentation/">
  //       <ExportOutlined />
  //       <Text style={{ marginLeft: "12px" }}>Documentation</Text>
  //     </Link>
  //   </Title>
  // }>
  //   {/* <Title level={1}>Documentation</Title> */}
  //   <Space direction="vertical">
  //     <Typography>Our documentation is designed to help guide you through your first steps with HeLx. We encourage you to get started with these introductory guides</Typography>
  //     <ul>
  //       <li><a href="https://helx.gitbook.io/helx-documentation/helx/starting-an-existing-app" target="_blank" rel="noopener noreferrer"><b>Logging in and starting an app</b></a> - Authentication requires a <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><b>Github</b></a> or <a href="https://accounts.google.com/SignUp?hl=en" target="_blank" rel="noopener noreferrer"><b>Google</b></a> account</li>
  //       <li><a href="https://helx.gitbook.io/helx-documentation/helx/application-management" target="_blank" rel="noopener noreferrer"><b>Managing your apps</b></a> - Learn how to change GPU and CPU resources, rename an app instance, and delete your running apps</li>
  //       <li><a href="https://helx.gitbook.io/helx-documentation/dug/using-search" target="_blank" rel="noopener noreferrer"><b>Using search</b></a> - Familiarize yourself with Dug, the HeLx search space</li>
  //       <li><a href="https://helx.gitbook.io/helx-documentation/dug/technical-documents" target="_blank" rel="noopener noreferrer"><b>More technical documentation</b></a> - Dive deeper into the HeLx platform and the underlying architecture</li>
  //     </ul>
  //   </Space>
  // </Card>

export const SupportView = () => {
  const { context } = useEnvironment()
  const { md } = useBreakpoint()

  const hiddenSupportSections = Array.isArray(context.hidden_support_sections) ? context.hidden_support_sections : []

  return (
    <Space direction="vertical" size="middle" className="support-page">
      <Title level={1}>Support</Title>
      <div className={`support-card-grid ${!md && "mobile"}`}>
        {/* {!context.hidden_support_sections.includes('community') && <CommunitySupport />} */}
        {!context.hidden_support_sections.includes('documentation') && <Documentation />}
      </div>
    </Space>
  )
}
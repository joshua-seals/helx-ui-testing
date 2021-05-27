import { Layout as AntLayout, Menu } from 'antd'
import { Link } from '@reach/router'

const { Header, Content, Footer } = AntLayout

export const Layout = ({ children }) => {
  return (
    <AntLayout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="about"><Link to="/helx/about">About</Link></Menu.Item>
          <Menu.Item key="workspaces"><Link to="/helx/workspaces">Workspaces</Link></Menu.Item>
          <Menu.Item key="semantic-search"><Link to="/helx/search">Semantic Search</Link></Menu.Item>
          <Menu.Item key="documentation"><Link to="/helx/documentation">Documentation</Link></Menu.Item>
          <Menu.Item key="contact"><Link to="/helx/contact">Contact</Link></Menu.Item>
        </Menu>
      </Header>
      <Content>
        { children }
      </Content>
      <Footer style={{ textAlign: 'center' }}>&copy; HeLx { new Date().getFullYear() }</Footer>
    </AntLayout>
  )
}
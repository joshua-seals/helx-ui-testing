import { useState } from 'react';
import { Layout as AntLayout, Button, Menu, Grid, Divider, Badge, Popover, Typography, Tag, Space } from 'antd'
import { ShoppingCartOutlined as ShoppingCartIcon } from '@ant-design/icons'
import { useLocation, Link } from '@reach/router'
import { useEnvironment, useAnalytics } from '../../contexts';
import { logoutHandler } from '../../api/';
import { MobileMenu } from './menu';
import { SidePanel } from '../side-panel/side-panel';
import { ShoppingCartPopover } from '../shopping-cart';
import './layout.css';

const { Text, Title } = Typography
const { Header, Content, Footer } = AntLayout
const { useBreakpoint } = Grid

export const Layout = ({ children }) => {
  const [showShoppingCart, setShowShoppingCart] = useState(false)

  const { helxAppstoreUrl, routes, context, basePath } = useEnvironment()
  const { analyticsEvents } = useAnalytics()
  const { md } = useBreakpoint()
  const baseLinkPath = context.workspaces_enabled === 'true' ? '/helx' : ''
  const location = useLocation();

  const logoutButton = context.workspaces_enabled === 'true'

  const logout = () => {
    analyticsEvents.logout()
    logoutHandler(helxAppstoreUrl)
  }

  return (
    <AntLayout className="layout">
      <Header className="helx-header" style={{ display: 'flex', zIndex: 1, width: '100%', background: '#fff' }}>
        {context !== undefined ? <Link to={basePath}><img className="brand_img" src={'' + context.logo_url} alt={context.brand}></img></Link> : <span />}
        {md ? (
          <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", marginRight: "16px" }}>
            <Menu className="menu-toggle" theme="light" mode="horizontal" selectedKeys={[location.pathname]}>
              {routes.map(m => m['text'] !== '' && (
                <Menu.Item key={`${baseLinkPath}${m.path}`}><Link to={`${baseLinkPath}${m.path}`}>{m.text}</Link></Menu.Item>
              ))}
            </Menu>
            {/* <Divider
              type="vertical"
              style={{
                height: "calc(100% - 16px)",
                marginLeft: "8px",
                marginRight: "16px",
                top: 0,
                marginTop: "0",
                marginBottom: "0",
              }}
            /> */}
            <div style={{ height: "100%" }}>
              <ShoppingCartPopover visible={showShoppingCart} onVisibleChange={setShowShoppingCart}>
                <Button
                  className="shopping-cart-button"
                  type="primary"
                  size="middle"
                  icon={ <ShoppingCartIcon style={{ fontSize: 16 }} /> }
                  onClick={ () => setShowShoppingCart(true) }
                  style={{ marginRight: !logoutButton ? 8 : undefined }}
                >
                  Cart
                </Button>
              </ShoppingCartPopover>
            </div>
            {logoutButton && (
              <div style={{ height: "100%" }}>
                <Button type="primary" ghost className="logout-button" onClick={logout}>LOG OUT</Button>
              </div>
            )}
          </div>
        ) : (
          <MobileMenu menu={routes} />
        )}
      </Header>
      <Content className>
        {children}
        {context.workspaces_enabled === 'true' && <SidePanel />}
      </Content>
      <Footer style={{ textAlign: 'center', paddingTop: 0 }}>&copy; HeLx {new Date().getFullYear()}</Footer>
    </AntLayout>
  )
}
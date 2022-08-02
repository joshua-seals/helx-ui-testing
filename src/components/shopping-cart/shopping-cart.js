import { Fragment, useEffect, useMemo, useState } from 'react'
import { Space, Layout, Typography, Menu, Modal, Checkbox, Select, notification } from 'antd'
import { ShoppingCartOutlined, LoadingOutlined } from '@ant-design/icons'
import { CartList, CartListExtra, useShoppingCart } from 'antd-shopping-cart'
import YAML from 'yaml'
import download from 'js-file-download'
import './shopping-cart.css'

const { Title, Text } = Typography
const { Sider, Content } = Layout
const { Option } = Select

const ExportFormats = {
  JSON: {
    name: "JSON"
  },
  YAML: {
    name: "YAML"
  }
}


export const ShoppingCart = () => {
  const { buckets, carts, activeCart, setActiveCart } = useShoppingCart()
  const [exportItems, setExportItems] = useState([])
  const [exportFormat, setExportFormat] = useState("JSON")
  const [exportReadable, setExportReadable] = useState(true)
  const [deleteItemsAfterExport, setDeleteItemsAfterExport] = useState(true)
  const [showExportModal, setShowExportModal] = useState(false)

  const exportingFullCart = useMemo(() => exportItems.length === activeCart.items.length, [activeCart, exportItems])

  useEffect(() => {
    if (!showExportModal) {
      setExportItems([])
      setExportFormat("JSON")
      setExportReadable(true)
      setDeleteItemsAfterExport(true)
    }
  }, [showExportModal])

  return (
    <Layout className="cart-layout" style={{ height: 0 }}>
      <Sider>
        <Menu
          mode="inline"
          selectedKeys={[ activeCart.name ]}
          style={{ height: "100%" }}
          items={ carts.sort((a, b) => a.name.localeCompare(b.name)).map((cart) => ({
            key: cart.name,
            name: cart.name,
            label: cart.name,
            icon: <ShoppingCartOutlined />
          }) )}
          onSelect={ ({ key: name }) => setActiveCart(name) }
        />
      </Sider>
      <Content style={{ background: "#fff" }}>
        <div style={{ display: "flex" }}>
          <Space align="end" style={{ flex: 1 }}>
            <Title
              level={ 4 }
              style={{
                marginTop: 0,
                marginBottom: 0,
                textTransform: "uppercase",
                fontSize: 19,
                fontWeight: 600,
                letterSpacing: 0.5
              }}
            >
              { activeCart.name }
            </Title>
            <Text type="secondary" style={{ textTransform: "uppercase", letterSpacing: 0.25, fontWeight: 400, fontSize: 16 }}>
              { activeCart.items.length } item{ activeCart.items.length !== 1 ? "s" : "" }
            </Text>
          </Space>
          <Space style={{ flex: 0 }}>
            <a type="button">Manage</a>
          </Space>
        </div>
        <Space className="cart-layout-content" direction="vertical" style={{ marginTop: 8 }}>
          <CartList
            small={ false }
            checkableItems={ true }
            cartItemProps={{
              showQuantity: false
            }}
            onCheckout={ (selectedItems) => {
              setExportItems(selectedItems.length === 0 ? activeCart.items : selectedItems )
              setShowExportModal(true)
            } }
            extraProps={{
              renderCheckoutText: (selectedCount) => selectedCount > 0 ? `Export ${ selectedCount } selected item${ selectedCount !== 1 ? "s" : "" }` : "Export"
            }}
          />
        </Space>
      </Content>
      <Modal
        title="Export items"
        okText="Confirm"
        cancelText="Cancel"
        destroyOnClose={ true }
        width={ 400 }
        visible={ showExportModal }
        onVisibleChange={ setShowExportModal }
        onOk={ () => {
          setShowExportModal(false)
          notification.open({
            message: "Download will begin shortly...",
            description: "",
            duration: 1.5,
            icon: <LoadingOutlined style={{ color: "#1890ff" }} />,
            placement: "bottomLeft"
          })
          const date = new Date()
          const name = `${ activeCart.name }_${ (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear() }`
          let fileName

          const cart = {
            ...activeCart,
            items: exportItems
          }
          let data
          if (exportFormat === "JSON") {
            fileName = `${ name }.json`
            data = exportReadable ? JSON.stringify(
              cart,
              undefined,
              4
            ) : JSON.stringify(cart)
          } else if (exportFormat === "YAML") {
            fileName = `${ name }.yaml`
            data = YAML.stringify(cart)
          }

          setTimeout(() => download(
            data,
            fileName
          ), 2000)
        } }
        onCancel={ () => setShowExportModal(false) }
        zIndex={1032}
        maskStyle={{ zIndex: 1031 }}
      >
        <Title type="" style={{
          // textAlign: "center",
          color: "#434343",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          marginBottom: 16
        }}>
          Exporting from { activeCart.name } - { exportItems.length } items
        </Title>
        <Space direction="vertical" size="middle">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text>
              Export format:
            </Text>
            <Select value={ exportFormat } onChange={ setExportFormat } style={{ marginLeft: 8 }}>
              { Object.keys(ExportFormats).map((formatKey) => <Option value={ formatKey }>{ ExportFormats[formatKey].name }</Option> ) }
            </Select>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={ exportReadable } onChange={ () => setExportReadable(!exportReadable) }>
              Export in human-readable format
            </Checkbox>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={ deleteItemsAfterExport } onChange={ () => setDeleteItemsAfterExport(!deleteItemsAfterExport) }>
              { exportingFullCart ? "Empty cart after export" : "Remove items from cart after export" }
            </Checkbox>
          </div>
        </Space>
      </Modal>
    </Layout>
  )
}
import { Button } from 'antd'
import { ShoppingCartOutlined as ShoppingCartIcon } from '@ant-design/icons'
import { useShoppingCart } from '../../contexts'

export const AddToCart = ({
    cart=undefined,
    concept=undefined,
    study=undefined,
    variable=undefined,
    asIcon=false,
    style={},
    ...props
}) => {
    const {
        carts,
        activeCart,
        addConceptToCart, removeConceptFromCart,
        addVariableToCart, removeVariableFromCart,
        addStudyToCart, removeStudyFromCart,
        cartUtilities: {
            isConceptInCart,
            isStudyInCart,
            isVariableInCart
        }
    } = useShoppingCart()
    
    if (!cart) cart = activeCart

    const isInCart = concept ? (
        isConceptInCart(cart, concept)
    ) : study ? (
        isStudyInCart(cart, study)
    ) : variable ? (
        isVariableInCart(cart, variable)
    ) : false

    const addToCart = () => {
        return concept ? (
            addConceptToCart(cart, concept)
        ) : study ? (
            addStudyToCart(cart, study)
        ) : variable ? (
            addVariableToCart(cart, variable)
        ) : {}
    }

    const removeFromCart = () => {
        return concept ? (
            removeConceptFromCart(cart, concept)
        ) : study ? (
            removeStudyFromCart(cart, study)
        ) : variable ? (
            removeVariableFromCart(cart, variable)
        ) : {}
    }

    if (asIcon) return (
        <ShoppingCartIcon
            className="icon-btn no-hover"
            onClick={ isInCart ? removeFromCart : addToCart }
            style={{
                fontSize: 16,
                color: isInCart ? "#1890ff" : undefined,
                ...style
            }}
            {...props}
        />
    )
    return (
        <Button
            type="text"
            icon={ <ShoppingCartIcon /> }
            onClick={ isInCart ? removeFromCart : addToCart }
            style={{
                color: isInCart ? "#1890ff" : undefined,
                ...style
            }}
            {...props}
        />
    )
}
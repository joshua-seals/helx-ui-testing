import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import { useNotifications } from './context'
import { types } from './config'

const fadeIn = keyframes`
  0% {
    opacity: 0.0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1.0;
    transform: translateY(0);
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1.0;
  }
  100% {
    opacity: 0.0;
  }
`

const Wrapper = styled.div(({ color, icon, theme }) => css`
  background-color: white;
  cursor: pointer;
  animation: ${ fadeIn } 100ms ease-out normal;
  border-radius: 4px;
  transition: filter 250ms;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2)) brightness(1.0);
  overflow: hidden;
  &:hover {
    filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.25)) brightness(1.1);
    & .close {
      filter: opacity(1.0);
    }
  }
  & .icon {
    background-color: ${ color };
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .text {
    flex: 1;
    padding: 1rem;
    background-color: transparent;
  }
  & .close {
    transition: filter 250ms;
    filter: opacity(0.25);
    color: ${ color };
    padding: 0.5rem;
  }
  &.exiting {
    animation: ${ fadeOut } 250ms ease-out forwards;
  }
`)

export const Notification = ({ message }) => {
  const { closeNotification, colors, icons, timeout } = useNotifications()
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (message.autoClose) {
      const fadeTimer = setTimeout(() => setClosing(true), timeout)
      const closeTimer = setTimeout(() => closeNotification(message.id), timeout + 250)
      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(closeTimer)
      }
    }
  }, [closeNotification, message.autoClose, message.id, timeout])

  const close = useCallback(() => {
    setClosing(true)
    const closeTimer = setTimeout(() => closeNotification(message.id), 250)
    return () => clearTimeout(closeTimer)
  }, [closeNotification, message.id])

  const handleMouseOver = () => {
    console.log(`mouse over ${ message.id }`)
  }

  const handleMouseOut = () => {
    console.log(`mouse out ${ message.id }`)
  }

  return (
    <Wrapper
      onClick={ close }
      color={ colors[message.type] }
      onMouseOver={ handleMouseOver }
      onMouseOut={ handleMouseOut }
      className={ closing ? 'exiting' : undefined }
    >
      <div className="icon">{ icons[message.type] }</div>
      <div className="text">
        { message.text }
      </div>
      <div className="close">&times;</div>
    </Wrapper>
  )
}

Notification.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.oneOf(types).isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    autoClose: PropTypes.bool.isRequired,
  }).isRequired,
}

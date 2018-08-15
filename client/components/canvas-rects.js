import React from 'react'
import { Rect } from 'react-konva'

export const PurpleRect = () => {
  return (
    <Rect
      x={0}
      y={10}
      width={200}
      height={75}
      fill='purple'
      opacity={0.5}
    />
  )
}

export const GreenRect = () => {
  return (
    <Rect
      x={266}
      y={10}
      width={200}
      height={75}
      fill='green'
      opacity={0.5}
    />
  )
}

export const YellowRect = () => {
  return (
    <Rect
      x={533}
      y={10}
      width={200}
      height={75}
      fill='yellow'
      opacity={0.5}
    />
  )
}

export const RedRect = () => {
  return (
    <Rect
      x={799}
      y={10}
      width={200}
      height={75}
      fill='red'
      opacity={0.5}
    />
  )
}

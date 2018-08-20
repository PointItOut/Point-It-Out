import React from 'react'
import { Rect, Text } from 'react-konva'

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

export const ChoiceTextBox = ({choiceText, id, xPosition}) => {
  return (
    <Text
      key={id}
      text={choiceText}
      x={xPosition}
      y={20}
      fontSize={20}
      width={200}
      align='center'
      fill='black'
    />
  )
}

export const QuestionText = ({questionText}) => {
  return (
      <Text
        text={questionText}
        x={250}
        y={700}
        fontSize={20}
        fill='white'
        align='center'
        width={500}
    />
  )
}

export const QuestionBox = () => {
  return (
    <Rect
      x={200}
      y={680}
      width={600}
      height={75}
      fill='blue'
      opacity={0.5}
    />
  )
}

export const RedBorder = ({xPosition}) => {
  return (
    <Rect
      x={xPosition}
      y={10}
      width={200}
      height={75}
      stroke='red'
      strokeWidth={10}
    />
  )
}

export const GreenBorder = ({xPosition}) => {
  return (
    <Rect
      x={xPosition}
      y={10}
      width={200}
      height={75}
      stroke='green'
      strokeWidth={10}
    />
  )
}

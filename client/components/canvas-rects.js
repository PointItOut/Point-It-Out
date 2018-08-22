import React from 'react'
import { Rect, Text } from 'react-konva'

export const PurpleRect = () => {
  return (
    <Rect
      x={0}
      y={10}
      width={200}
      height={75}
      fill="#a347f7"
    // opacity={0.5}
    />
  )
}

export const BlueRect = () => {
  return (
    <Rect
      x={266}
      y={10}
      width={200}
      height={75}
      fill="#0096cc"
    // opacity={0.5}
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
      fill="#FFBB28"
    // opacity={0.5}
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
      fill="#fd6cac"
    // opacity={0.5}
    />
  )
}

export const ChoiceTextBox = ({ choiceText, id, xPosition }) => {
  return (
    <Text
      key={id}
      text={choiceText}
      x={xPosition}
      y={30}
      fontSize={25}
      width={200}
      align="center"
      fill="black"
    />
  )
}

export const QuestionText = ({ questionText }) => {
  return (
    <Text
      text={questionText}
      x={150}
      y={700}
      fontSize={35}
      fill="white"
      align="center"
      width={700}
    />
  )
}

export const QuestionBox = () => {
  return (
    <Rect
      x={100}
      y={680}
      width={800}
      height={75}
      fill="#f44336"
    // opacity={0.5}
    />
  )
}

export const RedBorder = ({ xPosition }) => {
  return (
    <Rect
      x={xPosition}
      y={10}
      width={200}
      height={75}
      stroke="red"
      strokeWidth={10}
      shadowColor="#FF5733"
      shadowBlur={30}
    />
  )
}

export const GreenBorder = ({ xPosition }) => {
  return (
    <Rect
      x={xPosition}
      y={10}
      width={200}
      height={75}
      stroke="#1BA527"
      strokeWidth={10}
      shadowColor="#7CB224"
      shadowBlur={30}
    />
  )
}

export const WinnerRect = props => {
  const winnerName = props.winner[0]
  return (
    <Text
      text={`The winner is ${winnerName}`}
      x={150}
      y={700}
      fontSize={35}
      fill="white"
      align="center"
      width={700}
    />
  )
}

export const TieRect = () => {
  return (
    <Text
      text={`It's a draw`}
      x={150}
      y={700}
      fontSize={35}
      fill="white"
      align="center"
      width={700}
    />
  )
}

export const SoloPlayerEndGame = () => {
  return (
    <Text
      text={`Good Job!`}
      x={150}
      y={700}
      fontSize={35}
      fill="white"
      align="center"
      width={700}
    />
  )
}

export const Backdrop = () => {
  return <Rect x={100} y={680} width={800} height={75} fill="#009688" />
}

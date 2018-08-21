import React from 'react'
import {Rect, Text} from 'react-konva'

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

export const GreenRect = () => {
  return (
    <Rect
      x={266}
      y={10}
      width={200}
      height={75}
      fill="#26AF2F"
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

export const ChoiceTextBox = ({choiceText, id, xPosition}) => {
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

export const QuestionText = ({questionText}) => {
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
      fill="#0096CC"
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
      stroke="red"
      strokeWidth={10}
      shadowColor="#FF5733"
      shadowBlur={30}
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
    // <Text
    //   text={`The winner is ${winnerName}`}
    //   x={250}
    //   y={280}
    //   fontSize={50}
    //   fill="blue"
    //   align="center"
    //   width={500}
    // />
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
    // <Text
    //   text={`It's a draw`}
    //   x={250}
    //   y={280}
    //   fontSize={50}
    //   fill="blue"
    //   align="center"
    //   width={400}
    // />
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

export const OpponentScoreRect = props => {
  const {name, opponent, index} = props
  return (
    <Text
      text={`${name}: ${opponent[name]}`}
      x={250}
      y={350 + index * 50}
      fontSize={50}
      fill="blue"
      align="center"
      width={800}
    />
  )
}

export const Backdrop = () => {
  return (
    // <Rect
    //   x={100}
    //   y={100}
    //   width={800}
    //   height={500}
    //   fill="#efe9e8"
    //   opacity={0.5}
    // />
    <Rect x={100} y={680} width={800} height={75} fill="#a560eb" />
  )
}

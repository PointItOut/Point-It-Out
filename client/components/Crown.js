import React, { Component } from 'react'
import { Image } from 'react-konva'
import Konva from 'konva'

const Crown = function (props) {
    const { facecoords, pathname } = props
    let image
    if (facecoords) {
        image = document.createElement("img")
        image.src = pathname.includes('solo') ? 'crown.png' : '../crown.png'
    }


    return (
        <Image image={image} x={facecoords.x} y={facecoords.y - 100} width={facecoords.headWidth} height={100} />

    )
}

export default Crown
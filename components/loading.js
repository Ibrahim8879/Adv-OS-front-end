"use client"
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes
const chunkTopAnimation = keyframes`
    0%,
    100% {
        transform: rotate(-45deg);
    }
    50% {
        transform: rotate(-80deg);
    }
`;

const chunkBottomAnimation = keyframes`
    0%,
    100% {
        transform: rotate(-40deg);
    }
    50% {
        transform: rotate(0deg);
    }
`;

const eatingPathAnimation = keyframes`
    0% {
        transform: translateX(50%);
    }
    100% {
        transform: translateX(-50%);
    }
`;

// Styled components
const Container = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;
    height: 80vh;
    width: 100%;
`;

const Pacman = styled.div`
    position: relative;
    background: transparent;
    z-index: 1;

    &::before,
    &::after {
        position: absolute;
        top: -35px;
        display: block;
        border-radius: 50%;
        content: "";
        height: 0px;
        width: 0px;
    }

    &::before {
        animation: ${chunkTopAnimation} .5s ease infinite;
        border: 35px solid #FFCC00;
        border-left-color: transparent;
        border-bottom-color: transparent;
    }

    &::after {
        animation: ${chunkBottomAnimation} .5s ease infinite;
        border: 35px solid #FFCC00;
        border-right-color: transparent;
        border-top-color: transparent;
    }
`;

const Path = styled.div`
    display: flex;
    justify-content: space-around;
    animation: ${eatingPathAnimation} .7s linear infinite;
    width: 100%;
    padding-top: 1px;
    padding-left: 60px;

    &::before {
        background: #fff;
        border-radius: 50%;
        content: "";
        height: 1rem;
        width: 1rem;
    }
`;

const Loading = () => {
    return (
        <Container className="container bg-gray-900">
            <Pacman className="pacman">
                <Path>
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="path"></div>
                    ))}
                </Path>
            </Pacman>
        </Container>
    );
};

export default Loading;

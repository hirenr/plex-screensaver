import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import styles from "../styles/presentation.module.scss"
import PhotoGrid from '../components/PhotoGrid';
import { useRouter } from 'next/router';

const Home = () => {
    return (
       <PhotoGrid></PhotoGrid>
    );
}

export default Home;

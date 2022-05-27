import React, { Component } from 'react';

import styles from "../styles/presentation.module.scss"
import Photo from './Photo';

const PhotoGrid = () => {


    return (
        <div className={styles.wrapper}>

            {
                [...Array(20).keys()].map(item => {
                    return (
                        <div key={`pic${item}`}  className={styles['grid-item']}>
                             <Photo></Photo>       
                        </div>
                    )
                })
            }
            
        </div>

    );
}

export default PhotoGrid;

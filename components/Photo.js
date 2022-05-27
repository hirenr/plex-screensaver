import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from "../styles/presentation.module.scss"
import { useState,useEffect } from "react";
import { usePlexContext } from "./Context";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
// import { useEffect } from "react/cjs/react.production.min";

const Photo = () => {

    const [ photos,setPhotos ] = useState([]);
    const [autoplay,setAutoplay] = useState(false)
    const { config,getPhoto,loaded } = usePlexContext();

    const handleChange = (index,item) => {
        if(index >= photos.length - 5) {
            console.log('getting more')
            setPhotos(
                [...photos,
                    ...[...Array(10).keys()].map(index => getPhoto())
                ]
            )
        }
    }



    const init = () => {
        setPhotos(
            [...photos,
                ...[...Array(10).keys()].map(index => getPhoto())
            ]
        )
    }

    useEffect(() => {
        if(loaded) {
            init();

            setTimeout(() => {
                console.log('starting')
                setAutoplay(true)
            },Math.floor(Math.random() * 20)*1000)
        }

    },[loaded])

    return (
        <Carousel onChange={handleChange} autoPlay={autoplay} animationHandler="slide" showThumbs={false} showStatus={false} showArrows={false} showIndicators={false} useKeyboardArrows
            className={styles['presentation-mode']}
            interval={10000} transitionTime={1000}
        >
            {
                photos.length > 0 &&
                photos.map(photo => {
                    const {key,thumb} = photo;
                    return (
                        // <div key={photo.key}>
                        //     TEST
                        // </div>
                    <div key={key} className={styles['my-slide']} 
                        style={{
                            background:`url(http://192.168.1.4:32400/photo/:/transcode?width=1920&height=1080&format=jpg&url=${key}) no-repeat center center`,
                            backgroundSize:'cover',
                            WebkitBackgroundSize:'cover',
                            MozBackgroundSize:'cover',
                            OBackgroundSize:'cover',
                            }}>
                        <div className={styles['image']}>
                            <img src={`http://192.168.1.4:32400/photo/:/transcode?width=1920&height=1080&format=jpg&url=${key}`} />
                        </div>

                    </div>
                    )
                
                })
            }
        </Carousel> 
    );
}

export default Photo;

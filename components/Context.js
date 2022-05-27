import { createContext,Component } from "react";
import { useContext,useEffect,useRef,useCallback,useState } from "react";
import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then(res => res.json())

const PlexContext = createContext();

export function usePlexContext() {
    return useContext(PlexContext);
}

export const PlexProvider = ({ children }) => {

    const { data: config, error } = useSWR('/api/hiren', fetcher);
    const [loaded,setLoaded] = useState(false)

    const photoDb = useRef([]);
    // const [config, setConfig] = useState({});

    const getPhoto = useCallback((count) => {
        const index = Math.floor(Math.random() * photoDb.current.length);
        return photoDb.current[index];
    },[photoDb.current]);

    

    useEffect(() => {
        if(config) {
            const { screensaver } = config;

            if(screensaver) {
                if(screensaver.includes) {
                    screensaver.includes.forEach(async url => {
                        const { MediaContainer } = await fetcher(`http://192.168.1.4:32400${url}`,{
                            headers: {
                                'Accept':'application/json'
                            }
                        })

                        photoDb.current = MediaContainer.Metadata.map(item => {
                            const { thumb,title,parentTitle,year, Media,type } = item;
                            const { width,height,aspectRatio,container,Part } = Media[0];
                            const { key } = Part[0];

                            return {
                                type,thumb,title,parentTitle,year,key,width,height,aspectRatio,container
                            }
                        }).filter(item => item.type === "photo");

                        setLoaded(true);
                    });
                }
            }
        }
    },[config])

    const value = {
        config,getPhoto,loaded
    }

    return (
       <PlexContext.Provider value={value}>
           { children }
       </PlexContext.Provider>
    );
}

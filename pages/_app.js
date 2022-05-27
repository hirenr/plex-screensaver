import { PlexProvider } from '../components/Context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <PlexProvider>
      <Component {...pageProps} />
    </PlexProvider>
  )
}

export default MyApp

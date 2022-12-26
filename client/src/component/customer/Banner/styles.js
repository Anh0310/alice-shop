import { makeStyles } from '@material-ui/styles'
import bgBanner from '../../../assets/images/hero-1.jpg'
import bgBanner2 from '../../../assets/images/hero-2.jpg'
import bgBanner3 from '../../../assets/images/hero-3.jpg'
import bgBanner4 from '../../../assets/images/hero-4.jpg'

const useStyles = makeStyles((theme) => ({
  banner: {
    position: 'relative',
    width: '100%',
    height: `calc(100vh - 90px)`,
    zIndex: 999,
    overflow: 'hidden',

    '& .react-multi-carousel-track': {
      height: `calc(100vh - 90px)`,
    },
  },
  slide: {
    position: 'absolute',
    content: "''",
    width: '100%',
    height: `calc(100vh - 90px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 999,
    backgroundImage: `url(${bgBanner})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    padding: '0 120px',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  },
  slide2: {
    backgroundImage: `url(${bgBanner2})`,
  },
  slide3: {
    backgroundImage: `url(${bgBanner3})`,
  },
  slide4: {
    backgroundImage: `url(${bgBanner4})`,
  },
  heading: {
    fontSize: 70,
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: 38,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 26,
    },
  },
  subHeading: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 50,
    [theme.breakpoints.down('md')]: {
      fontSize: 26,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  action: {
    width: 190,
  },
}))

export { useStyles }

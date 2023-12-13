import { Box } from '@chakra-ui/react'
import TimersList from '../components/TimersList'

const HomePage = () => {
    return (
        <Box as='main' minH={'100vh'} w={'100%'} p={'100px 20px'} position={'relative'} >
            <TimersList />
        </Box>
    )
}

export default HomePage
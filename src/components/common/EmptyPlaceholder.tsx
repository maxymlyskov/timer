import { Stack, Text } from '@chakra-ui/react'

const EmptyPlaceholder = () => {
    return (
        <Stack w={'100%'}>
            <Text fontSize="xl" color="gray.500" textAlign={'center'}>
                No timers or alarms added.
            </Text>
        </Stack>
    )
}

export default EmptyPlaceholder
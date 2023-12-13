import { Button, Stack, Text } from '@chakra-ui/react'
interface Props {
    onRemove: () => void
}
const Toast = ({ onRemove }: Props) => {
    return (
        <Stack
            backgroundColor="white"
            shadow={'xl'}
            padding={4}
            borderRadius={8}
            boxShadow="lg"
            color="white"
            align={'center'}
        >
            <Text fontSize="xl" fontWeight="bold" color={'black'}>
                Time is passed!
            </Text>
            <Button onClick={onRemove} colorScheme="red" marginTop={2}>
                Remove
            </Button>
        </Stack>
    )
}

export default Toast
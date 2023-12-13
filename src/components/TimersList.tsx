import React, { useState } from 'react';
import { Button, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import Timer from './Timer';
import Alarm from './Alarm';

interface TimerObject {
    id: number;
    element: React.ReactNode;
}

const TimersList: React.FC = () => {
    const [timers, setTimers] = useState<TimerObject[]>([{ id: 0, element: <Timer key={0} onRemove={() => removeTimer(0)} /> }]);

    const addTimer = () => {
        const newTimerId = timers.length;
        setTimers((prevTimers) => [
            ...prevTimers,
            { id: newTimerId, element: <Timer key={newTimerId} onRemove={() => removeTimer(newTimerId)} /> },
        ]);
    };

    const addAlarm = () => {
        const newTimerId = timers.length;
        setTimers((prevTimers) => [
            ...prevTimers,
            { id: newTimerId, element: <Alarm key={newTimerId} onRemove={() => removeTimer(newTimerId)} /> },
        ]);
    };

    const removeTimer = (id: number) => {
        setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
    };

    return (
        <Stack spacing={4} align="center" mt={8} marginInline={'auto'} maxW={'1000px'}>
            <Flex justify="center" width="100%" mb={4} gap={2}>
                <Button onClick={addTimer} colorScheme='gray'>
                    Add new Timer
                </Button>
                <Button onClick={addAlarm} colorScheme="yellow">
                    Add new Alarm
                </Button>
            </Flex>
            <Stack >
                {timers.length === 0 ? (
                    <Stack w={'100%'}>
                        <Text fontSize="xl" color="gray.500" textAlign={'center'}>
                            No timers or alarms added.
                        </Text>
                    </Stack>
                ) : (
                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={4} marginInline={'auto'}>
                        {timers.map(({ id, element }) => (
                            <GridItem key={id}>{element}</GridItem>
                        ))}
                    </Grid>
                )}
                {timers.length > 1 && (
                    <Flex justify="flex-end" width="100%" mt={4}>
                        <Button onClick={() => removeTimer(timers[timers.length - 1].id)} colorScheme="red">
                            Remove Last Timer
                        </Button>
                    </Flex>
                )}
            </Stack>
        </Stack>
    );
};

export default TimersList;

import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useSound } from "use-sound";
import { formatTime } from "../utils/timer";
import Toast from "./common/Toast";
import beepSound from "../assets/succcess.mp3"

const Timer: React.FC<{ onRemove: () => void }> = ({ onRemove }) => {
    const [time, setTime] = useState<number>(0);
    const [manualTime, setManualTime] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(false);
    const [play] = useSound(beepSound);
    const toast = useToast();

    const handleStartStop = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    const handleSetTime = () => {
        const parsedTime = parseInt(manualTime, 10);
        if (!isNaN(parsedTime) && parsedTime >= 0) {
            setTime(parsedTime);
            setIsActive(true);
        }
    };

    useEffect(() => {
        let interval: number | undefined;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0 && isActive) {
            setIsActive(false);
            toast({
                title: "Alarm!",
                description: "It's time!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right',
                render: () => (
                    <Toast onRemove={onRemove} />
                ),
            });

            play();
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [time, play, onRemove]);


    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            shadow="xl"
            borderRadius="8px"
            p="32px 16px"
            minW="400px"
            position="relative"
        >
            <Button
                onClick={onRemove}
                colorScheme="red"
                position="absolute"
                top="2"
                right="2"
            >
                X
            </Button>
            <Text fontSize="4xl" mb={4}>
                {formatTime(time)}
            </Text>
            <Flex>
                {isActive && (
                    <Button onClick={handleStartStop} colorScheme="red" m={2}>
                        Stop
                    </Button>
                )}
                <Button onClick={handleReset} colorScheme="gray" m={2}>
                    Reset
                </Button>
            </Flex>
            <Flex align="center">
                <Input
                    type="number"
                    value={manualTime}
                    onChange={(e) => setManualTime(e.target.value)}
                    placeholder="Seconds"
                    maxW="100px"
                />
                <Button onClick={handleSetTime} colorScheme="blue" m={2}>
                    Set Timer
                </Button>
            </Flex>
        </Flex>
    );
};

export default Timer;

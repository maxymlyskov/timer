import { Button, Flex, HStack, Input, Switch, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSound } from "use-sound";
import Toast from "./common/Toast";
import alarmSound from "../assets/succcess.mp3"
import { formatTime } from "../utils/timer";

interface Props {
    onRemove: () => void
}
const Alarm = ({ onRemove }: Props) => {
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(false);
    const [play] = useSound(alarmSound);
    const toast = useToast();
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

    useEffect(() => {
        let interval: number;

        if (isActive && selectedTime) {
            const [hours, minutes] = selectedTime.split(":").map((str) => parseInt(str, 10));
            const alarmTime = new Date();
            alarmTime.setHours(hours);
            alarmTime.setMinutes(minutes);
            alarmTime.setSeconds(0);

            interval = setInterval(() => {
                const currentTime = new Date();
                const timeDifference = alarmTime.getTime() - currentTime.getTime();

                if (timeDifference <= 0) {
                    clearInterval(interval);
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
                    setIsActive(false);
                    setTimeRemaining(null);
                } else {
                    setTimeRemaining(Math.floor(timeDifference / 1000));
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, selectedTime, play, toast]);

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
                {timeRemaining !== null ? ` ${formatTime(timeRemaining)}` : "Select Alarm"}
            </Text>
            <Flex align="center" mb={4}>
                <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    maxW="150px"
                />
            </Flex>
            <HStack align="center" mb={8}>
                <Text>Enable Alarm</Text>
                <Switch isChecked={isActive} onChange={() => setIsActive(!isActive)} />
            </HStack>
        </Flex>
    );
};

export default Alarm;

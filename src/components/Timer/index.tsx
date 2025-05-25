import * as React from "react";
import {useEffect, useRef, useState} from "react";

interface TimerProps {
    duration: number;
    onEnd: () => void;
    className?: string;
    id: string;
}

const Timer: React.FC<TimerProps> = ({duration, onEnd, className="", id}: TimerProps) => {
    const [time, setTime] = useState(0); // in seconds
    const intervalRef = useRef<number | null>(null);
    const timeLeft = (duration / 1e3) - time;
    const ended = timeLeft <= 0;

    useEffect(() => {
        intervalRef.current = window.setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, [onEnd]);

    useEffect(() => {
        setTime(0);
    }, [id]);

    useEffect(() => {
        if(ended) onEnd();
    }, [ended, onEnd]);


    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatTime = (value: number): string => value.toString().padStart(2, '0');

    return (
        <div className={`${className}`}>
            <p>
                {formatTime(minutes)}:{formatTime(seconds)}
            </p>
        </div>);
};


export default Timer;
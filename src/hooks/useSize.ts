import {RefObject, useLayoutEffect, useState} from "react";
import useResizeObserver from "@react-hook/resize-observer";

const useSize = (target?: RefObject<HTMLElement>) => {
    const [size, setSize] = useState<DOMRect | undefined>(undefined)

    useLayoutEffect(() => {
        if (target && target.current) {
            setSize(target.current.getBoundingClientRect())
        }
    }, [target])

    // Where the magic happens
    useResizeObserver(target!, (entry) => setSize(entry.contentRect))
    return size
}

export default useSize;
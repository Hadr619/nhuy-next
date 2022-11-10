import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import { VscTriangleDown } from "react-icons/vsc";
import { MdCheckCircle } from "react-icons/md";
import styles from "./Filter.module.scss"

export default function Filter({artwork, types, activeType, setActiveType, setFiltered}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("All");
    const containerRef = useRef(null);
    const clickOutsideAlert = (ref) => {
        useEffect(() => {
            const clickOutside = (event) => {
                if(ref.current && !ref.current.contains(event.target)){
                    setOpen(false);
                }
            }
            document.addEventListener('mousedown', clickOutside)
            return() => {
                document.removeEventListener('mousedown', clickOutside);
            }
        },[ref])
    }
    clickOutsideAlert(containerRef);

    const handleClick = () => {
        setOpen(!open);
    }
    const typesAvail = ['All',...types];
    const setVisible = () => {
        const matched = typesAvail.find(t => t.includes(selected))
        return matched
    }

    useEffect(() => {
        if(activeType === "All"){
            setFiltered(artwork)
            return
        }
        const filtered = artwork.filter(art =>
            art.fields.printType.toLowerCase().includes(activeType.toLowerCase())
            )
        setFiltered(filtered);

    },[activeType])
    const buttonClick = (type) => {
        setActiveType(type)
        setSelected(type);
    }
    return (
        <div className={styles.wrapper} ref={containerRef}>
            <button onClick={handleClick} className={styles.button}><span className={styles.visibleType}>{setVisible()}</span> <VscTriangleDown className={clsx(styles.icon, open ? styles.rotate : "")}/></button>
                <ul className={clsx(styles.list, open ? styles.open : "")}>
                    {typesAvail.map((type, index) =>(
                        <li key={index} className={styles.listItem} onClick={() => buttonClick(type)}>
                            <span className={styles.checkIcon}>{type.toLowerCase() === activeType.toLowerCase() ? <MdCheckCircle /> : ""}</span>
                            <span>{type}</span>
                        </li>
                    ))}
                </ul>
        </div>
    )
}
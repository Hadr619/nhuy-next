import {useState} from "react";
import clsx from "clsx";
import { VscTriangleDown } from "react-icons/vsc";
import styles from "./Filter.module.scss"
import { set } from "date-fns/esm";
export default function Filter({}) {
    const [open, setOpen] = useState(false);
    // console.log(artTypes)

    const handleClick = () => {
        setOpen(!open);
    }
    return (
        <div className={styles.wrapper}>
            <button onClick={handleClick} className={styles.button}>Filter <VscTriangleDown className={clsx(styles.icon, open ? styles.rotate : "")}/></button>
                <ul className={clsx(styles.list, open ? styles.open : "")}>
                    <li>
                        <button>All</button>
                    </li>
                    <li><button>Linoleum</button></li>
                    <li><button>Painting</button></li>
                </ul>
        </div>
    )
}
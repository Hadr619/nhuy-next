import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {motion, Variants} from "framer-motion";
import { VscTriangleDown } from "react-icons/vsc";
import { MdCheckCircle } from "react-icons/md";
import styles from "./Filter.module.scss";
const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };
  
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
        setOpen(!open);
    }
    console.log(types.length);
    return (

        <motion.div 
            className={clsx(styles.wrapper, types.length === 1 ? styles.hide : "")}
            ref={containerRef}
            initial={false}
            animate={open ? "open" : 'closed'}>
                <motion.button 
                    onClick={handleClick} 
                    className={styles.button}
                    whileTap={{scale:0.97}}>
                        <span className={styles.visibleType}>{setVisible()}</span> <VscTriangleDown className={clsx(styles.icon, open ? styles.rotate : "")}/>
                </motion.button>
                <motion.ul 
                    className={clsx(styles.list, open ? styles.open : "")}
                    variants={{
                        open: {
                          clipPath: "inset(0% 0% 0% 0% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.2,
                            staggerChildren: 0.05
                          }
                        },
                        closed: {
                          clipPath: "inset(10% 50% 90% 50% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                          }
                        }
                      }}
                      style={{ pointerEvents: open ? "auto" : "none" }}
                      >
                    {typesAvail.map((type, index) =>(
                        <motion.li 
                            key={index} 
                            className={styles.listItem} 
                            onClick={() => buttonClick(type)}
                            variants={itemVariants}>
                            <span className={styles.checkIcon}>{type.toLowerCase() === activeType.toLowerCase() ? <MdCheckCircle /> : ""}</span>
                            <span>{type}</span>
                        </motion.li>
                    ))}
                </motion.ul>
        </motion.div>
    )
}
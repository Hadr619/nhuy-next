import styles from "./Button.module.scss";
import clsx from "clsx";
export default function Button({className, btnText, click}) {
    return (
        <button className={clsx(styles.button, styles.primary, className)} onClick={() => click}>{btnText}</button>
    )
}
import styles from "./Button.module.scss";
import clsx from "clsx";

export default function Button({className, btnText, ...props}) {
    return (
        <button className={clsx(styles.button, styles.primary, className)} {...props}>{btnText}</button>
    )
}
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Button from "../../components/Button/Button";
import styles from "./Formspree.module.scss";
export default function ContactForm() {
  const [state, handleSubmit] = useForm("meqvkppe");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
      <form onSubmit={handleSubmit} className={styles.form}>
    <div className={styles.field}>
    <label htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="name" 
        name="name"
        className={styles.input}
      />
      <ValidationError 
        prefix="Name" 
        field="name"
        errors={state.errors}
      />
      </div>
      <div className={styles.field}>
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        className={styles.input}
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      </div>
      <div className={styles.field}>
      <label htmlFor="message">
          Message
      </label>
      <textarea
        id="message"
        name="message"
        className={styles.textarea}
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      </div>
      <button type="submit" disabled={state.submitting} className={styles.button}>
        Submit
      </button>
    </form>
  );
}
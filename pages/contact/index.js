import Page from "../../components/Page/Page";
import { NextSeo } from 'next-seo';
import Masthead from "../../components/Masthead/Masthead";
import Section from "../../components/Section/Section";
import Formspree from "../../components/Formspree/Formspree";
export default function Contact() {
    return(
        <Page>
            <NextSeo
                title="Contact Me"
                description="Contact me form"
                />
            <Masthead
                title="Contact Me"
                description="Thanks for reaching out"
                />
            <Section>
                <Formspree />
            </Section>
        </Page>
    )
}
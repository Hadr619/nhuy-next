import Page from "../../components/Page/Page";
import Masthead from "../../components/Masthead/Masthead";
import Section from "../../components/Section/Section";
import Formspree from "../../components/Formspree/Formspree";
export default function Contact() {
    return(
        <Page>
            <Masthead
                title="Contact Me"
                description="Thanks for reaching out."
                />
            <Section>
                <Formspree />
            </Section>
        </Page>
    )
}
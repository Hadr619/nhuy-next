import Page from "../../components/Page/Page";
import Masthead from "../../components/Masthead/Masthead";

export default function Shows() {
    return(
        <Page>
            <Masthead 
                title="Art Shows"
                description="Where you can see my art"
            />

<section className="c-pg__section c-pg-section__shows">
        <div className="o-cont c-pg-section__container">
            <ul className="c-grid_shows">
                <li className="c-grid-show--item">
                        <div className="c-gs-item--image o-image lazy">
                         <a href="" className="c-gs-item--link"></a>
                        </div>
                    <div className="c-gs-item__info">
                    
                    <div className="c-gs-info__date-location">
                        <p className="c-gs-item--date-location"><span>Event:</span><span>Title</span></p>
                        <p className="c-gs-item--date-location"><span>When:</span><span>Date</span></p>
                        <p className="c-gs-item--date-location"><span>Where:</span><span>Location</span></p>
                    </div>
                    <div className="c-gs-info__description">       
                    Description
                    </div>
                    <a href="" className="c-gs-info--link">Learn More</a>
                    </div>
                </li>

                    {/* <span class="u-none-added">Sorry, but there are no shows currently added. Please check back.</span> */}
            </ul>
        </div>

    </section>
        </Page>
    )
}
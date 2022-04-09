/**
 * Rider signup form.
 */

 import React, { useState } from "react";
 import { Button, Container} from "react-bootstrap";
 import { useNavigate } from "react-router-dom";

 export const RidesLanding = () => {
    const navigate = useNavigate();

    /////////////////////////////////////////
    /////// TODO get event titles in event
    /////////////////////////////////////////

    let events=[{title: "Church"}, {title: "BroomBall"}];

    //TODO add eventid
    return (
    <Container>
        {events.map((event) => (
        <Container>
             <Button className={"riders-landing-button"} variant={"primary"} onClick={() => navigate("/rides/rider/signup")}>
                <img src={"/rider.png"} alt="Rider Sign-up "/>
                {"\n"}
                I need a ride to {event.title}
            </Button>
            <Button className={"riders-landing-button"} variant={"primary"} onClick={() => navigate("/rides/driver/signup")}>
                <img src={"/driver.png"} alt="Driver Sign-up "/>
                {"\n"}
                I can drive to {event.title}
            </Button>
        </Container>
        ))

        }
    </Container>
   );
 };

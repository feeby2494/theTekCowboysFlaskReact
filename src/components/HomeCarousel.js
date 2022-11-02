import { Carousel, Image} from "react-bootstrap";

export const HomeCarousel = () => {

  const civic_repair = `${process.env.PUBLIC_URL}/civic_repair_short.jpg`;
  const mobile_solar_battery_1 = `${process.env.PUBLIC_URL}/mobile_solar_battery_1.jpg`;
  const mobile_solar_battery_2 = `${process.env.PUBLIC_URL}/mobile_solar_battery_2_short.jpg`;
  const ipad_repair = `${process.env.PUBLIC_URL}/ipad_repair_short.jpg`;
  const electronic_lab_workbench_1 = `${process.env.PUBLIC_URL}/electronic_lab_workbench_1_short.jpg`;
  const electronic_lab_workbench_2 = `${process.env.PUBLIC_URL}/electronic_lab_workbench_2.jpg`;

  return (
    <Carousel variant="dark" className="row mt-3 mb-0">
      <Carousel.Item>
        <Image
          fluid
          rounded
          className="d-block w-100 carousel-img"
          src= {electronic_lab_workbench_1}
          alt="My electronic lab workbench"
        />
        <Carousel.Caption>
          <h3>My Electronic Lab Workbench</h3>
          <p>This is where the magic happens. This is my workbench for electronic repair and building.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          fluid
          rounded
          className="d-block w-100"
          src={ipad_repair}
          alt="IPad in the process of being repaired"
        />

        <Carousel.Caption>
          <h3>Apple Mobile Device Repair</h3>
          <p>With 5 years of Apple device repair under my belt, I prefer quality over production numbers and enjoy deep problems.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          fluid
          rounded
          className="d-block w-100"
          src={mobile_solar_battery_2}
          alt="Inside of the mobile battery pack I made."
        />

        <Carousel.Caption>
          <h3>Love building things like mobile solar battery packs.</h3>
          <p>
            My goal is to build systems off the grid that provide useful automation to users.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          fluid
          rounded
          className="d-block w-100"
          src={civic_repair}
          alt="Repairing and modifiying my Honda Civic."
        />

        <Carousel.Caption>
          <h3>Love Automotive Repair and Modification.</h3>
          <p>
            Gearhead by birth, I love lightweight, slow cars. I modify them and see how much I can get out of them.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  
  );
}


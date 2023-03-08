import { Carousel, Image} from "react-bootstrap";

export const HomeCarousel = () => {

  const civic_repair = `${process.env.PUBLIC_URL}/civic_repair_comp.jpg`;
  // const mobile_solar_battery_1 = `${process.env.PUBLIC_URL}/mobile_solar_battery_1.jpg`;
  const mobile_solar_battery_2 = `${process.env.PUBLIC_URL}/mobile_solar_battery_2_comp.jpg`;
  const ipad_repair = `${process.env.PUBLIC_URL}/ipad_repair_comp.jpg`;
  const electronic_lab_workbench_1 = `${process.env.PUBLIC_URL}/electronic_lab_workbench_1_comp.jpg`;
  // const electronic_lab_workbench_2 = `${process.env.PUBLIC_URL}/electronic_lab_workbench_2.jpg`;

  return (
    <Carousel variant="dark" className="row mt-3 mt-sm-4 mb-0">
      <Carousel.Item>
        <Image
          fluid
          rounded
          className="d-block w-100 carousel-img"
          src= {electronic_lab_workbench_1}
          alt="My electronic lab workbench"
        />
        <Carousel.Caption className="carousel-caption-backgound d-sm-none">
          <h3 className="h5">My Electronic Lab Workbench</h3>
          <p className="p small">This is where the magic happens. This is my workbench for electronic repair and building.</p>
        </Carousel.Caption>
        <Carousel.Caption className="carousel-caption-backgound d-none d-sm-block">
          <h3 className="">My Electronic Lab Workbench</h3>
          <p className="">This is where the magic happens. This is my workbench for electronic repair and building.</p>
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

        <Carousel.Caption className="carousel-caption-backgound d-sm-none">
          <h3 className="h5">Apple Mobile Device Repair</h3>
          <p className="p small">With 5 years of Apple device repair under my belt, I prefer quality over production numbers and enjoy deep problems.</p>
        </Carousel.Caption>
        <Carousel.Caption className="carousel-caption-backgound d-none d-sm-block">
          <h3 className="">Apple Mobile Device Repair</h3>
          <p className="">With 5 years of Apple device repair under my belt, I prefer quality over production numbers and enjoy deep problems.</p>
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

        <Carousel.Caption className="carousel-caption-backgound d-sm-none">
          <h3 className="h5">Love building things like mobile solar battery packs.</h3>
          <p className="p small">My goal is to build systems off the grid that provide useful automation to users.</p>
        </Carousel.Caption>
        <Carousel.Caption className="carousel-caption-backgound d-none d-sm-block">
          <h3 className="">Love building things like mobile solar battery packs.</h3>
          <p className="">My goal is to build systems off the grid that provide useful automation to users.</p>
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

        <Carousel.Caption className="carousel-caption-backgound d-sm-none">
          <h3 className="h5">Love Automotive Repair and Modification.</h3>
          <p className="p small">Gearhead by birth, I love lightweight, slow cars. I modify them and see how much I can get out of them.</p>
        </Carousel.Caption>
        <Carousel.Caption className="carousel-caption-backgound d-none d-sm-block">
          <h3 className="">Love Automotive Repair and Modification.</h3>
          <p className="">Gearhead by birth, I love lightweight, slow cars. I modify them and see how much I can get out of them.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  
  );
}


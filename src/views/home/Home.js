import React,{Component} from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import WebServiceCard from 'components/web_services/WebServiceCard';
import RepairCard from '../repair/RepairCard';
import { HomeCarousel } from 'components/HomeCarousel';
import { withSmallCollContainer } from '../../hoc/withSmallCollContainer';
import { HomeIntroduction } from 'components/HomeIntroduction';
// import OffCanvesOrderStatus from 'components/OffCanvesOrderStatus';
import RepairHome from 'views/repair/RepairHome';
import RepairAccordion from 'views/repair/RepairAccordion';
import DetailsRepair from 'components/DetailsRepair';

// Main Component for homepage
export default class Home extends Component {
    constructor(){
        super();
        this.state ={
            message:'loading...',
            e110CorollaVideos: null,
            e170CorollaVideos: null,
            fg1CivicVideos: null,
            showPortfolio: false,
            showVideos: false,
            web_service_first_name: '',
            web_service_last_name: '',
            web_service_email: '',
            web_service_phone: '',
            web_service_project_explanation: '',
            web_service_extra_details: '',
            webServiceErrorMessage: null,
            webServiceErrorBool: false,
            webServiceUser: null,
            repair_first_name: '',
            repair_last_name: '',
            repair_email: '',
            repair_phone: '',
            repair_address_line_one: '',
            repair_address_line_two: '',
            repair_address_city: '',
            repair_address_state: '',
            repair_address_postal_code: '',
            repair_address_country: '',
            repair_brand: '',
            repair_model: '',
            repair_serial: '',
            repair_issue: '',
            repairErrorBool: false,
            repairErrorMessage: null,
            repairUser: null,
            linkEbayMBBoards: "https://www.ebay.com/itm/234527578091?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=tebdRjHwQBi&sssrc=2566055&ssuid=tebdRjHwQBi&widget_ver=artemis&media=COPY",
            linkEbayIPBoards: "https://www.ebay.com/itm/234619696165?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=tebdRjHwQBi&sssrc=2566055&ssuid=tebdRjHwQBi&widget_ver=artemis&media=COPY",
            linkEbayIPCP: "https://www.ebay.com/itm/234820277889?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=tebdRjHwQBi&sssrc=2524149&ssuid=tebdRjHwQBi&widget_ver=artemis&media=COPY",
            linkEbayIPTS: "https://www.ebay.com/itm/234820285845?mkcid=16&mkevt=1&mkrid=711-127632-2357-0&ssspo=tebdRjHwQBi&sssrc=2524149&ssuid=tebdRjHwQBi&widget_ver=artemis&media=COPY"
        }
        this.handlePortfolio = this.handlePortfolio.bind(this);
        this.handleVideos = this.handleVideos.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitWebProject = this.submitWebProject.bind(this);
        this.submitRepair = this.submitRepair.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

      //old Corolla Videos = PLq3f8HX2eMEOKTcBfY37BfTixHiLi9K1e

    getVideos(playlistId, localStateVar) {
        /*
        
            This will get videos from Google API
        
        */
        const ytHeaders = {
            'Accept': 'application/json'
        }

        fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&part=player&id=${playlistId}&key=${process.env.REACT_APP_YT_API_KEY}`, {
            method: 'GET',
            headers: ytHeaders,
        })
        .then( res => res.json())
        .then((data) => {
            let varName = `${localStateVar}`;
            console.log(localStateVar)
            this.setState({
                [`${varName}`] : data,
                message: ''
            })
            console.log(this.state.e110CorollaVideos)
        })
    }

    getVideosFromBackend(playlistId, localStateVar) {
        const ytHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'no-cors',
        }
        if (!this.state[localStateVar]) {
                fetch(`/api/videos/${playlistId}`, {
                method: 'GET',
                headers: ytHeaders,
            })
            .then( res => res.json())
            .then((data) => {
                let varName = `${localStateVar}`;
                console.log(data)
                this.setState({
                    [`${varName}`] : data,
                    message: ''
                })
                console.log(this.state[localStateVar])
            })
        }
        
    }

    getUserInfo(event){
        if (localStorage.getItem('public_id')){
            console.log(localStorage.getItem('public_id'))
            console.log(localStorage.getItem('token'))
        }
    }

    submitWebProject(event){
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'no-cors',
        }

        var public_id = null;
        if (localStorage.getItem('public_id')){
            public_id = localStorage.getItem('public_id');
        }
        
 
        const submitObject = {
            web_service_first_name: this.state.web_service_first_name,
            web_service_last_name: this.state.web_service_last_name,
            web_service_email: this.state.web_service_email,
            web_service_phone: this.state.web_service_phone,
            web_service_project_explanation: this.state.web_service_project_explanation,
            web_service_extra_details: this.state.web_service_extra_details,
            web_service_user_public_id: public_id
        }
        
        
        fetch(`/api/mail_in_web`, {
            method: 'POST',
            body: JSON.stringify(submitObject),
            headers: headers,
        })
        .then(res=>res.json())
        .catch(err => {
            console.log(err)
            this.setState({
              webServiceErrorMessage: `Error: ${err}`,
              webServiceErrorBool: true,
            });
        });
        
    }

    submitRepair(event){
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'no-cors',
        }

        const public_id = null;
        if (localStorage.getItem('public_id')){
            const public_id = localStorage.getItem('public_id');
        }

        const submitObject = {
            repair_first_name: this.state.repair_first_name,
            repair_last_name: this.state.repair_last_name,
            repair_email: this.state.repair_email,
            repair_phone: this.state.repair_phone,
            repair_address_line_one: this.state.repair_address_line_one,
            repair_address_line_two: this.state.repair_address_line_two,
            repair_address_city: this.state.repair_address_city,
            repair_address_state: this.state.repair_address_state,
            repair_address_postal_code: this.state.repair_address_postal_code,
            repair_address_country: this.state.repair_address_country,
            repair_brand: this.state.repair_brand,
            repair_model: this.state.repair_model,
            repair_serial: this.state.repair_serial,
            repair_issue: this.state.repair_issue,
            repair_user_public_id: public_id
        }
        
        fetch(`/api/mail_in_repair`, {
            method: 'POST',
            body: JSON.stringify(submitObject),
            headers: headers,
        })
        .then(res=>res.json())
        .catch(err => {
            console.log(err)
            this.setState({
              repairErrorMessage: `Error: ${err}`,
              repairErrorBool: true,
            });
        });
        
    }

    // Handle Show/Hide Events
    handlePortfolio(event){
        this.setState({
            showPortfolio: !this.state.showPortfolio
        })
    }

    handleVideos(event){
        this.setState({
            showVideos: !this.state.showVideos
        })
    }

    handleInputChange =(e)=>{
        const {value,name}= e.target;
        this.setState({
            [name]:value
        });
    }

    componentDidMount(){
        
        
    }
    render(){
        return(
            <Container>
                <Row>
                    <Col lg={1}></Col>
                    <Col lg={10}>
                        <Container>
                        <Alert variant="danger" className="row my-3">We are currently moving away from the old system of mail-in repairs. Please always login first and use the new submission form in UserHome.</Alert>
                            {/* <HomeIntroduction 
                                linkEbayMBBoards={this.state.linkEbayMBBoards}
                                linkEbayIPBoards={this.state.linkEbayIPBoards}
                                linkEbayIPCP={this.state.linkEbayIPCP}
                                linkEbayIPTS={this.state.linkEbayIPTS}
                            /> */}
                            <HomeCarousel/>
                            <DetailsRepair/>
                            {/* <div>
                                Board Level Repair
                            </div> */}
                            {/* <RepairCard 
                                handleInputChange={this.handleInputChange}
                                repair_first_name={this.state.repair_first_name}
                                repair_last_name={this.state.repair_last_name}
                                repair_email={this.state.repair_email}
                                repair_phone={this.state.repair_phone}
                                repair_address_line_one={this.state.repair_address_line_one}
                                repair_address_line_two={this.state.repair_address_line_two}
                                repair_address_city={this.state.repair_address_city}
                                repair_address_state={this.state.repair_address_state}
                                repair_address_postal_code={this.state.repair_address_postal_code}
                                repair_address_country={this.state.repair_address_country}
                                repair_brand={this.state.repair_brand}
                                repair_model={this.state.repair_model}
                                repair_serial={this.state.repair_serial}
                                repair_issue={this.state.repair_issue}
                                repairErrorBool={this.state.repairErrorBool}
                                repairErrorMessage={this.state.repairErrorMessage}
                                submitRepair={this.submitRepair}
                            /> */}
                            {/* <RepairAccordion
                                handleInputChange={this.handleInputChange}
                                repair_first_name={this.state.repair_first_name}
                                repair_last_name={this.state.repair_last_name}
                                repair_email={this.state.repair_email}
                                repair_phone={this.state.repair_phone}
                                repair_address_line_one={this.state.repair_address_line_one}
                                repair_address_line_two={this.state.repair_address_line_two}
                                repair_address_city={this.state.repair_address_city}
                                repair_address_state={this.state.repair_address_state}
                                repair_address_postal_code={this.state.repair_address_postal_code}
                                repair_address_country={this.state.repair_address_country}
                                repair_brand={this.state.repair_brand}
                                repair_model={this.state.repair_model}
                                repair_serial={this.state.repair_serial}
                                repair_issue={this.state.repair_issue}
                                repairErrorBool={this.state.repairErrorBool}
                                repairErrorMessage={this.state.repairErrorMessage}
                                submitRepair={this.submitRepair}
                                
                            /> */}
                            
                            
                        </Container>
                    </Col>
                    <Col lg={1}></Col>
                </Row>
            </Container>
        )
    }
}

// Helper Components

const Portfolio = (props) => {
    return (
        <>
            <Col lg={4}>
                <Card bg={"light"} text={"dark"} className="my-3">
                    <Card.Header>
                        <h2>the Tek Cowboys - Online Mail-in Repair Web Application</h2>
                    </Card.Header>
                    <Card.Body>
                        <p>Wordpress site with a plugin that embeds a static site built with react.js. This react app is a form that connects to the admin Rest API. There's another stack built also with react that allows techs to see the submited repairs from the wordpress plugin. The Rest API stores the submitted repairs in a Postgresql database and is written with the Flask web frameword in Python3.</p>
                        <Button href="https://thetekcowboys.com" variant="primary">Visit Wordpress front-end</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={4}>
                <Card bg={"light"} text={"dark"} className="my-3">
                    <Card.Header>
                        <h2>Chromebook Parts Inventory and Info Tracker</h2>
                    </Card.Header>
                    <Card.Body>
                        <p>Application that keeps track of Chromebook and Macbook parts with physical location codes to keep track of physical inventory.</p>
                        <Button href="https://chromebooks.v3.jamielynn.dev/" variant="primary">Visit App</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={4}>
                <Card bg={"light"} text={"dark"} className="my-3">
                    <Card.Header>
                        <h2>Korean/Japanese Vocab Flashcards</h2>
                    </Card.Header>
                    <Card.Body>
                        <p>Application that quizes on Japanese and Korean flashcards that includes: Topik I, Topik II, and JLPT 5 to 3.</p>
                        <Button href="https://jamielynn.dev/flashcards" variant="primary">Visit App</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={4}>
                <Card bg={"light"} text={"dark"} className="my-3">
                    <Card.Header>
                        <h2>Korean/Japanese Grammar and Vocab Points Application</h2>
                    </Card.Header>
                    <Card.Body>
                        <p>Application that allows user to make notes called "points" for Korean and Japanese grammar or vocab.</p>
                        <Button href="https://jamielynn.dev/points" variant="primary">Visit App</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

// Enhanced Higher Order Components
const CollapsablePortfolio = withSmallCollContainer(Portfolio);
  





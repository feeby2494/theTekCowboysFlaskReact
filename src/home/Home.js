import React,{Component} from 'react';
import parse from "html-react-parser";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Home extends Component {
    constructor(){
        super();
        this.state ={
            message:'loading...',
            e110CorollaVideos: null,
            e170CorollaVideos: null,
            fg1CivicVideos: null
            
        }
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

        /*
        
            This will get videos from my backend API;
            I will have a script that gets videos for these playlists every week,
            then it will either update a json or DB,
            then when the Google API Quata is reached,
            this method will be used instead to get the videos,
            from a static source on my own API.

            Have not made this yet and not using, just a copy of other method.
        
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

    componentDidMount(){
        fetch('http://127.0.0.1:5000/api/home', { method: 'get', mode: 'no-cors', })
        .then( res => res.text())
        .then(res=>this.setState({message:res}))
        .then(this.getVideos('PLq3f8HX2eMEOKTcBfY37BfTixHiLi9K1e', 'e110CorollaVideos'))
        .then(this.getVideos('PLq3f8HX2eMEPx3TTxOyJCCwlLRDPL-zTv', 'e170CorollaVideos'))
        .then(this.getVideos('PLq3f8HX2eMEMzZWjfwIS07nAQMLzrzcpJ', 'fg1CorollaVideos'))
        
    }
    render(){
        return(
            <Container>
                <Row className="my-3 w-100">
                    <Col>
                        { 
                            (!this.state.e110CorollaVideos)
                            ?
                                <h2>{this.state.message}</h2>
                            :
                                <></>
                        }
                    </Col>
                </Row>
                <RenderPlaylist videos={this.state.e110CorollaVideos} />
                <RenderPlaylist videos={this.state.e170CorollaVideos} />
                <RenderPlaylist videos={this.state.fg1CorollaVideos} />
            </Container>
        )
    }
}


const RenderPlaylist = (props) => {
    
  
    return (
        <Row className="my-3">
                    {
                        (props.videos)
                        ?
                            (props.videos.error)
                            ?
                                <Col lg={6}>{props.videos.error.errors[0].message}</Col>
                            :
                                
                                props.videos.items.map((video) => {
                                    return (
                                        <Col lg={6}>
                                            <h2>{video.snippet.title}</h2>
                                            {parse(video.player.embedHtml)}
                                        </Col>
                                    )
                                })
                                   
                        :
                            <></>
                        
                    }
        </Row>
        
    )
  }
  
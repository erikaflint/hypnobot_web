import {useState, useEffect} from 'react'
import HomePageTabs from './HomePageTabs'
import logo from '../../../../src/assets/media/hypnoscript_logo.png'
import Search from 'antd/es/input/Search'
import RadioSelect from './RadioSelect';
import HypnosisDetail from './HypnosisDetail';
import audioMusic from '../../../assets/media/music.MP3'
import { Button, Input, notification, Spin, InputNumber } from 'antd'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom';
import axiosBase from '../../../utils/axios';
import { DashboardOutlined } from '@ant-design/icons'

export default function HomePage() {
    const [showAuthButtons, setShowAuthButtons] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [showSearchPage, setShowSearchPage] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAIgeneratingScript, setIsAIgeneratingScript] = useState(false);
    const [scriptSubject, setScriptSubject] = useState("");
    const [scriptValue, setScriptValue] = useState("");
    const [AIgeneratedScript, setAIgeneratedScript] = useState(null);
    // const [feedbackRating, setFeedBackRating] = useState(5);
    // const [feedbackComment, setFeedBackComment] = useState("");

    let location = useLocation();
    const navigate = useNavigate();
    // const { TextArea } = Input;

    // check for current page
    useEffect(()=> {
        if(location.pathname === '/search') {
            setShowSearchPage(true);
            setSearchValue(location.search.substring(1));
            getSearchResult(location.search.substring(1));
            setAIgeneratedScript(null);
        } else {
            if(location.pathname === '/getrandomhypnosis') {
                setShowSearchPage(true);
                fetchRandomHypnosis();
            } else {
                setShowSearchPage(false);
            }
            setSearchValue("");
            setAIgeneratedScript(null);
        }
    }, [location]);

    useEffect(() => {
        // check if user is logged in
        if(localStorage.getItem("username")){
            setShowAuthButtons(false);
        }
     }, []);

    const searchHypnosis = (searchText) => {
        if(searchText.length) {
            navigate(`/search?${searchText}`);
        }
    }

    const getSearchResult = async (searchTerm) => {
        setIsLoading(true);
        setSearchResult([]);
        try {
            const response = await axiosBase.get(`gpt/search/?q=${searchTerm}`);
            if (response.data?.results) {
                setSearchResult(response.data?.results);
            }
            setIsLoading(false)
        }
        catch (e) {
            setIsLoading(false);
            openNotification('Error', e.message);
        }
    }

    const fetchRandomHypnosis = async () => {
        setIsLoading(true);
        setSearchResult([]);
        var result = [];
        try {
            const response = await axiosBase.get(`gpt/get-random-script/`);
            result.push(response.data?.results);
            setSearchResult(result);
            setIsLoading(false)
        }
        catch (e) {
            setIsLoading(false);
            openNotification('Error', e.message);
        }
    }

    const openNotification = (type, message) => {
        notification.open({
            message: `${type}`,
            description: `${message}`,
          });
      };

    const generateHypnosis = async () => {
        setIsAIgeneratingScript(true);
        try {
            const response = await axiosBase.post(`gpt/generate-script/`, {prompt: scriptSubject, script_type: scriptValue});
            if (response.data) {
                setAIgeneratedScript(response.data);
                setScriptSubject("");
                setScriptValue("");
            }
            setIsAIgeneratingScript(false);
            setSearchResult([]);
        }
        catch (e) {
            setScriptSubject("");
            setScriptValue("");
            setSearchResult([]);
            setIsAIgeneratingScript(false);
            openNotification('Error', e.message);
        }
    }

    const goToHomePage = () => {
        navigate("/")
    }

    // const changeFeedBackRating = (value) => {
    //     setFeedBackRating(value);
    // };

    // const submitFeedback = () => {
    //     console.log('feedback rating and comment ', feedbackRating, feedbackComment);
    // }

    const AuthOptions = () => {
        return(
            <div className='home-action-btn'>
                <Button onClick={() => navigate('/login')} type='primary'>Login</Button>
                <Button onClick={() => navigate('/register')} type='primary' style={{ marginLeft: ".5rem" }}>Register</Button>
            </div>
        )
    }

    const GoToDashboard = () => {
        return(
            <div className='home-action-btn'>
                <Button onClick={() => navigate('/profile')} type='primary' icon={<DashboardOutlined />}>Go To Dashboard</Button>

            </div>
        )
    }

    const SearchResult = () => {
        return(
            <>
                <h2 style={{marginBottom: '1.5rem'}}>{ location.pathname === '/search' ? `${searchResult.length} Search result for ${searchValue}` : `Generated Hypnosis Scripts` }</h2>
                {isLoading &&
                <div style={{width: '100%', height:'10vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Spin size='large' />
                </div>
                }
                {
                    searchResult.map((result, index) => {
                        return(
                            <HypnosisDetail key={index} image={result.image} summary={result.summary} type={result.type} text={result.text}/>
                        )
                    })
                }

            </>
        )
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
                <h5 style={{ fontSize: "1.4em", fontWeight: '700', fontStyle: "oblique", cursor: 'pointer' }} onClick={goToHomePage} >Welcome to the Hypnobot</h5>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={logo} alt="logo" height={"100px"} width={"100px"} style={{cursor: 'pointer'}} onClick={goToHomePage} />
                    { showAuthButtons ? <AuthOptions /> : <GoToDashboard />}
                </div>
            </div>
            <HomePageTabs />
            <div className='text-container'>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Search
                        placeholder="Search Hypnosis!!"
                        allowClear
                        enterButton="Search"
                        size="large"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={(values) => searchHypnosis(values)}
                    />
                    <Button onClick={() => navigate('/getrandomhypnosis')} type='primary' size='large' style={{ marginLeft: '0.8rem'}}>Get Random Hypnosis!!</Button>
                </div>
                { showSearchPage ? <SearchResult /> : ''}
                <p className='hypnoText'>Hypno Bot App : AI Generated Hypnosis Scripts!</p>
                <p className='patient-text'>Note: Please Be Patient! The Hypnobot takes 1-2 Minutes to Generate Your Script. Please pause, breathe, and enjoy the present moment.</p>
                {isAIgeneratingScript &&
                <div style={{width: '100%', height:'10vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem'}}>
                    <Spin size='large' tip="Generating Heypnosis Script..."/>
                </div>
                }
                {
                    AIgeneratedScript &&
                    <div>
                        {AIgeneratedScript &&
                            <HypnosisDetail image={AIgeneratedScript.image} summary={AIgeneratedScript.headline} type={AIgeneratedScript.prompt} text={AIgeneratedScript.response}/>
                        }
                        {/* <div style={{marginTop: '2rem'}}>
                            <p style={{fontSize: "1.5em", fontWeight: '700'}}>Rate this hypnosis script</p>
                            <p style={{fontSize: "1.1em", fontWeight: '700'}}>Rate this script and have it added to the script database</p>
                            <div style={{display: 'flex', gap:'1em'}}>
                                <div>Rating (1-5):</div>
                                <InputNumber style={{width: '300px'}} size="middle" min={1} max={5} value={feedbackRating} onChange={changeFeedBackRating} />
                            </div>
                            <div style={{display: 'flex', gap:'1.5em', marginTop: '1rem', marginBottom: '1rem'}}>
                                <div>Comments:</div>
                                <TextArea style={{width: '300px'}} rows={4} placeholder="Feedback Comment" maxLength={6} value={feedbackComment} onChange={(e) => setFeedBackComment(e.target.value)}/>
                            </div>
                            <Button type='primary' size='large' onClick={submitFeedback}>Submit Feedback</Button>
                        </div> */}
                    </div>
                }
                <div style={{display: 'flex', marginTop: '2em'}}>
                    <p style={{width: '40%', fontSize: '1rem'}}>What you want a hypnosis script on?</p>
                    <Input
                        placeholder="Subject"
                        id="prompt-input"
                        value={scriptSubject}
                        onChange={(e) => setScriptSubject(e.target.value)}
                    />
                </div>
                <RadioSelect value={scriptValue} setValue={setScriptValue} />
                <div style={{ marginTop: "1rem" }}>
                    <Button type='primary' size='large' onClick={generateHypnosis} disabled={!scriptSubject.length || !scriptValue.length}>Generate Hypnosis!</Button>
                </div>
                <p style={{ fontSize: "1.5em", fontWeight: '700' }}>Play Lilly Pond while your hypnosis script is generating...</p>
                <audio id="player" autoPlay={false} controls><source src={audioMusic} type="audio/mp3" /></audio>
                <p style={{ fontSize: "1.5em", fontWeight: '700' }}>Thank you for using the Happy Hypno Bot You Are Deeply Deeply Loved</p>
            </div>
        </div>
    )
}

const HypnosisDetail = ({image, summary, type, text}) => {

    return (
        <>
            <div style={{marginBottom: '1rem', border: '1px solid white', padding: '1rem', width: '100%'}}>
                <div style={{display: 'flex', borderBottom: '1px solid white'}}>
                    <img src={process.env.REACT_APP_baseUrl+image} alt={summary} style={{width: '10rem', marginBottom: '1.5rem'}} />
                    <div style={{textAlign: 'center', marginLeft: '1rem'}}>
                        <div style={{fontSize: '1.4rem', marginTop:'1.5rem', marginBottom: '1.5rem', width: '100%', textAlign: 'center'}}>{summary}</div>
                        <div style={{marginBottom: '1.5rem'}}> Prompt: {type}</div>
                    </div>
                </div>
                <div>
                    <pre>{text}</pre>
                </div>
            </div>
        </>
    );
};
export default HypnosisDetail;

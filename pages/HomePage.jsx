import React, {useState, useEffect} from 'react';
import axios from 'axios' 
import Router from 'next/router'
import Link from "next/link"; 

const HomePage = () => {

    const [data, setData] = useState([])
    const [allData, setAllData] = useState([])
    const [directorList, setDirectorList] = useState(['All'])
    const [director, setDirector] = useState('')
    const [languageList, setLanguageList] = useState(['All'])
    const [language, setLanguage] = useState('')
    const [load, setLoad] = useState(true)

    const handleClick = (i) => {
        Router.push({
            pathname: '/MovieCard',
            query: { title: i.target.innerText }
        })
    }

    useEffect(() => {
        axios.get('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON')
        .then(res => res.data.map(i => {
            setData(data => [...data, i])
            setAllData(allData => [...allData, i])
            if(i.Director !== "N/A"){
                setDirectorList(directorList => [...directorList,i.Director])
            }
            setLanguageList(languageList => [...languageList,i.Language])        
        }))
        .then(() => {
            setLoad(false)
        })
    },[])

    useEffect(() => {
        axios.get('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON')
        .then(res => res.data.map(i => {
            if(i.Director === director ){
                setData([])
                setData(data => [...data, i])
            } else if(director === 'All') {
                setData(allData)
            }
            if(i.Language === language){
                console.log(language, i.Language)
                setData([])
                setData(data => [...data, i])
            } else if(language === 'All'){
                setData(allData)
            }
        }))
    },[director, language])

    return (
        <>
            <div className="container">
                <div className="title-cont">
                    <span>Numen Movies</span>
                    <Link href="/"><button>Sign Out</button></Link>
                </div>
                <div className="filter-sec">
                    <div>
                        <label>Filter by Director</label>
                        <select onChange={(e) => setDirector(e.target.value)}>
                            {directorList.map((i, ind) => (
                                <option key={ind}>{i}</option>    
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Filter by Language</label>
                        <select onChange={(e) => setLanguage(e.target.value)}>
                            {languageList.map((i, ind) => (
                                <option key={ind}>{i}</option>    
                            ))}
                        </select>
                    </div>
                </div>
                <div className="content">
                {load === true ? 
                <div className="load">
                    <span>Loading...</span>
                </div> :
                    <>
                        {data.map((i,ind) => (
                            <div onClick={(i) => handleClick(i)} key={ind} className="sub-cont">
                                <span id="title">{i.Title}</span>
                                <img src={i.Images[0]}></img>
                            </div>        
                        ))}
                    </> }
                </div>
            </div>
            <style>
                {`
                .container{
                    height: 100vh;
                    background: #00B4DB;  
                    background: -webkit-linear-gradient(to right, #0083B0, #00B4DB);  
                    background: linear-gradient(to right, #0083B0, #00B4DB);
                    display: flex;
                    flex-direction: column;
                    overflow-y:scroll;
                }
                .title-cont{
                    height: 20%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 50px 0px 50px 0px;
                    position: relative;
                }
                .title-cont button{
                    padding: 10px;
                    font-size: 18px;
                    border-radius: 10px;
                    border: none;
                    cursor: pointer;
                    color: #00B4DB;
                    background: #fff;
                    font-family: 'Fjalla One', sans-serif;
                    position: absolute;
                    top: 10%;
                    right: 50px;
                }
                .title-cont button:hover{
                    color: #fff;
                    background: #000;
                }
                .title-cont span{
                    font-size: 60px;
                    color: white;
                    font-family: 'Fjalla One', sans-serif;
                }
                .filter-sec{
                    height: 10%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin: 20px 0px 50px 0px;
                }
                .filter-sec label{
                    font-size: 25px;
                    color: white;
                    font-family: 'Fira Sans Extra Condensed', sans-serif;
                    margin-right: 10px;
                }
                .filter-sec select{
                    padding: 8px;
                    border-radius: 15px;
                    border: none;
                    font-size: 15px;
                    margin-left: 10px;
                    cursor: pointer;
                }
                .filter-sec select:focus{
                    outline: none;
                }
                .content{
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    padding-top: 10px;
                }
                .sub-cont{
                    height: 500px;
                    flex-basis: calc(100%/3);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    padding: 25px;
                    border: 2px solid white;
                    cursor: pointer;
                }
                .sub-cont:hover{
                    background-color: #00B7E0;
                }
                .sub-cont span{
                    font-family: 'Fira Sans Extra Condensed', sans-serif;
                    font-size: 40px;
                    font-weight: 800;
                    color: white;
                }
                .sub-cont img{
                    height: 70%;
                    width: 100%;
                }
                .load{
                    height: 100%;
                    width: 100%;
                    font-size: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                }
                `}
            </style>
        </>
    )
}

export default HomePage

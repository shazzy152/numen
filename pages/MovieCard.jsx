import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react';
import axios from 'axios' 

const MovieCard = () => {

    const router = useRouter()
    const [data, setData] = useState({})
    const [load, setLoad] = useState(true)

    useEffect(() => {
        axios.get('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON')
        .then(res => res.data.map(i => {
            if(i.Title === router.query.title){
                setData({...data, i})
            }
        }))
        .then(() => setLoad(false))
    },[])

    return (
        <>
            <div className="container">
            {load === true ? 
            <div className="load">
                <span>Loading...</span>
            </div> :
                <>
                    <div className="title-cont">
                        <span>{data.i.Title}</span>
                    </div>
                    <div className="content">
                        <div className="info-sec">
                            <div className="info">
                                <div className="marg">
                                    <label>Released</label>
                                    <span>{data.i.Released}</span>
                                </div>
                                <div className="marg">
                                    <label>Runtime</label>
                                    <span>{data.i.Runtime}</span>
                                </div>
                                <div className="marg">
                                    <label>Actors</label>
                                    <span>{data.i.Actors}</span>
                                </div>
                            </div>
                            <div className="info">
                                <div className="marg">
                                    <label>Director</label>
                                    <span>{data.i.Director}</span>
                                </div>
                                <div className="marg">
                                    <label>Plot</label>
                                    <span>{data.i.Plot}</span>
                                </div>
                            </div>
                            <div className="info">
                                <div className="marg">
                                    <label>Awards</label>
                                    <span>{data.i.Awards}</span>
                                </div>
                                <div className="marg">
                                    <label>Metascore</label>
                                    <span>{data.i.Metascore}</span>
                                </div>
                                <div className="marg">
                                    <label>IMDB rating</label>
                                    <span>{data.i.imdbRating}</span>
                                </div>
                            </div>
                        </div>
                        <div className="images">
                            {data.i.Images.map((i,ind) => (
                                <img className="image" src={i} key={ind}></img>
                            ))}
                        </div>
                    </div> 
                </> }
            </div> 
            <style>{`
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
                }
                .title-cont span{
                    font-size: 60px;
                    color: white;
                    font-family: 'Fjalla One', sans-serif;
                }
                .content{
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    padding: 10px;
                }
                .info-sec{
                    width: 60%;
                    display: flex;
                    flex-direction: column;
                    padding: 50px;
                }
                .info{
                    height: 400px;
                    width: 90%;
                    border-radius: 30px;
                    margin-bottom: 20px;
                    background-color: #D6F7FF;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 50px;
                    font-family: 'Fira Sans Extra Condensed', sans-serif;
                    font-size: 30px;
                    font-weight: 700;
                }
                .images{
                    width: 40%;
                    display: flex;
                    flex-direction: column;
                    padding-top: 40px;
                    padding-right: 60px;
                }
                .image{
                    margin: 10px 0px 10px 0px;
                    border-radius: 15px;
                }
                .info label{
                    font-family: 'Fira Sans Extra Condensed', sans-serif;
                    border-bottom: 1px solid #000;
                    padding-bottom: 0px;
                    border-width: 2px;
                    font-size: 30px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    color: #005266;
                }
                .marg{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    margin: 15px 0px 15px 0px;
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
            `}</style>
        </>
    )
}

export default MovieCard

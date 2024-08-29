import React, { useEffect, useState } from 'react';
import './App.css'

export default function Pokemon() {
    const [pkdata, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSeach]=useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
    const fetchPokemon = async () => {

        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);

            const rawdata = data.results.map(async (currentEl) => {
                const resp = await fetch(currentEl.url);
                const data2 = await resp.json();
                return data2
                // setData(data2)
                // console.log(data2);


            });
            const mainResponse = await Promise.all(rawdata);

            console.log(mainResponse);
            setData(mainResponse);
            setLoading(false);
        } catch (error) {
            console.log(error);

        }
    }
    // console.log(pkdata);
    
       const  searchData= pkdata.filter((curData)=>{
            return (curData.name.toLowerCase().includes(search.toLowerCase()));
        });
    
   
    const handlChange=(e)=>{
        setSeach(e.target.value);

    }

    useEffect(() => {
        fetchPokemon();

    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading.....</h1>
            </div>

        );
    }


    return (
        <>
        <div className='search'>
        <h1 style={{    
            textAlign: "center",
            margin:" 2rem 0",

         }}>Let's catch Pokemon</h1>
        <input type="text" value={search} placeholder='search' onChange={handlChange}/>
        </div>
       
            <ul className='mainCard'>

                {
                    searchData.map((cur) => {
                        return(<li key={cur.id}>


                            <div className="card">

                                <div className="image">
                                    <img style={{width:"50rem",height:"8rem"}} src={cur.sprites.other.dream_world.front_default} alt="" />

                                </div>
                                <div className="name">
                                    <h2>{cur.name}</h2>
                                    <p className='character'>{cur.types.map((typ)=>{return typ.type.name}).join(', ') }</p>
                                </div>
                                <div className="property">
                                    <div className='prop1'><b>Height:</b>{cur.height}</div>

                                    <div className='prop1'><b>weight:</b>{cur.weight}</div>
                                    <div className='prop1'><b>speed:</b>{cur.stats[5].base_stat}</div>
                                    <div className='prop'>
                                        <p>{cur.base_experience}</p>
                                        <p><b>experience</b></p>
                                    </div>
                                    <div className='prop'>
                                        <p>{cur.stats[1].base_stat}</p>
                                        <p><b>Attack</b></p>
                                    </div>
                                    <div className='prop'>
                                        <p>{cur.abilities[0].ability.name}</p>
                                        <p><b>Ability</b></p>
                                    </div>

                                </div>
                            </div>


                        </li>);
                        
                    })
                }
            </ul>







        </>
    );
}

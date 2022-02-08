import './App.css';
import { useEffect,useState } from 'react';
import pokeball from "./img/ball.png"
import gameOverpic from "./img/gameover.jpg"

function App() {
  //useState
  const [imageSrc, setimageSrc] = useState("")
  const [pokeArrayNames, setpokeArrayNames] = useState([])
  const [pokemonOnScreen, setpokemonOnScreen] = useState('')
  const [randomNum, setrandomNum] = useState("")
  const randoms = [...Array(4)].map(() => Math.floor(Math.random() * 152))
  const [showOptions, setshowOptions] = useState(true)
  const [showMatch, setshowMatch] = useState(false)
  const [showWrong, setshowWrong] = useState(false)
  const [blackImg, setblackImg] = useState(true)
  const [Score, setScore] = useState(0)
  const [lives, setlives] = useState([1,2,3])
  const [gameover, setgameover] = useState(false)
  //useEffect
  useEffect(()=>{
    fetchFunc()
  },[])
  useEffect(()=>{
    if(lives.length===0){
      setgameover(true)
    }
  },[lives])
  useEffect(()=>{
    if(randomNum!==0){
      //setimageSrc(`https://pokeres.bastionbot.org/images/pokemon/${randomNum}.png`)
      setimageSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomNum}.png`)
      ////console.log(randomNum)
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
      .then(res=>res.json())
      .then(data=>setpokemonOnScreen(data.name))
    }
  },[randomNum])

  useEffect(()=>{
    //console.log(pokemonOnScreen)
  },[pokemonOnScreen])
  
  //functions
  const fetchFunc = () => {
    setrandomNum(randoms[Math.floor(Math.random() * 4)])
    //console.log(randoms)
    randoms.map(x=>{
      return(
        fetch(`https://pokeapi.co/api/v2/pokemon/${x}`)
      .then(res=>res.json())
      .then(data=>setpokeArrayNames(item=>[...item,[x,data.name]]))
      ) 
  })
  }
  const clickHandler =(id,index)=>{
    setshowOptions(false)
    setblackImg(false)
    if(randomNum===id){
      setshowMatch(true)
      setScore(prevCount=>prevCount+1)
      //console.log("Matched")
    }
    else{
      //console.log('wrong')
      setshowWrong(true)
      setlives(lives.filter((x,i)=>i!==0))
      //colorChange(index,clr2)
    }
  }

  const clickHandler2 =() =>{
    setimageSrc('')
    setblackImg(true)
    fetchFunc()
    setpokeArrayNames([])
    setshowWrong(false)
    setshowMatch(false)
    setshowOptions(true)
  }
  const refreshGame =() =>{
    setimageSrc('')
    setblackImg(true)
    fetchFunc()
    setpokeArrayNames([])
    setshowWrong(false)
    setshowMatch(false)
    setshowOptions(true)
    setgameover(false)
    setScore(0)
    setlives([1,2,3])
  }

  //mainCode
  return(
    <div className="App">
      <div className="mainDiv">
        <div className="gameScreen">
                {!gameover && <div className="game">
                <div className="imgdiv">
                  {blackImg && <img style={{filter:"contrast(0%) brightness(0%)"}} src={imageSrc} alt="" />}
                  {!blackImg && <img  src={imageSrc} alt="" />}
                  </div>
                
                
                <div className="secondDiv">
                {showOptions && pokeArrayNames.map((x,index)=>{
                  return(
                  <div className="optionDiv" onClick={()=>clickHandler(x[0],index)}><h3>{x[1].toUpperCase()}</h3></div>)
                })}
                </div>

                <div className="thirdDiv">
                {showMatch && <div className="match"><h1>Matched</h1></div>}
                {showWrong && <div className="wrong"><h1>Wrong</h1> <h4>It's    {pokemonOnScreen.toUpperCase()} </h4> </div>}
                {!showOptions && <div className="next" onClick={clickHandler2}><h3>Next Quiz</h3></div>}
                </div>
                
                <div className="fourthDiv">
                  <h1>Score:{Score}</h1>
                  <div style={{display:"flex"}}><h1>Lives:</h1>{lives.map((x)=><img id={x} className="pokeballImg" src={pokeball} alt="" />)}</div>
                  
                </div>
                </div>}
                {gameover && <div className="gameoverScreen">
                  <img src={gameOverpic} alt="" />
                  <button onClick={refreshGame}>Try again</button>
                  </div> }
        </div>
    </div>
    
      {/* <div className="title">
      <h1>Who's that Pokemon Quiz!!</h1>
      </div> */}
      
    </div>
  )
}

export default App;

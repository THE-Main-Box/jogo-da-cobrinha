const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

  

const audio = new Audio('../audio/audio.mp3')


  

let cobrinha = [
    {x:100, y:250}


]

const bodysize = 25;

const pontos = document.getElementById("pontos")

const somarpt = () => {
    pontos.innerText =   parseInt(pontos.innerText )+10
  
}

const restartsc = document.getElementById("reinicio")

const btn = document.getElementById("jogarnovamente")

btn.addEventListener("click", ()=>{
    restartsc.style.display = "none" 
     pontos.innerText = "00";
     location.reload()
   
})


let direction
let loopId
const aleatoryN = (min,max)=>{
    return  Math.round(Math.random() * (max - min)+ min)
}

const aleatoryP = ()=>{
    const numero = aleatoryN(0, canvas.width - bodysize)
    return Math.round(numero / 25) *25
}

const aleatoryC = () => {
    const red = aleatoryN(0,255)
    const green = aleatoryN(0,255)
    const blue = aleatoryN(0,255)

    return `rgb(${red},${green},${blue})`
}

const comidinha = {
    x: aleatoryP(),
    y: aleatoryP(),
    color:aleatoryC()
}

const cobraDesenho= () =>{
   
    ctx.fillStyle= "#d3d3d3"


cobrinha.forEach((posicao, item)=>{
    if(item == cobrinha.length - 1){
        ctx.fillStyle = "red"
    }
    
    
    ctx.fillRect(posicao.x ,posicao.y ,bodysize,bodysize)
})



}

const desenharComidinha = () =>{
    const {x, y,color} = comidinha

    ctx.shadowColor= color
    ctx.shadowBlur= 50
    
    ctx.fillStyle =color
    ctx.fillRect(x,y,bodysize,bodysize)
    
    ctx.shadowBlur=0
}

const mover = ()=>{
    if(!direction)  return

    const head = cobrinha[cobrinha.length -1]

    cobrinha.shift()

    if(direction == "right" ){
        cobrinha.push({x:head.x + bodysize,  y:head.y })
    }
    if(direction == "left" ){
        cobrinha.push({x:head.x - bodysize,  y:head.y })
    }
    if(direction == "up" ){
        cobrinha.push({x:head.x ,  y:head.y - bodysize })
    }
    if(direction == "down" ){
        cobrinha.push({x:head.x ,  y:head.y + bodysize })
    }




}

const grade = () =>{
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

 for (let i = 25; i < canvas.width ; i+= 25) {
    ctx.beginPath()
    ctx.lineTo(i, 0)
    ctx.lineTo(i, 500)
    ctx.stroke()
    
    
    ctx.beginPath()
    ctx.lineTo(0, i)
    ctx.lineTo(500, i)
    ctx.stroke()
 }


    
}

const checkEat = () =>{
    const head = cobrinha[cobrinha.length -1]

     
    if (head.x == comidinha.x && head.y == comidinha.y) {
        cobrinha.push(head)
        audio.play()

       somarpt()

        let x= aleatoryP()
        let y = aleatoryP()
       
        while(cobrinha.find((posição)=> posição.x == x && posição.y == y)){
        x= aleatoryP()
        y = aleatoryP()

        }
        comidinha.x = x
        comidinha.y = y
        comidinha.color=aleatoryC()
    }
}
const checkDeath = () =>{
    const head = cobrinha[cobrinha.length -1]
    const canvaslimit = canvas.width -bodysize
    const neck = cobrinha.length -2

    const wallcolision =
    head.x < 0 || head.x > canvaslimit || head.y < 0 || head.y > canvaslimit 

    const bodycolision = cobrinha.find((posicao, index) =>{
        return index < neck && head.x == posicao.x && posicao.y == head.y 
    })

    if (wallcolision || bodycolision ) {
        restartsc.style.display = "flex" 
       
    gameOver()
}
}

const gameOver = ()=> {
    mover = undefined


}

const loop = () =>{
    clearInterval(loopId)
    ctx.clearRect(0,0, canvas.width, canvas.width)
    
    grade()
    desenharComidinha()
    mover()
    cobraDesenho()
    checkEat()
    checkDeath()
   
    loopId =setTimeout(()=>{
        loop()
    },100 )

}

loop()

document.addEventListener("keydown", ({key})=>{

    if(key == "ArrowRight" && direction !== "left" ){
        direction = "right"
     }
    if(key == "ArrowLeft" && direction !== "right"){
        direction = "left"
    }
    if(key == "ArrowUp" && direction !=="down"){
        direction = "up"
    }
    if(key == "ArrowDown" && direction !== "up"){
        direction = "down"
    }


})




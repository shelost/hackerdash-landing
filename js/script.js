let canvas = Id('canvas')
let ctx = canvas.getContext('2d')

const MARK = new Image()
MARK.src = 'assets/Hackerdash-mark.svg'

let CX, CY, MX, MY = 0

function Resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    CX = canvas.width / 2
    CY = canvas.height / 2 - 150
}

Resize()

let M = [[CX, CY]]

window.onresize = Resize

window.addEventListener('mousemove', e => {
    MX = e.clientX;
    MY = e.clientY + window.scrollY;

    M.push([MX, MY])
})

let p = 0
let t = 0
let lines = []


for (let i = 0; i < 30; i++) {
    let angle = Math.random() * Math.PI * 2

    let a = Math.floor(1 + Math.random() * 0.5)
    let b = a - Math.random() * 0.3

    let speed = 3 + Math.random()*2

    lines.push({ angle, a, b, speed, sx: CX, sy: CY, ex: CX, ey: CY, t: 0})
}


setInterval(() => {
    let angle = Math.random() * Math.PI * 2

    let a = Math.floor(1 + Math.random() * 0.5)
    let b = a - Math.random()* 0.3

    let speed = 3 + Math.random()*2

    lines.push({ angle, a, b, speed, sx: CX, sy: CY, ex: CX, ey: CY, t: 0 })


},50)

setInterval(() => {
    if (M.length > 2) {
        M.splice(0,1)
    }
},15)



let loop = () => {


    ctx.clearRect(0, 0, canvas.width, canvas.height)


    // Circles
    p += 0.05
    for (let i = 0; i < 5; i++){
        ctx.strokeStyle = '#FF007A'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(CX, CY, 120+i*20, p+i*20, p+i*15+Math.PI * 1.8);
        ctx.stroke()
    }


    // Mouse trail
    ctx.strokeStyle = '#FF007A'
    ctx.lineWidth = 3
    ctx.beginPath()

    ctx.moveTo(M[0][0], M[0][1])
    for (let i = 0; i < M.length; i++) {
        let m = M[i]
        ctx.lineTo(m[0], m[1])
    }
    ctx.stroke()

    ctx.fillStyle = '#FF007A'
    ctx.beginPath()
    ctx.arc(MX, MY, 10, 0, Math.PI*2);
    ctx.fill()



    /*
    // Lines
    for (let i = 0; i < lines.length; i++) {

        let line = lines[i]

        let angle = line.angle,
            a = line.a,
            b = line.b

        line.t += line.speed
        line.sx = CX + Math.cos(angle) * line.t * a
        line.sy = CY + Math.sin(angle) * line.t * a
        line.ex = CX + Math.cos(angle) * line.t * (a + b)
        line.ey = CY + Math.sin(angle) * line.t * (a + b)

        ctx.strokeStyle = '#FF007A'
        ctx.globalAlpha = 0.15
        ctx.lineWidth = 5
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(line.sx, line.sy)
        ctx.lineTo(line.ex, line.ey)
        ctx.stroke()

        if (line.sx < 0 || line.sx > canvas.width
            || line.sy < 0 || line.sy > canvas.height) {
            lines.splice(lines.indexOf(line), 1)
        }
        ctx.globalAlpha = 1
    }
    */


    ctx.drawImage(MARK, CX - 100, CY - 100, 200, 200);



    window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)
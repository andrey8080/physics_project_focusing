let particle_m = 0;
let particle_u = 0;
let particle_q = 0;
let magnetic_field = 0;

function updateValueAngle1() {
    let angle = document.getElementById('angle1').value;
    document.getElementById('x1_angle').textContent = "angle: " + angle + "°";
}

document.getElementById("angle1").addEventListener("change", function () {
    let canvas = document.getElementById('canvas1');
    drawGraph(this.value, canvas);
    drawSummary();
});

function updateValueAngle2() {
    let angle = document.getElementById('angle2').value;
    document.getElementById('x2_angle').textContent = "angle: " + angle + "°";
}

document.getElementById("angle2").addEventListener("change", function () {
    let canvas = document.getElementById('canvas2');
    drawGraph(this.value, canvas);
    drawSummary();
});

function updateValueAngle3() {
    let angle = document.getElementById('angle3').value;
    document.getElementById('x3_angle').textContent = "angle: " + angle + "°";
}

document.getElementById("angle3").addEventListener("change", function () {
    let canvas = document.getElementById('canvas3');
    drawGraph(this.value, canvas);
    drawSummary();
});


function getXt(m, U, alpha, phi, q, B, t) {
    return (
        (m * U * Math.sin(alpha * Math.PI / 180)) / (q * B)
    ) * (
            Math.cos(t + phi) - Math.cos(phi)
        )
}

function getYt(m, U, alpha, phi, q, B, t) {
    return (
        (m * U * Math.sin(alpha * Math.PI / 180)) / (q * B)
    ) * (
            Math.cos(t + phi) + Math.sin(phi)
        )
}

function getZt(U, alpha, t) {
    e = U * Math.cos(alpha * Math.PI / 180) * t;
    return e
}


function drawGraph(angle, canvas) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();

    for (let phi = 0; phi < 2 * Math.PI; phi += 0.3) {
        for (let t = 0; t <= 48.5; t += 0.2) {
            let x = getXt(particle_m, particle_u, angle, phi, particle_q, magnetic_field, t);
            let y = getZt(particle_u, angle, t);

            x = canvas.width / 2 - x;

            if (t === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    }
    ctx.stroke();
}


function drawSummary() {
    let summary_graphs = document.getElementById('summary_graphs');
    let ctx = summary_graphs.getContext('2d');
    ctx.clearRect(0, 0, summary_graphs.width, summary_graphs.height);

    ctx.beginPath();
    ctx.moveTo(summary_graphs.width / 2, 0);
    ctx.lineTo(summary_graphs.width / 2, summary_graphs.height);
    ctx.stroke();
    ctx.closePath();

    let colors = ['#AA557FFF', '#55AA00FF', '#00007FFF'];

    for (let i = 0; i < 3; i++) {

        let angle = document.getElementById('angle' + (i+1)).value;

        let color = colors[i];

        ctx.beginPath();
        // ctx.strokeStyle = color;

        for (let phi = 0; phi < 2 * Math.PI; phi += 0.2) {
            for (let t = 0; t <= 48.5; t += 0.5) {
                let x = getXt(particle_m, particle_u, angle, phi, particle_q, magnetic_field, t);
                let y = getZt(particle_u, angle, t);

                x = summary_graphs.width / 2 - x;

                if (t === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
        }
        ctx.stroke();
    }
}



function handleRememberBtn() {
    particle_m = parseFloat(document.getElementById('particle_m').value);
    particle_u = parseFloat(document.getElementById('particle_u').value);
    particle_q = parseFloat(document.getElementById('partical_q').value);
    magnetic_field = parseFloat(document.getElementById('magnetic_field').value);
    drawGraph(document.getElementById('angle1').value, document.getElementById('canvas1'));
    drawGraph(document.getElementById('angle2').value, document.getElementById('canvas2'));
    drawGraph(document.getElementById('angle3').value, document.getElementById('canvas3'));
    drawSummary();
}

window.onload = function () {
    document.getElementById('particle_m').value = 0.5;
    document.getElementById('particle_u').value = 20;
    document.getElementById('partical_q').value = 0.08;
    document.getElementById('magnetic_field').value = 0.3;

    handleRememberBtn();

    document.getElementById('rememberBtn').click;

    drawGraph(document.getElementById('angle1').value, document.getElementById('canvas1'));
    drawGraph(document.getElementById('angle2').value, document.getElementById('canvas2'));
    drawGraph(document.getElementById('angle3').value, document.getElementById('canvas3'));
    drawSummary();
}


// добавить поперечные сечения на точках фокусировки
// необходимо:
//     - вычислить расстояние от начала до точки фокусировки у минимального угла
//     - построить график поперченого сечения для совмещения графиков в орт. проекции
//     - попутно будет сделана подпись расстояния точек фокусировки от начала координат
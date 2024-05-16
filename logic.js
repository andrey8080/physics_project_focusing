let particle_m = 0;
let particle_u = 0;
let particle_q = 0;
let magnetic_field = 0;
let scale = 0.5;

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
            Math.sin(phi + t - Math.PI / 2) + Math.cos(phi)
        )
}

function getYt(m, U, alpha, phi, q, B, t) {
    return (
        (m * U * Math.sin(alpha * Math.PI / 180)) / (q * B)
    ) * (
            Math.cos(phi + t - Math.PI / 2) - Math.sin(phi)
        )
}

function getZt(U, alpha, t) {
    e = U * Math.cos(alpha * Math.PI / 180) * t;
    return e
}



function drawGraph(angle, canvas) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();

    for (let phi = 0; phi < 2 * Math.PI; phi += 0.2) {
        for (let t = 0; t <= 48.5; t += 0.5) {
            let y = getXt(particle_m, particle_u, angle, phi, particle_q, magnetic_field, t) * scale;
            let x = getZt(particle_u, angle, t) * scale;

            x = canvas.width - 3.5 * x;
            y = canvas.height / 2 - y;

            if (t === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    }
    ctx.strokeStyle = '#1CAA76FF';
    ctx.stroke();
}


function drawSummary() {
    let summary_graphs = document.getElementById('summary_graphs');
    let ctx = summary_graphs.getContext('2d');
    ctx.clearRect(0, 0, summary_graphs.width, summary_graphs.height);

    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(0, summary_graphs.height / 2);
    ctx.lineTo(summary_graphs.width, summary_graphs.height / 2);
    ctx.stroke();
    ctx.closePath();

    let color = '#1CAA76FF'; 
    
    for (let i = 0; i < 3; i++) {
        let angle = document.getElementById('angle' + (i + 1)).value;

        ctx.beginPath();

        let startX = null;
        let startY = null;

        for (let phi = 0; phi < 2 * Math.PI; phi += 0.2) {
            for (let t = 0; t <= 48.5; t += 0.5) {
                let y = getYt(particle_m, particle_u, angle, phi, particle_q, magnetic_field, t) * scale;
                let x = getZt(particle_u, angle, t) * scale;

                x = summary_graphs.width - 4 * x;
                y = summary_graphs.height / 2 - y;

                if (t === 0) {
                    startX = x;
                    startY = y;
                    ctx.moveTo(startX, startY);
                } else {
                    ctx.lineTo(x, y);
                }
            }
        }
        ctx.strokeStyle = color; // Установка розового цвета
        ctx.stroke();
    }
}



function handleRememberBtn() {
    particle_m = parseFloat(document.getElementById('particle_m').value);
    particle_u = parseFloat(document.getElementById('particle_u').value);
    particle_q = parseFloat(document.getElementById('partical_q').value);
    magnetic_field = parseFloat(document.getElementById('magnetic_field').value);

    let modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.hide();

    drawGraph(document.getElementById('angle1').value, document.getElementById('canvas1'));
    drawGraph(document.getElementById('angle2').value, document.getElementById('canvas2'));
    drawGraph(document.getElementById('angle3').value, document.getElementById('canvas3'));
    drawSummary();
}

function setCanvasSize(canvas) {
    let containerWidth = canvas.parentNode.clientWidth;
    let containerHeight = canvas.parentNode.clientHeight;

    canvas.width = containerWidth;
    canvas.height = containerHeight;

    drawGraph(document.getElementById('angle1').value, canvas);
}

window.addEventListener('DOMContentLoaded', () => {
    let canvases = document.querySelectorAll('canvas');

    function updateCanvasSizes() {
        canvases.forEach(canvas => {
            setCanvasSize(canvas);
        });
        drawGraph(document.getElementById('angle1').value, document.getElementById('canvas1'));
        drawGraph(document.getElementById('angle2').value, document.getElementById('canvas2'));
        drawGraph(document.getElementById('angle3').value, document.getElementById('canvas3'));
        drawSummary();
    }

    updateCanvasSizes();

    window.addEventListener('resize', updateCanvasSizes);

    document.getElementById('particle_m').value = 0.5;
    document.getElementById('particle_u').value = 20;
    document.getElementById('partical_q').value = 0.08;
    document.getElementById('magnetic_field').value = 0.3;

    handleRememberBtn();
});

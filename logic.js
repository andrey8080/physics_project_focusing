let points1 = [];
let points2 = [];
let points3 = [];

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
	points1 = drawGraph(this.value, canvas);
	drawSummary();
});


function updateValueAngle2() {
	let angle = document.getElementById('angle2').value;
	document.getElementById('x2_angle').textContent = "angle: " + angle + "°";
}

document.getElementById("angle2").addEventListener("change", function () {
	let canvas = document.getElementById('canvas2');
	points2 = drawGraph(this.value, canvas);
	drawSummary();
});


function updateValueAngle3() {
	let angle = document.getElementById('angle3').value;
	document.getElementById('x3_angle').textContent = "angle: " + angle + "°";

}

document.getElementById("angle3").addEventListener("change", function () {
	let canvas = document.getElementById('canvas3');
	points3 = drawGraph(this.value, canvas);
	drawSummary();
});



// вычисление координат точки в определённый момент
function getXt(m, U, alpha, phi, q, B, t) {
	return (
		(m * U * Math.sin(alpha * Math.PI / 180)) / (q * B)
	) * (
			Math.cos(t + phi) - Math.sin(phi)
		)
}

function getYt(m, U, alpha, phi, q, B, t) {
	return (
		(m * U * Math.sin(alpha * Math.PI / 180)) / (q * B)
	) * (
			Math.cos(t + phi) + Math.cos(phi)
		)
}

function getZt(U, alpha, t) {
	e = U * Math.cos(alpha * Math.PI / 180) * t;
	return e
}
// конец блока с вычислениями




function drawGraph(angle, canvas) {
    let points = [];

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let phi = 0; phi < 2 * Math.PI; phi += 0.2) {
        for (let t = 0; t <= 80; t += 0.5) {
            let x = getXt(particle_m, particle_u, angle, phi, particle_q, magnetic_field, t);
            let y = getZt(particle_u, angle, t);

            // Преобразование координат для отображения на холсте
            // x *= 2;
            // y *= 2;
            y = canvas.height - y; // Инвертируем ось y, т.к. на холсте она направлена вниз

            // Добавляем точки в обратном порядке
            points.unshift({ x: y, y: x + (canvas.width / 3) });

            if (t === 0) {
                // Если это начальная точка, перемещаемся в эту точку
                ctx.moveTo(y, x + (canvas.width / 3));
            } else {
                // Иначе проводим линию от предыдущей точки к текущей
                ctx.lineTo(y, x + (canvas.width / 3));
            }
        }
    }
    ctx.stroke();
    return points;
}



function drawSummary() {
	let summary_graphs = document.getElementById('summary_graphs');
	let ctxOverlay = summary_graphs.getContext('2d');
	ctxOverlay.clearRect(0, 0, summary_graphs.width, summary_graphs.height);

	if (points1.length !== 0) {
		drawLines(points1);
	}
	if (points2.length !== 0) {
		drawLines(points2);
	}
	if (points3.length !== 0) {
		drawLines(points3);
	}

	// Закрываем путь и рисуем
	ctxOverlay.closePath();
	ctxOverlay.stroke();

	function drawLines(points) {
		console.log(points)
		ctxOverlay.moveTo(points[0].x, points[0].y);

		for (let i = 1; i < points.length; i++) {
			ctxOverlay.lineTo(points[i].x, points[i].y);
		}
	}
}



function handleRememberBtn() {
	particle_m = parseFloat(document.getElementById('particle_m').value);
	particle_u = parseFloat(document.getElementById('particle_u').value);
	particle_q = parseFloat(document.getElementById('partical_q').value);
	magnetic_field = parseFloat(document.getElementById('magnetic_field').value);
}



window.onload = function () {

	document.getElementById('particle_m').value = 0.5;
	document.getElementById('particle_u').value = 12;
	document.getElementById('partical_q').value = 0.08;
	document.getElementById('magnetic_field').value = 0.3;
	document.getElementById('rememberBtn').click;

	points1 = drawGraph(document.getElementById('angle1').value, document.getElementById('canvas1'));
	points2 = drawGraph(document.getElementById('angle2').value, document.getElementById('canvas2'));
	points3 = drawGraph(document.getElementById('angle3').value, document.getElementById('canvas3'));
	drawSummary();

}


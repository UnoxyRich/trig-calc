const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');
const inputC = document.getElementById('inputC');
const output = document.getElementById('output');
const triangle = document.getElementById('triangle');

function updateTriangle() {
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        output.innerHTML = "<p style='color:red;'>Enter all three sides.</p>";
        triangle.setAttribute("points", "");
        hideAngles();
        return;
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
        output.innerHTML = "<p style='color:red;'>Invalid triangle: violates triangle inequality.</p>";
        triangle.setAttribute("points", "");
        return;
    }

    const angleA = Math.acos((b**2 + c**2 - a**2) / (2 * b * c)) * (180 / Math.PI);
    const angleB = Math.acos((a**2 + c**2 - b**2) / (2 * a * c)) * (180 / Math.PI);
    const angleC = 180 - angleA - angleB;

    output.innerHTML = `
        <p><strong>Side a:</strong> ${a.toFixed(2)}</p>
        <p><strong>Side b:</strong> ${b.toFixed(2)}</p>
        <p><strong>Side c:</strong> ${c.toFixed(2)}</p>
        <p><strong>Angle A:</strong> ${angleA.toFixed(2)}°</p>
        <p><strong>Angle B:</strong> ${angleB.toFixed(2)}°</p>
        <p><strong>Angle C:</strong> ${angleC.toFixed(2)}°</p>
    `;

    drawTriangle(a, b, c);
}

function drawTriangle(a, b, c) {
    const scale = 100 / Math.max(a, b, c);
    const Ax = 100, Ay = 200;
    const Bx = Ax + c * scale, By = Ay;

    const angleC_rad = Math.acos((a**2 + b**2 - c**2) / (2 * a * b));
    const Cx = Ax + b * scale * Math.cos(angleC_rad);
    const Cy = Ay - b * scale * Math.sin(angleC_rad);

    triangle.setAttribute("points", `${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`);

    positionAngles(Ax, Ay, Bx, By, Cx, Cy);
}

function positionAngles(Ax, Ay, Bx, By, Cx, Cy) {
    document.getElementById("angleA").setAttribute("x", Ax - 12);
    document.getElementById("angleA").setAttribute("y", Ay + 15);
    document.getElementById("angleA").setAttribute("visibility", "visible");

    document.getElementById("angleB").setAttribute("x", Bx + 5);
    document.getElementById("angleB").setAttribute("y", By + 15);
    document.getElementById("angleB").setAttribute("visibility", "visible");

    document.getElementById("angleC").setAttribute("x", Cx);
    document.getElementById("angleC").setAttribute("y", Cy - 10);
    document.getElementById("angleC").setAttribute("visibility", "visible");
}

function hideAngles() {
    document.getElementById("angleA").setAttribute("visibility", "hidden");
    document.getElementById("angleB").setAttribute("visibility", "hidden");
    document.getElementById("angleC").setAttribute("visibility", "hidden");
}

// Default scalene values
inputA.value = 7;
inputB.value = 8;
inputC.value = 9;

[inputA, inputB, inputC].forEach(input => input.addEventListener('input', updateTriangle));
updateTriangle();
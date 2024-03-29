/**
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */

function roundTo(n, r) {
  n = Math.round(n * Math.pow(10, r));
  return n * Math.pow(10, -r);
}

class DrawingTools {
  constructor(context) {
    if (context) {
      this.context = context;
    } else {
      throw "PLEASE DEFINE A 2D CONTEXT FIRST";
    }
  }

  clear(x, y, c_width, c_height) {
    this.context.clearRect(x, y, c_width, c_height);
  }

  setFill(color) {
    this.context.fillStyle = color;
  }
  setOutline(color) {
    this.context.strokeStyle = color;
  }
  setLineWidth(width) {
    this.context.lineWidth = width;
  }

  line(minX, minY, maxX, maxY, stroke, thickness) {
    let context = this.context;

    // x
    context.beginPath();
    context.lineWidth = thickness;
    context.strokeStyle = stroke || "black";

    context.moveTo(minX, minY);
    context.lineTo(maxX, maxY);

    context.stroke();
    context.closePath();
  }

  text(value, x, y) {
    let context = this.context;
    context.beginPath();
    context.lineWidth = 0.6;
    context.strokeStyle = "black";
    context.strokeText(value, x, y);
    context.closePath();
  }

  axis(minX, maxX, minY, maxY, stroke) {
    // x
    this.line(minX, 0, maxX, 0, stroke);

    // y
    this.line(0, minY, 0, maxY, stroke);
  }

  /**
   * Draw a circle shape
   * @param {number} centerX
   * @param {number} centerY
   * @param {number} radius
   * @param {number} stroke
   * @param {number} fill
   */
  circle(centerX, centerY, radius, stroke, fill) {
    const context = this.context;
    context.beginPath();
    context.strokeStyle = stroke || "black";

    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }
    context.stroke();
    context.closePath();
  }

  /**
   * @param {RectangleShape} rect
   * @param {number[]} rgb
   */
  rectShape(rect, rgb) {
    this.context.beginPath();
    if (rgb) {
      this.context.strokeStyle = `rgb( ${rgb.join(",")} )`;
      this.context.fillStyle = `rgb( ${rgb.join(",")}, 0.4)`;
    }
    this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
    this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    this.context.closePath();
  }

  /**
   * @param {Item[]} items
   * @param {number} max_x
   * @param {number} max_y
   * @param {Item[]} selected
   */
  drawSolution(solution, max_capacity, max_width, max_height) {
    let x = 0;
    solution.forEach((item) => {
      const r = item.size / max_capacity;
      const color = [108, 178, Math.floor(200 + r * 155)];
      const length = r * max_width;
      const rect = new RectangleShape(x, 0, length, max_height);
      this.text(item.size, x, 10);
      x += length;
      this.rectShape(rect, color);
    });
  }
}

/**
 * @author afmika
 * @email afmichael73@gmail.com
 * https://github.com/afmika
 */

class RectangleShape {
  /**
   * @constructor
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 1;
    this.height = height || 1;
  }

  /**
   * @returns {Object} {width : number, height : number}
   */
  getDimension() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  /**
   * @returns {Object} {x : number, y : number}
   */
  getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  /**
   * @returns {Object} {x : number, y : number}
   */
  getCenter() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  /**
   * @returns {number[]}
   */
  getCorners() {
    const arr = [];
    arr.push({ x: this.x, y: this.y });
    arr.push({ x: this.x + this.width, y: this.y });
    arr.push({ x: this.x, y: this.y + this.height });
    arr.push({ x: this.x + this.width, y: this.y + this.height });
    return arr;
  }

  collidesWith(rect) {
    const a = this, b = rect;
    return !(
      a.x + a.width < b.x ||
      a.x > b.x + b.width ||
      a.y + a.height < b.y ||
      a.y > b.y + b.height
    );
  }

  /**
   * @param {RectangleShape} rect
   * @returns {array[]}
   */
  pointsOutside(rect) {
    const outside = [];
    const points = this.getCorners();
    points.forEach((point) => {
      let temp_rect = new RectangleShape(point.x, point.y, 1, 1);
      if (!temp_rect.collidesWith(rect)) {
        outside.push(point);
      }
    });
    return outside;
  }
  /**
   * @param {RectangleShape} rect
   * @returns {array[]}
   */
  pointsInside(rect) {
    const inside = [];
    const points = this.getCorners();
    points.forEach((point) => {
      const temp_rect = new RectangleShape(point.x, point.y, 1, 1);
      if (temp_rect.collidesWith(rect)) {
        inside.push(point);
      }
    });
    return inside;
  }

  /**
   * @param {RectangleShape} rect
   */
  cornerIsOutside(rect) {
    return this.pointsOutside(rect).length > 0;
  }
  /**
   * @param {RectangleShape} rect
   */
  cornerIsInside(rect) {
    return this.pointsInside(rect).length > 0;
  }

  /**
   * @param {RectangleShape} rect
   */
  allCornerOutside(rect) {
    return this.pointsOutside(rect).length == 4;
  }
  /**
   * @param {RectangleShape} rect
   */
  allCornerInside(rect) {
    return this.pointsInside(rect).length == 4;
  }

  /**
   * @param {RectangleShape} rect
   */
  contains(rect) {
    return rect.allCornerInside(this) && rect.collidesWith(this);
  }

  clone() {
    return new RectangleShape(this.x, this.y, this.width, this.height);
  }
}

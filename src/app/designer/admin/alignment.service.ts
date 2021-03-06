import { Injectable } from '@angular/core';

@Injectable()
export class AlignmentService {

  canSnap(target, bound, padding) {
    return target > bound - padding && target < bound + padding;
  }

  alignDragging(target, canvas) {
    canvas.forEachObject(obj => {
      if (obj.isBoundBox || (obj.id !== target.id && !obj.isBackground)) {
        const bound = obj;
        target.right = target.left + target.width;
        target.bottom = target.top + target.height;
        bound.right = bound.left + bound.width;
        bound.bottom = bound.top + bound.height;
        // top/top alignment
        if (this.canSnap(target.top, bound.top, 10))
          target.top = bound.top;
        // top/bottom alignment
        if (this.canSnap(target.top, bound.bottom, 10))
          target.top = bound.bottom;
        // left/left alignment
        if (this.canSnap(target.left, bound.left, 10))
          target.left = bound.left;
        // left/right alignment
        if (this.canSnap(target.left, bound.right, 10))
          target.left = bound.right;
        // right/right alignment
        if (this.canSnap(target.right, bound.right, 10))
          target.left = bound.right - target.width;
        // right/left alignment
        if (target.right > bound.left - 10 && target.right < bound.left + 10)
          target.left = bound.left - target.width;
        // bottom/bottom alignment
        if (target.bottom > bound.bottom - 10 && target.bottom < bound.bottom + 10)
          target.top = bound.bottom - target.height;
        // bottom/top alignment
        if (target.bottom > bound.top - 10 && target.bottom < bound.top + 10)
          target.top = bound.top - target.height;
        // centerX/centerX alignment
        const middleX = target.left + target.width / 2;
        const boundMiddleX = bound.left + bound.width / 2;
        if (middleX > boundMiddleX - 10 && middleX < boundMiddleX + 10) {
          target.left = boundMiddleX - target.width / 2;
        }
        // centerY/centerY alignment
        const middleY = target.top + target.height / 2;
        const boundMiddleY = bound.top + bound.height / 2;
        if (middleY > boundMiddleY - 10 && middleY < boundMiddleY + 10) {
          target.top = boundMiddleY - target.height / 2;
        }
      }
    });
    target.setCoords();
  }

  alignScaling(target, canvas) {
    const targetBound = target.getBoundingRect();

    canvas.forEachObject(obj => {
      if (obj.id !== target.id) {
        const bound = obj.getBoundingRect();

        switch (target.__corner) {
          case 'mt':
            // top/top
            if (this.canSnap(target.top, bound.top, 10)) {
              const h = target.height * target.scaleY;
              target.scaleY = (h - (bound.top - target.top)) / target.height;
              target.top = bound.top;
            }
            break;
          case 'ml':
            // left/left
            if (target.left > bound.left - 10 && target.left < bound.left + 10) {
              const w = target.width * target.scaleX;
              target.scaleX = (w - (bound.left - target.left)) / target.width;
              target.left = bound.left;
            }
            break;
          case 'mr':
            // right/right
            const right = target.left + target.width;
            const boundRight = bound.left + bound.width;
            if (right > boundRight - 10 && right < boundRight + 10) {
              target.scaleX = (boundRight - target.left) / target.width;
            }
            break;
          case 'mb':
            // bottom/bottom
            const bottom = target.top + target.height;
            const boundBottom = bound.top + bound.width;
            if (bottom > boundBottom - 10 && bottom < boundBottom + 10) {
              target.scaleY = (boundBottom - target.top) / target.height;
            }
            break;
        }
      }
    });
  }

}
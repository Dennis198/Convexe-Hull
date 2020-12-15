/**
 * This File contains different vector based operations, CrossProduct, determinante, ...
 */
const TOLERANCE=0.00;

 //Computes the Z Komponent of the Crossproduct of to vectors
export function crossProductZ(vectorOne,vectorTwo){
    return vectorOne.x*vectorTwo.y - vectorOne.y*vectorTwo.x;
}

//Subtracts two Points
export function subtract(pointA,pointB){
    return {x:pointA.x-pointB.x,y:pointA.y-pointB.y}
}

 // Check if the third Point is on the right of the line between
//  firstpoint to secondpoint.( det = determinant)
export function orientationTest(firstPoint, secondPoint, thirdPoint){
    let det = firstPoint.x*secondPoint.y*1+
                firstPoint.y*1*thirdPoint.x+
                1*secondPoint.x*thirdPoint.y-
                thirdPoint.x*secondPoint.y*1-
                thirdPoint.y*1*firstPoint.x-
                1*secondPoint.x*firstPoint.y;
    return det<0;
}

// Sort the Array in increasing Order of the Angel they and the point startPoint make with the x-axis
export function initAngleArray(startPoint, points){
    return points.sort((a,b) => compareator(startPoint, a, b));
}

//Help Function to Sort the Array depend on the Angle
function compareator(startPoint, firstPoint, secondPoint){
    const supportPoint = {
        x: startPoint.x - 1,
        y: startPoint.y,
      };
      const firstAngle = getAngle(startPoint, supportPoint, firstPoint);
      const secondAngle = getAngle(startPoint, supportPoint, secondPoint);
      if(firstAngle===0)console.log("Hier");
      if (firstAngle < secondAngle) {
        return -1;
      }
      if (firstAngle > secondAngle) {
        return 1;
      }
      const firstDistance = getDistance(startPoint, firstPoint);
      const secondDistance = getDistance(startPoint, secondPoint);
      if (firstDistance < secondDistance) {
        return 1;
      } 
      if (firstDistance > secondDistance) {
        return -1;
      }
      return 0;
}

//Calculates the angle
function getAngle(vertex, firstPoint, secondPoint){
    const firstVector = {
        x: firstPoint.x - vertex.x,
        // Note that we negate y-coordinate since
        // canvas flips axis
        y: firstPoint.y - vertex.y,
      };
      const secondVector = {
        x: secondPoint.x - vertex.x,
        // Note that we negate y-coordinate since
        // canvas flips axis
        y: secondPoint.y - vertex.y,
      };
      // Check if the firstPoint or secondPoint is equal to the vertex
      if (firstVector.x === 0 && firstVector.y === 0) return 0;
      if (secondVector.x === 0 && secondVector.y === 0) return 0;
      // Dot product is 0 precisely when vectors are perpendicular
      if (getDotProduct(firstVector, secondVector) === 0) return 90;
      const angle = Math.acos(
        getDotProduct(firstVector, secondVector) / (getLength(firstVector) * getLength(secondVector)),
      ) * 180 / Math.PI;
      // Return 180 if almost collinear
      if (180 - TOLERANCE <= angle && angle <= 180 + TOLERANCE) return 180;
    
      return angle;
}

//Calculates the Dot Product of two vectors
function getDotProduct(firstVector,secondVector){
    return firstVector.x * secondVector.x + firstVector.y * secondVector.y;
   }

//Calculates the length of a vector
function getLength(vector){
    return getDistance({x: 0, y:0}, vector);
}

//Calculates the Distance bwteen two points
function getDistance(firstPoint, secondPoint){
    return Math.sqrt((((firstPoint.x - secondPoint.x) ** 2) + ((firstPoint.y - secondPoint.y) ** 2)),);
}


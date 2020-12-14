/**
 * This File contains different vector based operations, CrossProduct, determinante, ...
 */

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
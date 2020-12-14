/**
 * This File Contains the Information about a Point
 */
import {drawPoint} from "../../Help/drawMethods";
export default class Point{

    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    //Draws it self
    draw(size=4,color="black"){
        drawPoint(this.x,this.y,size,color);
    }
}
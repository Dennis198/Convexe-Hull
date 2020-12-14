/**
 * This file computes the Gift Wrapping Algorithm to Compute the Convexe Hull
 */
import {drawPolygonLines, reset, drawLine} from "../Help/drawMethods";
import {subtract, crossProductZ} from "../Help/calculations";

export default class GiftWrappingAlgorithm{
    constructor(points){
        this.points=points.sort((a,b) => a.x-b.x);
        this.sucess=false;
        this.hull=[];
        this.leftMost=this.points[0];
        this.index=2;
        this.nextIndex=-1;
        this.nextVertex=this.points[1];
        this.currentVertex=this.leftMost;
        this.hull.push(this.leftMost);
    }

    //Computes the Algorithm "fast" (Only the finished Hull is displayed)
    instantCompute(){
        this.sucess=false
        while(!this.sucess){
            this.calculateNextStep();
        }
        this.drawFinish();
    }

    //Computes the Algorithm "slow" (Every Step is displayed)
    start(){
        let intervallID = setInterval(() => {
            this.drawCurrentState();
            this.calculateNextStep(intervallID);           
        }, 100); 
    }

    //Calculates the Nect Step of the Algorithm
    calculateNextStep(intervallID=null){
        let checking = this.points[this.index];
        let a = subtract(this.nextVertex, this.currentVertex)
        let b = subtract(checking, this.currentVertex);
        if(crossProductZ(a,b)<0){
            this.nextVertex=checking;
            this.nextIndex=this.index;
        }
        this.index++;
        if(this.index === this.points.length){
            if(this.nextVertex === this.leftMost){
                this.drawFinish();
                this.stop(intervallID);

            } else {
                this.hull.push(this.nextVertex)
                this.currentVertex=this.nextVertex;
                this.index = 0;
                this.nextVertex = this.leftMost;
            }
        } 
    }

    //Draws the Current State (all Points, current points of the hull, and lines)
    drawCurrentState(){
        reset();
        drawPolygonLines(this.hull, "red");       
        drawLine(this.currentVertex, this.nextVertex, "green");
        drawLine(this.currentVertex,this.points[this.index]);
        for(let i=0;i<this.points.length;i++){
            this.points[i].draw();
        }

        for(let i=0;i<this.hull.length;i++){
            this.hull[i].draw(5,"red");
        }
    }

    //Draws the Finished Convexe Hull
    drawFinish(){
        reset();
        drawPolygonLines(this.hull, "red");
        for(let i=0;i<this.points.length;i++){
            this.points[i].draw();
        }

        for(let i=0;i<this.hull.length;i++){
            this.hull[i].draw(5,"red");
        }
    }

    //Stops the Interval and sets success to true (Convexe Hull is Found)
    stop(id){
        clearInterval(id);
        this.sucess=true;
    }
}

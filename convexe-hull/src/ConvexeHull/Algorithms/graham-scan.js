/**
 * This file computes the Graham Scan Algorithm to Compute the Convexe Hull
 */
import {drawPolygonLines, reset} from "../Help/drawMethods";
import {orientationTest, initAngleArray} from "../Help/calculations";

export default class GrahamScan{
    constructor(points){
        this.points=points.sort((a,b) => a.y-b.y);;
        this.success=false;
        this.hull=[];
        this.hull.push(this.points[0]);
    }

    instantCompute(){  
        // Sort the Array in increasing Order of the Angel they and the point this.points[0] make with the x-axis
        this.points = initAngleArray(this.points[0], this.points);
        this.hull.push(this.points[1]);
        let i=2;
        let n=this.points.length;
        while(i<n){
            let pt_1= this.hull[this.hull.length-1];
            let pt_2= this.hull[this.hull.length-2];
            if(!orientationTest(pt_1,pt_2,this.points[i]) || this.hull.length==2){
                this.hull.push(this.points[i]);
                i++;
            } else {
                this.hull.pop();
            }
        }
        this.drawCurrentState(true);
    }

    start(){
        // Sort the Array in increasing Order of the Angel they and the point this.points[0] make with the x-axis
        this.points = initAngleArray(this.points[0], this.points);
        this.hull.push(this.points[1]);
        let i=2;
        let n=this.points.length;
        let intervallID = setInterval(() => {
            let pt_1= this.hull[this.hull.length-1];
            let pt_2= this.hull[this.hull.length-2];
            this.drawCurrentState();
            if(!orientationTest(pt_1,pt_2,this.points[i]) || this.hull.length==2){
                this.hull.push(this.points[i]);
                i++;
            } else {
                this.hull.pop();
            }   
            if(i>=n){
                this.stop(intervallID); 
                this.drawCurrentState(true);
            } 
        }, 300);
    }

    //Draws the Current State (all Points, current points of the hull, and lines)
    drawCurrentState(finished=false){
        reset();
        if(finished){
            drawPolygonLines(this.hull, "red", true);
        } else {
            drawPolygonLines(this.hull, "red", false);
        }

        for(let p=0;p<this.points.length;p++){
            this.points[p].draw();
        }

        for(let p=0;p<this.hull.length;p++){
            this.hull[p].draw(5,"red");
        } 
    }

    //Stops the Interval and sets success to true (Convexe Hull is Found)
    stop(id){
        clearInterval(id);
        this.sucess=true;
    }
}
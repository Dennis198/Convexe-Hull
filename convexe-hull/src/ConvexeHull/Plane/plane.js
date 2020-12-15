/**
 * This File Handles the Start of the different Algoritms
 */

import Point from "./Point/point";
import GiftWrappingAlgorithm from "../Algorithms/gift-wrapping-algorithm";
import NaiveAlgorithm from "../Algorithms/naive";
import GrahamScan from "../Algorithms//graham-scan";
import {reset} from "../Help/drawMethods";

export default class Plane{
    constructor(){
        this.points=[];
        this.algorithm=null;
        this.success=false;
    }

    //Adds a Point to the variable this.points
    addPoint(x,y){
        this.points.push(new Point(x,y));
        this.draw();
    }

    //Computes the Naive Algorithm to find the Convexe Hull
    naive(isFinished){
        if(this.points.length==0){
            return
        }
        this.algorithm = new NaiveAlgorithm(this.points);
        if(isFinished){
            this.algorithm.instantCompute();    
        } else {
            this.algorithm.start();
        }
    }

    //Computes the Gift Wrapping Algorithm to find the Convexe Hull
    giftWrapping(isFinished){
        if(this.points.length===0){
            return
        }
        this.algorithm = new GiftWrappingAlgorithm(this.points);
        if(isFinished){
            this.algorithm.instantCompute();    
        } else {
            this.algorithm.start();
        }
    }

    //Computes the Graham Scan Algorithm to find the Convexe Hull
    grahamScan(isFinished){
        if(this.points.length===0){
            return
        }
        this.algorithm = new GrahamScan(this.points);
        if(isFinished){
            this.algorithm.instantCompute();    
        } else {
            this.algorithm.start();
        }
    }

    //Return True if the Convexe hull is found
    isAlgorithmFinished(){
        if(this.algorithm==null) return null;
        return this.algorithm.sucess;
    }

    //Resets the Canvas
    reset(){
       reset();
    }

    //Draw all Points
    draw(){
        this.reset();
        for(let i=0;i<this.points.length;i++){
            this.points[i].draw();
        }
    }
}
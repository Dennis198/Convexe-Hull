import "./conexehull.css";
import React from 'react';
import Plane from "./Plane/plane";
import {Button} from '@material-ui/core';

const CANVAS_WIDTH=800;
const CANVAS_HEIGHT=400;

const NONE_ALGO=-1;
const NAIVE=0;
const GIFT_WRAPPING=1;
const GRAHAM_SCAN=2;

export default class ConvexeHull extends React.Component{
    intervallID=0
    constructor(props){
        super(props);
        this.state = {
            plane: new Plane(),
            isRunning:false,
            isFinished:false,
            algoMode: NONE_ALGO,
        }
    }

    componentDidMount(){
        this.state.plane.reset();
    }

    // Computes the Algorithm "fast" (Only the finised State will be displayed)
    fastCompute(){
        this.setState({isFinished:true});
        switch(this.state.algoMode){
            case NAIVE:
                this.state.plane.naive(true);
                break;
            case GIFT_WRAPPING:
                this.state.plane.giftWrapping(true);
                break;
            case GRAHAM_SCAN:
                this.state.plane.grahamScan(true);
                break;
            default:
                this.setState({isRunning:false})
                return;
        }
        
    }

    //Computes the Algorithms "slowly" (every stape will be displayed)
    animation(){
        this.setState({isRunning:true})
        switch(this.state.algoMode){
            case NAIVE:
                this.state.plane.naive(false);
                this.intervallID = setInterval(() => {
                    if(this.state.plane.isAlgorithmFinished()){
                        this.stop(this.intervallID);
                    } 
                },50);
                break;
            case GIFT_WRAPPING:
                this.state.plane.giftWrapping(false);
                this.intervallID = setInterval(() => {
                    if(this.state.plane.isAlgorithmFinished()){
                        this.stop(this.intervallID);
                    } 
                },50);
                break;
            case GRAHAM_SCAN:
                this.state.plane.grahamScan(false);
                this.intervallID = setInterval(() => {
                    if(this.state.plane.isAlgorithmFinished()){
                        this.stop(this.intervallID);
                    } 
                },50);
                break;
            default:
                this.setState({isRunning:false})
                return;
        }

    }

    //Resets only the ConvexeHull from the Canvas (Not the points)
    resetHull(){
        this.state.plane.draw();
        this.setState({isFinished:false});
    }

    //Resets the every thing on the Canvas (Points, lines,...)
    reset(){
        this.setState({isRunning:false, isFinished:false, plane:new Plane()});
        setTimeout(() => {
            this.state.plane.draw();
        },10);      
    }

    //Stops the Animation of the  Algorithm
    stop(id){
        clearInterval(id);
        this.setState({isRunning:false, isFinished:true});
    }

    //Stops all Running Intervals
    stopAll(){
        var interval_id = window.setInterval("", 9999); // Get a reference to the last
                                                // interval +1
        for (var i = 1; i < interval_id; i++)
            window.clearInterval(i);
        this.setState({isRunning:false});
        if(!this.state.isFinished) this.state.plane.draw();
    }

    //Add Random Points in the Canvas
    addRandomPoints(){
        for(let i=0;i< 5;i++){
            let x = Math.random()*CANVAS_WIDTH;
            let y = Math.random()*CANVAS_HEIGHT;
            this.state.plane.addPoint(x,y);
        }
    }

    //Add on Click Points in the Canvas. And if this.state.isFinished===true then the new ConvexeHUll
    //will be compute immediatly
    addPoint(e){
        var canvas = document.getElementById("2d-plane");
        var pos = this.getMousePos(canvas, e);
        this.state.plane.addPoint(pos.x,pos.y);
        if(this.state.isFinished){
            switch (this.state.algoMode){
                case NAIVE:
                    this.state.plane.naive(true);
                    break;
                case GIFT_WRAPPING:
                    this.state.plane.giftWrapping(true);
                    break;
                case GRAHAM_SCAN:
                    this.state.plane.grahamScan(true);
                    break;
                default:
                    break;
            }
        }
    }

    //Gets the Mouse position on the Canvas
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
        };
    }

    //Handler for Switching the Algorithm
    switchAlgoMode(e){
        this.setState({algoMode: parseInt(e.target.value)});
        this.resetHull();
    }

    render(){
        return(
            <div className="convexehull">
                <h1>Convexe Hull</h1>
                <select className="select-css" onChange={(e,val) => this.switchAlgoMode(e,val)}>
                    <option value="-1">Select Algorithm</option>
                    <option value={NAIVE}>Naive</option>
                    <option value={GIFT_WRAPPING}>Gift Wrapping</option>
                    <option value={GRAHAM_SCAN}>Graham Scan</option>
                </select>
                <Button disabled={this.state.isRunning} variant="outlined" color="primary" onClick={() => this.fastCompute()}>Fast Compute</Button>
                <Button disabled={this.state.isRunning} variant="outlined" color="primary" onClick={() => this.animation()}>Animation</Button>
                <Button disabled={!this.state.isRunning} variant="outlined" color="secondary" onClick={() => this.stopAll()}>Stop</Button>
                <Button disabled={this.state.isRunning} variant="outlined" onClick={() => this.addRandomPoints()}>Random Points</Button>
                <Button disabled={this.state.isRunning} variant="outlined" onClick={()=> this.resetHull()}>Reset Hull</Button>
                <Button disabled={this.state.isRunning} variant="outlined" onClick={()=> this.reset()}>Reset</Button>
        <       h4>{this.state.isRunning? "Compute...": "Ready"}</h4>
                <div className="convexehull__canvas">
                    <canvas className="convexehull_canvas__2dplane" id="2d-plane" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                    onClick={this.state.isRunning ?() => null :(e) => this.addPoint(e)}
                    ></canvas>
                </div>
            </div>
        );
    }
}
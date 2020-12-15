/**
 * This File Computes a Naive Algorithm to find the Convexe Hull (O(n^3))
 */
import {reset, drawLine} from "../Help/drawMethods";
import {orientationTest} from "../Help/calculations";

export default class NaiveAlgorithm{
    constructor(points){
        this.points=points;
        this.success=false;
        this.hull=[];
        this.hullLines=[];
        this.checked = [{startIdx:-1, endIdx:-1}];//To Prevent check Point j->i if i->j is already on the convexe hull
    }

    //Computes the Algorithm "fast" (Only the finished Hull is displayed)
    instantCompute(){
        if(this.points.length<3){
            this.drawFinishIfLessThan3Points();
            return;
        }
        for(let i=0;i<this.points.length;i++){
            for(let j=0;j<this.points.length;j++){
                if(i===j) continue;
                //To Prevent check Point j->i if i->j is already on the convexe hull
                var result = this.checked.find(obj => {
                    return obj.startIdx === j && obj.endIdx ===i;
                })
                if(result) continue;
                let isLineOnHull=true;
                for(let k=0;k<this.points.length;k++){
                    if(i===k || j===k) continue;
                    if(orientationTest(this.points[i], this.points[j], this.points[k])){
                        isLineOnHull=false;
                        break;
                    }
                }
                if(isLineOnHull===true){
                    this.checked.push({startIdx:i, endIdx:j});
                    this.hull.push(this.points[i]);
                    this.hullLines.push({start:this.points[i], end: this.points[j]});
                } else {

                }
            }
        }
        this.drawFinish();
        this.stop(); 
    }

    //Computes the Algorithm "slow" (Every Step is displayed)
    start(){
        if(this.points.length<3){
            this.drawFinishIfLessThan3Points();
            return;
        }
        let i=0;
        let j=0;
        let k=0;
        let i_ONHOLD=false;
        let j_ONHOLD=false;
        let length=this.points.length;
        let isLineOnHull;

        let intervallID = setInterval(() => {
            reset();
            if(i===j){
                j++;
            }else{
                var result = this.checked.find(obj => {
                    return obj.startIdx === j && obj.endIdx ===i;
                })
                if(!result){
                    if(!j_ONHOLD) isLineOnHull=true;
                        i_ONHOLD=true;
                        j_ONHOLD=true;
                        drawLine(this.points[i],this.points[j]);
                        if(i!==k && j!==k){
                            drawLine(this.points[i],this.points[k],"green");
                            if(orientationTest(this.points[i], this.points[j], this.points[k])){
                                isLineOnHull=false;
                            }
                            k++;
                        } else {
                            k++;
                        }
                        if(k===length){
                            j_ONHOLD=false;
                            k=0;
                        }
                    if(isLineOnHull===true && k===0){
                        this.checked.push({startIdx:i, endIdx:j});
                        this.hull.push(this.points[i]);
                        this.hullLines.push({start:this.points[i], end: this.points[j]});
                        if(!j_ONHOLD)j++;
                    } else {
                        if(!j_ONHOLD)j++;
                    }
                } else {
                    if(!j_ONHOLD)j++;
                }
            }
            if(j===length){
                i_ONHOLD=false;
                j=0;
            }
            if(!i_ONHOLD&&j===0){
                i++;
                j=0;
            }

            if(i===length)this.stop(intervallID);
            for(let p=0;p<this.hullLines.length;p++){
                drawLine(this.hullLines[p].start,this.hullLines[p].end, "red");
            }
            for(let p=0;p<this.points.length;p++){
                this.points[p].draw();
            }
    
            for(let p=0;p<this.hull.length;p++){
                this.hull[p].draw(5,"red");
            }
        }, 100);
        this.drawFinish();
    }

   //Draws the Finished Convexe Hull
    drawFinish(){
        for(let i=0;i<this.hullLines.length;i++){
            drawLine(this.hullLines[i].start,this.hullLines[i].end,"red");
        }
        for(let i=0;i<this.points.length;i++){
            this.points[i].draw();
        }

        for(let i=0;i<this.hull.length;i++){
            this.hull[i].draw(5,"red");
        }
    }

     //Draws the hull if there are less than 3 points
    drawFinishIfLessThan3Points(){
        this.hull=this.points;
        if(this.points.length===2)this.hullLines.push({start:this.points[0], end: this.points[1]});
        this.drawFinish();
        this.stop(); 
    }

    //Stops the Interval and sets success to true (Convexe Hull is Found)
    stop(id){
        clearInterval(id);
        this.sucess=true;
    }
}

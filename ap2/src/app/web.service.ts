import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class WebService {
    constructor(private http: HttpClient) {}


    // gets all posts
    getPosts() {
        // http get call made
        return this.http.get("http://localhost:5000/api/v1.0/posts");
    }

    // add an exercise posts to db
    postExercise(post : any){

        let postData = new FormData();
        postData.append("text", post.text);
        postData.append("type", post.type);
        postData.append("dist", post.dist);
        postData.append("dType", post.dType);
        postData.append("time", post.time);
        postData.append("userName", post.userName);
        postData.append("date", post.date);
        postData.append("userID", post.userID);

        // http post call made, with form data
        return this.http.post("http://localhost:5000/api/v1.0/posts",postData);
    }

    // deletes an exercise post
    deletePost(id:any){
        // http delete call made
        return this.http.delete("http://localhost:5000/api/v1.0/posts/"+id);
    }

    // edits an exercise post
    putPost(id:any,post:any){

        let postData = new FormData();
        postData.append("text", post.text);
        postData.append("type", post.type);
        postData.append("dist", post.dist);
        postData.append("dType", post.dType);
        postData.append("time", post.time);
        postData.append("userName", post.userName);
        postData.append("date", post.date);
        postData.append("userID", post.userID);

        // http get call made and returned, with form
        return this.http.put("http://localhost:5000/api/v1.0/posts/"+id,postData);
    }

    // gets individual stats for a logged in user
    getUserStats(user_id:any, period:any){

        // time period is passed as a parameter
        const httpParams = new HttpParams({
            fromObject:{
                param : period
            }
        });

        // http get call made and returned, with parameters
        return this.http.get("http://localhost:5000/api/v1.0/stats/"+user_id, {params:httpParams});
    }


    // gets an activity graph for a logged in user
    getActivityGraph(user_id:any, period:any){

        // time period is passed as a parameter
        const httpParams = new HttpParams({
            fromObject:{
                param : period
            }
        });

        // http get call made and returned, with parameters
        return this.http.get("http://localhost:5000/api/v1.0/graphs/"+user_id, {params:httpParams});
    }


    // gets a leaderboard, using 3 vars given
    getLeaderboard(board:any, exType:any, period:any){

        // params set to http parameters object
        const leaderboardParams = new HttpParams({
            fromObject : {
                board : board,
                exType : exType,
                period : period
            }
        });

        // http get call made and returned, with parameters
        return this.http.get("http://localhost:5000/api/v1.0/leaderboards", {params : leaderboardParams});
    }
  

} // webService class closed
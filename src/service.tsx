import axios from "axios";
import { PostUserRespone } from "./model/postUserRespone";
import { GetImageRespone } from "./model/getImageRespone";

const HOST: string = "http://localhost:3000";
export class memeMashService {
  async getLogin(email: string, password: string) {
    const url = HOST + "/login";
    const body = {
        email:email,
        password:password
    }
    const response = await axios.post(url,body);
    if(response.status==200){
        const user: PostUserRespone = response.data;
        return user
    }else{
        return null;
    }
  }
  async getReqImage (){
    const url = HOST + "/image";
    const response = await axios.get(url);
    if(response.status==200){
        const image: GetImageRespone[] = response.data;
        return image
    }else{
        return [];
    }
  }
  async putReqImageID (id:number,img:string,id_user:number,name:string,score:number){
    const url = HOST + "/image/"+id;
    const body = {
      img:img,
      id_user:id_user,
      name:name,
      score:score
  }
    const response = await axios.put(url,body);
    if(response.status==200){
      return response.status
  }else{
      return null;
  }
    
  }
  async postReqVote (id_img:number,username:string,score:number){
    const url = HOST + "/vote";
    const body = {
      id_img:id_img,
      username:username,
      score:score
  }
    const response = await axios.post(url,body);
    if(response.status==200){
      return response.status
  }else{
      return null;
  }
    
  }
}
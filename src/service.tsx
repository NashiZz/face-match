import axios from "axios";
import { PostUserRespone } from "./model/postUserRespone";
import { GetImageRespone } from "./model/getImageRespone";
import { ImgeVoteGetRes } from "./model/ImgeVoteGetRes";
import { ImgeVoteGetYlabelRes } from "./model/ImgeVoteGetYlabelRes";
import { UploadPostRespone } from "./model/uploadPostRespone";
import { VotePostDateRes } from "./model/votePostDateRes";
import { UserGetRes } from "./model/userGetRes";

const HOST: string = "https://backend-mememash.onrender.com";
export class memeMashService {
  async getLogin(email: string, password: string) {
    const url = HOST + "/login";
    const body = {
      email: email,
      password: password
    }
    const response = await axios.post(url, body);
    if (response.status == 200) {
      const user: PostUserRespone = response.data;
      return user
    } else {
      return null;
    }
  }
  async registerUser(username: string, email: string, password: string, img_avatar: string) {
    const url = HOST + "/login/singin";
    const body = {
      username: username,
      email: email,
      password: password,
      img_avatar: img_avatar

    };
    const response = await axios.post(url, body);
    if (response.status === 201) {
      return response.status;
    } else {
      return response.status;
    }
  }
  async getUsersByType(userType: string) {
    try {
      const url = `${HOST}/usersByType/${userType}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to get users by type");
      }
    } catch (error) {
      console.error("Error getting users by type:", error);
      throw error;
    }
  }
  async getReqImage() {
    const url = HOST + "/image";
    const response = await axios.get(url);
    if (response.status == 200) {
      const image: GetImageRespone[] = response.data;
      return image
    } else {
      return [];
    }
  }
  async deleteImage(id: number) {
    try {
      const url = `${HOST}/image/${id}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }
  async getReqImageTop10() {
    const url = HOST + "/image/top";
    const response = await axios.get(url);
    if (response.status == 200) {
      const image: GetImageRespone[] = response.data;
      return image
    } else {
      return [];
    }
  }
  async putReqImageID(id: number, img: string, id_user: number, name: string, score: number) {
    const url = HOST + "/image/" + id;
    const body = {
      img: img,
      id_user: id_user,
      name: name,
      score: score
    }
    const response = await axios.put(url, body);
    if (response.status == 200) {
      return response.status
    } else {
      return null;
    }

  }
  async postReqVote(id_img: number, username: string, score: number) {
    const url = HOST + "/vote";
    const body = {
      id_img: id_img,
      username: username,
      score: score
    }
    const response = await axios.post(url, body);
    if (response.status == 200) {
      return response.status
    } else {
      return null;
    }

  }
  async getImageVote() {
    const url = HOST + "/vote";
    const response = await axios.get(url);
    if (response.status == 200) {
      const imageID: ImgeVoteGetRes[] = response.data;
      return imageID
    } else {
      return [];
    }
  }
  async getYlabel(id_img: number) {
    const url = HOST + "/vote/ylabel";
    const body = {
      id_img: id_img
    }
    const response = await axios.post(url, body);
    if (response.status == 200) {
      const Ylabel: ImgeVoteGetYlabelRes[] = response.data;
      return Ylabel
    } else {
      return [];
    }
  }
  async postUpload(img: File): Promise<UploadPostRespone | null> {
    const url = `${HOST}/upload`;
    try {
      const formData = new FormData();
      formData.append('filename', img);

      const response = await axios.post<UploadPostRespone>(url, formData);

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
  async getBeforeRank(date: string) {
    const url = HOST + "/vote/ranking";
    const body = {
      date: date,
    }
    const response = await axios.post(url, body);
    if (response.status == 200) {
      const data: VotePostDateRes[] = response.data;
      return data
    } else {
      return [];
    }
  }
  async putEditProfile(username: string, password: string, passwordNew: string, id: number, img: string) {
    const url = HOST + "/user/editProfile";
    let newImage: string;
    if (img !== undefined) {
      newImage = img;
    } else {

      newImage = ""; 
    }

    const body = {
      id_user: id,
      username: username,
      email: "",
      password: password,
      passwordNew: passwordNew,
      img_avatar: newImage,
      status: ""
    }
    console.log(body);

    const response = await axios.put(url, body);
    if (response.status == 200) {
      console.log(response.status);
      return response.status
    } else {
      return response.status;
    }
  }

  async postImage(img: string, id_user: number, name: string) {
    const url = HOST + "/image";
    const body = {
      img: img,
      id_user: id_user,
      name: name,
      score: 1000
    }
    const response = await axios.post(url, body);
    if (response.status == 200) {
      return response.status
    } else {
      return response.status;
    }
  }
  async getUserRes() {
    const url = HOST + "/user";
    const response = await axios.get(url);
    if (response.status == 200) {
      const image: UserGetRes[] = response.data;
      return image
    } else {
      return [];
    }
  }
}

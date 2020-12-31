import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Plugins } from "@capacitor/core";
const { Network } = Plugins;
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  users = [];
  joke = null;
  appIsOnline = true;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const status = await Network.getStatus();
    this.appIsOnline = status.connected;

    Network.addListener("networkStatusChange", (status) => {
      this.appIsOnline = status.connected;
      console.log("status: ", status);
    });
  }

  getData() {
    this.http
      .get("https://randomuser.me/api/?results=5")
      .subscribe((result) => {
        this.users = result["results"];
      });
  }

  getOnlineData() {
    this.http
      .get("https://api.chucknorris.io/jokes/random")
      .subscribe((result) => {
        this.joke = result;
      });
  }
}

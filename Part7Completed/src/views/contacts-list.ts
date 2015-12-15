import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class ContactsList {
  searchEntry = "";
  contacts = [];
  contactId = "";
  contact = "";
  currentPage = 1;
  textShowAll = "Show All";

  constructor(private http : HttpClient) {
    this.http = http;
  }

  updateContacts() {
      return this.http.fetch("contacts?query=" + this.searchEntry).then(response => response.json()).then(data => {
        this.contacts = (<any> data).contacts;
      });
  }

  get canSearch() {
    return (this.searchEntry !== "");
  }

  activate() {
    return this.updateContacts();
  }

  displayAllContacts() {
    this.searchEntry = "";
    this.activate();
  }
}
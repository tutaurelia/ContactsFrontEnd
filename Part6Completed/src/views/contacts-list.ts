import {DeleteDialog} from "./delete-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {DialogService} from "aurelia-dialog";


@inject(HttpClient, DialogService)
export class ContactsList {
    searchEntry = "";
    contacts = [];
    contactId = "";
    contact = "";
    currentPage = 1;
    textShowAll = "Show All";

    constructor(private http: HttpClient, private dialogService : DialogService) {
        this.http = http;
        this.dialogService = dialogService;
    }


    deleteDialog(contact) {
        (<any>this.dialogService).open({ viewModel: DeleteDialog, model: contact }).then(response => {
            if (!response.wasCancelled) {
                this.http.fetch(`contacts/${contact.id}`, {
                    method: "delete"
                }).then(response => {
                    this.updateContacts();
                });
            }
        });
    }



    updateContacts() {
        return this.http.fetch(`contacts?query=${this.searchEntry}`).then(response => response.json()).then(data => {
            this.contacts = (<any>data).contacts;
        });
    }


    
    reset() {
        this.http.fetch("contacts/reset", {
            method: "post"
        }).then(response => {
            this.searchEntry = "";
            this.updateContacts();    
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

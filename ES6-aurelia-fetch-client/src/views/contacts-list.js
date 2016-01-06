import {DeleteDialog} from "./delete-dialog";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {DialogService} from "aurelia-dialog";
import "fetch";

@inject(HttpClient, DialogService)
export class ContactsList {
    searchEntry = "";
    contacts = [];
    contactId = "";
    contact = "";
    currentPage = 1;
    textShowAll = "Show All";

    constructor(http, dialogService) {
        this.http = http;
		this.dialogService = dialogService;
    }
	
	activate() {
		return this.updateContacts();
    }
	
    updateContacts() {
        return this.http.fetch("contacts?query=" + this.searchEntry).then(response => response.json()).then(data => { this.contacts = data.contacts; });
    }

	deleteDialog(contact) {
         this.dialogService.open({ viewModel: DeleteDialog, model: contact }).then(response => {
            if (!response.wasCancelled) {
                this.http.fetch(`contacts/${contact.id}`, {
                    method: "delete"
                }).then(response => {
                    this.updateContacts();
                });
            }
        });
    }
	
	displayAllContacts() {
        this.searchEntry = "";
        this.activate();
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
	
	
}

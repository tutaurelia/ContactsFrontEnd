import {inject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";

@inject(DialogController)
export class DeleteDialog {
    contact : object;

    constructor(controller: DialogController) {
        this.controller = controller;
    }

    activate(contact) {
        this.contact = contact;
    }

}

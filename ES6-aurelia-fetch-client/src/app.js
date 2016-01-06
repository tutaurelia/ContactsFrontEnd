import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class App {
  constructor(http) {
        http.configure(config => {
            config
                .withBaseUrl("http://tutaurelia.azurewebsites.net/api/");
        });
        this.http = http;
    }
  
  configureRouter(config, router) {
    config.title = "Contacts App";
	config.map([
		{ route: ["", "contactslist"], moduleId: "./views/contacts-list", nav: true, title: "List" },
        { route: "tutaurelia", moduleId: "./views/tutaurelia", nav: true, title: "tutaurelia.net" },
        { route: "contacts/*id", moduleId: "./views/edit", title: "Edit Contact" },
        { route: "insert", moduleId: "./views/insert", title: "Insert Contact" }
        ]);
	this.router = router;
  }
}


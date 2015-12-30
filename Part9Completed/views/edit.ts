import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";

@inject(HttpClient, json)
export class Insert {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    telephone: string;
    email: string;
    birthDate: string;
    statusCode: any;
    textShowAll = "Cancel";
    http: HttpClient;
    isUpdated: boolean;

    constructor(http: HttpClient) {
        this.http = http;
    }

    activate(params) {
        return this.http.fetch("contacts/" + params.id).then(response => response.json()).then(data => {
            this.id = data.id;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.address = data.address;
            this.zipCode = data.zipCode;
            this.city = data.city;
            this.telephone = data.telephone;
            this.email = data.email;
            this.birthDate = data.birthDate;
        });
    }
    
    editContact() {
        const contact = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Address: this.address,
            Zipcode: this.zipCode,
            City: this.city,
            Telephone: this.telephone,
            Email: this.email,
            BirthDate: this.birthDate
        };

        this.http.fetch("contacts/" + this.id, {
            method: "put",
            body: json(contact)
        }).then(response => {
            this.isUpdated = true;
            this.statusCode = response.status;
            this.textShowAll = "Show All";
        });

    }
}

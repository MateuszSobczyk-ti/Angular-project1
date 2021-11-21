export class Event {
    id?: any;
    name?: string;
    description?: string;
    max_number_of_contestant?: number;
	data_start?: String;
    data_end?: String;
	department?: string;
	eventType?: string;
	statusEvent?: string;
    imageData?: string;
    czyZapisano?: boolean;
    czyMoznaZapisac?: boolean;
    czyMoznaOceniac?: boolean;
    rate?: any;
    comments?: string;
    organizer?: string;
    place?: string;
}

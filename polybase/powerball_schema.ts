// This is an example collection definition.
// You should edit it for your use case.

// The language (Polylang) is similar to JavaScript,
// but semi-colons are mandatory.

// The `collection` keyword defines a named collection.
// Collection properties define the "columns" in a record.

// @`public` means that the collections are public, anyone can view and read
// the records in the collection. You can still implement rules on who can 
// edit the data by defining functions on the collection and checking the public key.

@public
collection PowerballTicket {
  // `id` is unique and required on all collections
  id: string;

  // The user who bought the ticket
  buyer: string;

  // The numbers on the ticket
  numbers: number[];

  // The ID of the drawing that the ticket was entered into
  drawingId: string;

  constructor (id: string, buyer: string, numbers: number[], drawingId: string) {
    this.id = id;
    this.buyer = buyer;
    this.numbers = numbers;
    this.drawingId = drawingId;
  }
}

@public
collection PowerballDrawing {
  // `id` is unique and required on all collections
  id: string;

  // The winning numbers of the drawing
  winningNumbers: number[];

  // The ID of the ticket that won the drawing, if any
  winningTicketId?: string;

  constructor (id: string, winningNumbers: number[], winningTicketId?: string) {
    this.id = id;
    this.winningNumbers = winningNumbers;
    this.winningTicketId = winningTicketId;
  }
}

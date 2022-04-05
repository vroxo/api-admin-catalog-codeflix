export default class InvalidUuidError extends Error {
    constructor(message?: string) {
        super(message || "ID must be valid UUID.");
        this.name = "InvalidUuidError";
    }
}
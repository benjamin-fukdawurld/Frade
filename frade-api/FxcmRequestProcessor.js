class FxcmRequestProcessor {
    #host;
    #port;
    #token;
    constructor(host, port, token) {
        this.host = host;
        this.port = port;
        this.token = token;
    }

    get host() {
        return this.#host;
    }

    set host(value) {
        if (typeof value !== "string") {
            throw "RequestProcessor: Host must be a valid string";
        }

        this.#host = value;
    }

    get port() {
        return this.#port;
    }

    set port(value) {
        if (typeof value !== "number" || value <= 0 || !Number.isInteger(value)) {
            throw "RequestProcessor: Port must be a valid number";
        }

        this.#port = value;
    }

    get token() {
        return this.#token;
    }

    set token(value) {
        if (typeof value !== "string") {
            throw "RequestProcessor: token must be a valid string";
        }

        this.#token = value;
    }
}

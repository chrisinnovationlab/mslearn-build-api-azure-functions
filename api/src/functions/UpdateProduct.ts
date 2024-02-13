import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import productsService from "../../services/productsService";

export async function UpdateProduct(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    let response;

    try {
        const product = await request.json();
        const result = await productsService.update(product);

        return {
            status: 200,
            jsonBody: result
        };
    } catch (error) {
        return {
            status: 500,
            body: error.message
        };
    }  
};

app.http('UpdateProduct', {
    methods: ['PUT'],
    route: 'product',
    handler: UpdateProduct
});

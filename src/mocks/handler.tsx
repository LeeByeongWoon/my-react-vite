import { DefaultRequestBody, rest } from "msw";

type RequestType = DefaultRequestBody & {
    value: number;
};
export const handler = [
    rest.put<RequestType>("/counter/increament", async (req, res, ctx) => {
        const request = req.body;
        console.log(request);
        if (request !== null && request !== undefined)
            return res(
                ctx.json({
                    value: request.value + 2,
                }),
            );
    }),
    rest.get("/hello", async (req, res, ctx) => {
        return res(
            ctx.json({
                greeting: "hello",
            }),
        );
    }),
    rest.post("/file_upload", async (req, res, ctx) => {
        const file = req.body;
        console.log(file);
        const reqdata = await ctx.fetch(
            "/rest/1.0/csv/validation_by_input?main_domain=traffic&sub_domain=test101&measurement=test101",
        );

        console.log(reqdata);

        // const fileCount = file.length;
        // console.log(fileCount);
        // let fileNames: string[] = [];
        // file as File[];
        // file.map((files) => {
        //     fileNames.push(files.name);
        // });
        return res(
            ctx.status(201),
            // ctx.json({
            //     fileCount,
            //     fileNames,
            // }),
        );
    }),
];

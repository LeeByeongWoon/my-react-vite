import axios from "axios";
import { useEffect, useRef, useState } from "react";

// types
type Props = {
    file: File;
};

function Lists({ file }: Props) {
    return <li>{file.name}</li>;
}

export default function FileUpload() {
    //initialize
    const [files, setFiles] = useState<File[] | null>(null);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current !== null) {
            ref.current.setAttribute("webkitdirectory", "true");
        }
    }, [ref]);

    const onclick = async (): Promise<void> => {
        console.log(files);
        const forms = new FormData();
        files?.map((file) => forms.append("files", file));

        await axios
            .post("/file_upload", forms, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((errer) => {
                console.log(errer);
            });
    };
    async function greeting(): Promise<void> {
        const greet = await axios.get("/hello");
        console.log(greet.data);
    }
    return (
        <div>
            <ul>
                {/* files ? files : null; */}
                {files?.map((file, index) => (
                    <Lists key={index} file={file} />
                ))}
            </ul>
            <input
                type="file"
                ref={ref}
                multiple
                onChange={(e) => {
                    if (e.target.files !== null) setFiles(Object.values(e.target.files));
                }}
            ></input>
            <button onClick={() => onclick()} disabled={files?.length === 0}>
                파일 전송
            </button>
            <button onClick={() => greeting()}>인사</button>
        </div>
    );
}

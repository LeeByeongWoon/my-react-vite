import Papa, { ParseLocalConfig } from "papaparse";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

type Encording = "euc-kr" | "utf-8";

const CompareColumn = (props: Props) => {
    const [files, setFiles] = useState<File[]>([]);
    const ref = useRef<HTMLInputElement>(null);
    const [encoding, setEncoding] = useState("utf-8");

    useEffect(() => {
        if (ref.current !== null) {
            ref.current.setAttribute("webkitdirectory", "true");
        }
    }, [ref]);

    useEffect(() => {
        console.log(files);
        if (files.length !== 0) {
            Papa.parse(files[0], {
                encoding,
                complete: (result, file) => {
                    console.log(result.data.slice(0, 1), file);
                },
            });
        }
    }, [files, encoding]);
    const onChange = (files: File[]) => {
        const result = files.filter((file) => file.type === "text/csv");
        setFiles(result);
    };

    return (
        <div>
            <select
                name="encoding"
                onChange={(e) => {
                    setEncoding(e.target.value);
                }}>
                <option value="euc-kr">euc-kr</option>
                <option value="utf-8">utf-8</option>
            </select>
            <input
                type="file"
                multiple
                ref={ref}
                onChange={(e) => {
                    if (e.target.files !== null) onChange(Object.values(e.target.files));
                }}></input>
            <ul>
                {/* files ? files : null; */}
                {files?.map((file, index) => (
                    <li>{file.name}</li>
                ))}
            </ul>
        </div>
    );
};
export default CompareColumn;

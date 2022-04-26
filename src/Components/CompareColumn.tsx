import Papa from "papaparse";
import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import oc from "open-color";
type ColumnTypes = string[];

const ColumnWrap = styled.div`
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    white-space: normal;
`;
const Text = styled.p`
    font-weight: bold;
    white-space: nowrap;
    margin: 0;
    margin-right: 0.5rem;
`;
const CompareColumn = () => {
    const [files, setFiles] = useState<File[]>([]);
    const ref = useRef<HTMLInputElement>(null);

    const [firstFileColumn, setFirstFileColumn] = useState<ColumnTypes>([]);
    const [dffIndex, setDffIndex] = useState<File[]>([]);
    const [encoding, setEncoding] = useState<string>("utf-8");

    //set webkit directory
    useEffect(() => {
        if (ref.current !== null) {
            ref.current.setAttribute("webkitdirectory", "true");
        }
    }, [ref.current]);

    // // gen file coloumn
    useEffect(() => {
        if (files.length !== 0) {
            csvHeader();
        }
    }, [files, encoding]);

    // filter
    useEffect(() => {
        console.log(firstFileColumn);
        setDffIndex([]);
        if (firstFileColumn.length !== 0) {
            files.map((file, index) => {
                if (index !== 0)
                    Papa.parse(file.slice(0, 1024), {
                        encoding,
                        complete: (result: Papa.ParseResult<string[]>) => {
                            const temp = result.data.slice(0, 1)[0];
                            const intersection = firstFileColumn.filter((el) => !temp.includes(el));
                            if (intersection.length !== 0) {
                                setDffIndex((prev) => [...prev, file]);
                                // setFiles((prev) => prev.filter((x) => x !== file));
                            }
                        },
                    });
            });
        }
    }, [firstFileColumn]);

    //file input
    const onChange = (files: File[]) => {
        setFirstFileColumn([]);
        const result = files.filter((file) => file.type === "text/csv");
        setFiles(result);
        const dataTransfer = new DataTransfer();
        result.map((file) => dataTransfer.items.add(file));
        if (ref.current !== null) ref.current.files = dataTransfer.files;
    };

    // gen header
    const csvHeader = () => {
        Papa.parse(files[0].slice(0, 1024 * 1024 * 30), {
            encoding,
            complete: (result: Papa.ParseResult<string[]>) => {
                const fstCol = result.data.slice(0, 1)[0];
                if (fstCol.filter((f) => !firstFileColumn.includes(f)).length !== 0)
                    setFirstFileColumn([...result.data.slice(0, 1)[0]]);
            },
        });
    };

    return (
        <div>
            <select
                name="encoding"
                onChange={(e) => {
                    setEncoding(e.target.value);
                }}
            >
                <option value="utf-8">utf-8</option>
                <option value="euc-kr">euc-kr</option>
            </select>
            <input
                type="file"
                multiple
                ref={ref}
                onChange={(e) => {
                    if (e.target.files !== null) onChange(Object.values(e.target.files));
                }}
            ></input>
            <ul>
                {files?.map((file, index) =>
                    dffIndex.includes(file) ? (
                        <li style={{ color: oc.red[7], listStyleType: "none" }} key={index}>
                            {file.name}
                        </li>
                    ) : (
                        <li key={index} style={{ listStyleType: "none" }}>
                            {file.name}
                        </li>
                    ),
                )}
            </ul>

            <div>
                <h3>columns</h3>
                <ColumnWrap>
                    {firstFileColumn.map((col, key) => (
                        <Text key={key}>{col}</Text>
                    ))}
                </ColumnWrap>
            </div>
        </div>
    );
};
export default memo(CompareColumn);

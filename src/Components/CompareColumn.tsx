import Papa, { ParseLocalConfig } from "papaparse";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {};
type ColumnTypes = string[];

const ColumnWrap = styled.div`
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    /* overflow-x: scroll; */
    white-space: normal;
`;
const Text = styled.p`
    font-weight: bold;
    white-space: nowrap;
    margin: 0;
    margin-right: 0.5rem;
`;
const CompareColumn = (props: Props) => {
    const [files, setFiles] = useState<File[]>([]);
    const ref = useRef<HTMLInputElement>(null);

    const [deleteList, setDeleteList] = useState<string[]>([]);
    const [firstFileColumn, setFirstFileColumn] = useState<ColumnTypes>([]);
    const [etcFileColumn, setEtcFileColumn] = useState<ColumnTypes[]>([]);
    const [filterFlag, setFilterFlag] = useState<boolean>(false);

    const [encoding, setEncoding] = useState<string>("utf-8");

    //set webkit directory
    useEffect(() => {
        console.log(ref.current?.files);
        if (ref.current !== null) {
            ref.current.setAttribute("webkitdirectory", "true");
        }
    }, [ref.current]);

    // gen file coloumn
    useEffect(() => {
        csvHeader();
    }, [files, encoding]);

    useEffect(() => {
        files.map((file) => {
            Papa.parse(file.slice(0, 1024), {
                encoding,
                complete: (result: Papa.ParseResult<string[]>) => {
                    const temp = result.data.slice(0, 1)[0];
                    // firstFileColumn.filter(el=>temp.includes(firstFileColumn))
                },
            });
        });
    }, [firstFileColumn]);

    // const parseFiles = (csvFile: File[]) => {
    //     if (csvFile.length !== 0) {
    //         csvFile.map((file, index) => {
    //             if (index === 0) {
    //                 Papa.parse(file.slice(0, 1024 * 1024 * 30), {
    //                     encoding,
    //                     complete: (result: Papa.ParseResult<string[]>) => {
    //                         setFirstFileColumn((prev) => ({
    //                             ...prev,
    //                             fileColumn: result.data.slice(0, 1)[0],
    //                         }));
    //                     },
    //                 });
    //             } else {
    //                 Papa.parse(file.slice(0, 1000), {
    //                     encoding,
    //                     complete: (result: Papa.ParseResult<string[]>) => {

    //                     },
    //                 });
    //             }
    //         });
    //     }
    // };
    const csvHeader = () => {
        Papa.parse(files[0].slice(0, 1024 * 1024 * 30), {
            encoding,
            complete: (result: Papa.ParseResult<string[]>) => {
                setFirstFileColumn((prev) => ({
                    ...prev,
                    fileColumn: result.data.slice(0, 1)[0],
                }));
            },
        });
    };

    const onChange = (files: File[]) => {
        const result = files.filter((file) => file.type === "text/csv");
        setFiles(result);
        const dataTransfer = new DataTransfer();
        result.map((file) => dataTransfer.items.add(file));
        if (ref.current !== null) ref.current.files = dataTransfer.files;
    };
    // const filterFiles = () => {
    //     etcFileColumn.map((fileColumn, index) => {
    //         const inter = fileColumn.fileColumn.filter((x) => firstFileColumn.fileColumn.includes(x));
    //         if (inter.length !== firstFileColumn.fileColumn.length) {
    //             console.log(inter);
    //             etcFileColumn.slice(index, 1);
    //             setDeleteList((prev) => [...prev, fileColumn.fileName!]);
    //             setFiles((prev) => prev.filter((file) => file.name !== fileColumn.fileName));
    //         }
    //     });
    //     const dataTransfer = new DataTransfer();
    //     files.map((file) => dataTransfer.items.add(file));
    //     if (ref.current !== null) ref.current.files = dataTransfer.files;
    // };
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
                {/* files ? files : null; */}
                {files?.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
            {/* <button onClick={filterFiles}>필터링</button> */}
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

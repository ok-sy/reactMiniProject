import * as React from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { rootSx } from "../styles/Todo";

export default function SampleTodo() {
    // 70line TextField에 들어오는 TextValue
    // userState 동적인 값 관리

    const [input, setInput] = useState<string>("");
    // 값이 저장되는 배열
    const [arr, setArr] = useState<string[]>([]);
    const onClickAddBtn = () => {
        if (input !== "") {
            setArr(arr.concat(input));
            setInput("");
        }
    };

    const onClickDeleteBtn = (deleteIdx: number) => {
        arr.splice(deleteIdx, 1);
        setArr([...arr]);
    };
    const onClickInsertBtn = (deleteIdx: number) => {
        if (input !== "") {
            arr.fill(input, deleteIdx, deleteIdx + 1);
            setArr([...arr]);
            console.log(input, deleteIdx, deleteIdx + 1);
        }
    };
    const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const onKeyDownEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && input !== "" && input !== null) {
            onClickAddBtn();
        }
    };
    return (
        <Box sx={rootSx} className="SampleTodo-root">
            <Box className="TodoList_Wrap">
                <Button
                    onClick={() => {
                        setArr([]);
                    }}
                >
                    전체삭제
                </Button>
                <Box
                    sx={{
                        border: "1px solid #e0e0e0",
                        width: "100%",
                        height: 300,
                        mb: 2,
                        overflow: "auto",
                    }}
                >
                    {arr.map((element, idx) => (
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            key={idx}
                        //(onClickSelectDeleteBtn) => console.log(checked)
                        >
                            <Box sx={{ p: 1, width: "10%" }}>{idx + 1 + "."}</Box>
                            <Box sx={{ p: 1, width: "70%" }}>{element}</Box>
                            <Button
                                sx={{ width: "10%" }}
                                onClick={() => {
                                    onClickInsertBtn(idx);
                                }}
                            >
                                수정
                            </Button>
                            <Button
                                sx={{ width: "10%" }}
                                onClick={() => {
                                    onClickDeleteBtn(idx);
                                }}
                            >
                                삭제
                            </Button>
                        </Stack>
                    ))}
                </Box>

                <Stack spacing={1} direction="row" alignItems="center">
                    <TextField
                        sx={{ width: 500 }}
                        label="입력"
                        placeholder="할 일을 입력하세요"
                        color="secondary"
                        value={input}
                        onChange={onChangeTextField}
                        onKeyDown={onKeyDownEvent}
                    />
                    <Button onClick={onClickAddBtn} size="large">
                        등록
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
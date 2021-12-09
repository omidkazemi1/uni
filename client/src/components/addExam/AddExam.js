import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import MultiSelect from "../multiSelect/MultiSelect";
import { useSelector } from "react-redux";
import QuestionCard from "../questionCard/QuestionCard";
import { FaPlus } from "react-icons/fa";
import { Box } from "@mui/system";

const AddExam = () => {
    const [examFormData, setExamFormData] = useState({
        name: "",
        startTime: "",
        duration: ""
    });
    const [examFormError, setExamFormError] = useState({
        name: false,
        startTime: false,
        duration: false
    });
    const [questionFormData, setQuestionFormData] = useState({
        body: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        trueOption: "",
        score: ""
    });
    const [questionFormError, setQuestionFormError] = useState({
        body: false,
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false,
        trueOption: false,
        score: false
    });
    const [questions, setQuestions] = useState([
        {
            answer1: "شسی بشسی بشسی ",
            answer2: "شسیبشسیب",
            answer3: "شسیبشسب",
            answer4: "شسیب شسی ب",
            body: "1",
            score: "2",
            trueOption: 2
        },
        {
            answer1: "شسی بشسی بشسی ",
            answer2: "شسیبشسیب",
            answer3: "شسیبشسب",
            answer4: "شسیب شسی ب",
            body: "2",
            score: "2",
            trueOption: 2
        },
        {
            answer1: "شسی بشسی بشسی ",
            answer2: "شسیبشسیب",
            answer3: "شسیبشسب",
            answer4: "شسیب شسی ب",
            body: "3",
            score: "2",
            trueOption: 2
        }
    ]);

    const [questionDialogOpen, setQuestionDialogOpen] = useState(false);
    const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const { classDocs } = useSelector(state => state.classes);

    const handleExamInput = event => {
        setExamFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        setExamFormError(prevState => ({ ...prevState, [event.target.name]: false }));
    };

    const handleQuestionInput = event => {
        setQuestionFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        setQuestionFormError(prevState => ({ ...prevState, [event.target.name]: false }));
    };

    const handleSelectChange = event => {
        const {
            target: { value }
        } = event;
        setSelectedClasses(value);
    };

    const handleDialogOpen = () => {
        setQuestionDialogOpen(true);
    };

    const handleDialogClose = () => {
        setQuestionDialogOpen(false);
        setQuestionFormData({
            body: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            trueOption: "",
            score: ""
        });
    };

    const handleDialogSabmit = event => {
        event.preventDefault();
        setQuestionFormError({
            body: false,
            answer1: false,
            answer2: false,
            answer3: false,
            answer4: false,
            trueOption: false,
            score: false
        });

        let hasError = false;
        for (const input in questionFormData) {
            if (questionFormData[input] === "") {
                setQuestionFormError(prevState => ({ ...prevState, [input]: true }));
                hasError = true;
            }
        }

        if (!hasError) {
            if (!selectedQuestion) {
                setQuestions(prevState => [...prevState, { ...questionFormData }]);
            } else {
                setQuestions(prevState => {
                    prevState[selectedQuestion] = { ...questionFormData };
                    return prevState;
                });
            }

            handleDialogClose();
            setQuestionFormData({
                body: "",
                answer1: "",
                answer2: "",
                answer3: "",
                answer4: "",
                trueOption: "",
                score: ""
            });
        }
    };

    const handlePreviewClose = () => {
        setPreviewDialogOpen(false);
        setQuestionFormData({
            body: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            trueOption: "",
            score: ""
        });
    };

    const handleRemoveQuestion = questionIndex =>
        setQuestions(pervState =>
            pervState.filter((question, index) => index !== questionIndex)
        );

    const handleEditQuestion = questionIndex => {
        setQuestionFormData({ ...questions[questionIndex] });
        setSelectedQuestion(questionIndex);
        handleDialogOpen();
    };

    const handlePreviewQuestion = questionIndex => {
        setQuestionFormData({ ...questions[questionIndex] });
        setSelectedQuestion(questionIndex);
        setPreviewDialogOpen(true);
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold" my={4}>
                    افزودن آزمون
                </Typography>
            </Stack>

            <Grid
                container
                justifyContent="center"
                component={Paper}
                py={3}
                px={{ xs: 3, md: 0 }}>
                <form>
                    <Grid
                        container
                        justifyContent="center"
                        rowSpacing={1}
                        columnSpacing={{ xs: 0, sm: 2, md: 3 }}
                        maxWidth="md">
                        <Grid item xs={12} sm={9} md={6} lg={6}>
                            <TextField
                                name="name"
                                label="نام آزمون"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={examFormData.name}
                                error={examFormError.name}
                                onChange={handleExamInput}
                            />
                            <FormHelperText error={examFormError.name}>
                                نام آزمون را وارد کنید
                            </FormHelperText>
                        </Grid>

                        <Grid item xs={12} sm={9} md={6} lg={6}>
                            <TextField
                                name="startTime"
                                label="زمان شروع"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={examFormData.startTime}
                                error={examFormError.startTime}
                                onChange={handleExamInput}
                            />
                            <FormHelperText error={examFormError.startTime}>
                                زمان شروع آزمون را وارد کنید
                            </FormHelperText>
                        </Grid>

                        <Grid item xs={12} sm={9} md={6} lg={6}>
                            <TextField
                                name="duration"
                                label="زمان شروع"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={examFormData.duration}
                                error={examFormError.duration}
                                onChange={handleExamInput}
                            />
                            <FormHelperText error={examFormError.duration}>
                                مدت زمان آزمون را وارد کنید
                            </FormHelperText>
                        </Grid>

                        <Grid item xs={12} sm={9} md={6} lg={6}>
                            <MultiSelect
                                label="زمان شروع"
                                selectedValues={selectedClasses}
                                values={classDocs}
                                error={examFormError.duration}
                                handler={handleSelectChange}
                                onChange={handleExamInput}
                            />
                            <FormHelperText error={examFormError.duration}>
                                مدت زمان آزمون را وارد کنید
                            </FormHelperText>
                        </Grid>
                    </Grid>

                    <Grid container mt={3}>
                        <Grid item xs={12}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between">
                                <Typography variant="body1">سوالات آزمون</Typography>
                                <Button
                                    onClick={handleDialogOpen}
                                    startIcon={<FaPlus size={12} />}>
                                    افزودن سوال
                                </Button>
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            {questions.map((question, index) => (
                                <QuestionCard
                                    key={index}
                                    question={question}
                                    index={index}
                                    handleRemove={handleRemoveQuestion}
                                    handleEdit={handleEditQuestion}
                                    handlePreview={handlePreviewQuestion}
                                />
                            ))}
                        </Grid>
                    </Grid>

                    <Grid container mt={3}>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained">ثبت آزمون</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>

            <Dialog
                open={questionDialogOpen}
                scroll="paper"
                maxWidth="sm"
                fullWidth
                onClose={handleDialogClose}>
                <DialogTitle>افزودن سوال جدید</DialogTitle>
                <form onSubmit={handleDialogSabmit}>
                    <DialogContent>
                        <Grid container rowGap={3} columnSpacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    name="body"
                                    value={questionFormData.body}
                                    error={questionFormError.body}
                                    onChange={handleQuestionInput}
                                    fullWidth
                                    label="متن سوال"
                                />
                                <FormHelperText error={questionFormError.body}>
                                    متن سوال را وارد کنید
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    size="small"
                                    name="answer1"
                                    value={questionFormData.answer1}
                                    error={questionFormError.answer1}
                                    onChange={handleQuestionInput}
                                    fullWidth
                                    label="گزینه اول"
                                />
                                <FormHelperText error={questionFormError.answer1}>
                                    گزینه اول را وارد کنید
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size="small"
                                    name="answer2"
                                    value={questionFormData.answer2}
                                    error={questionFormError.answer2}
                                    onChange={handleQuestionInput}
                                    fullWidth
                                    label="گزینه دوم"
                                />
                                <FormHelperText error={questionFormError.answer2}>
                                    گزینه دوم را وارد کنید
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size="small"
                                    name="answer3"
                                    value={questionFormData.answer3}
                                    error={questionFormError.answer3}
                                    onChange={handleQuestionInput}
                                    fullWidth
                                    label="گزینه سوم"
                                />
                                <FormHelperText error={questionFormError.answer3}>
                                    گزینه سوم را وارد کنید
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    size="small"
                                    name="answer4"
                                    value={questionFormData.answer4}
                                    error={questionFormError.answer4}
                                    onChange={handleQuestionInput}
                                    fullWidth
                                    label="گزینه چهارم"
                                />
                                <FormHelperText error={questionFormError.answer4}>
                                    گزینه چهارم را وارد کنید
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    size="small"
                                    name="score"
                                    value={questionFormData.score}
                                    error={questionFormError.score}
                                    onChange={handleQuestionInput}
                                    fullWidth
                                    label="بارم سوال"
                                />
                                <FormHelperText error={questionFormError.score}>
                                    بارم سوال را وارد کنید
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        size="small"
                                        error={questionFormError.trueOption}>
                                        گزینه درست
                                    </InputLabel>
                                    <Select
                                        value={questionFormData.trueOption}
                                        error={questionFormError.trueOption}
                                        name="trueOption"
                                        label="گزینه درست"
                                        size="small"
                                        onChange={handleQuestionInput}>
                                        <MenuItem value={1}>گزینه اول</MenuItem>
                                        <MenuItem value={2}>گزینه دوم</MenuItem>
                                        <MenuItem value={3}>گزینه سوم</MenuItem>
                                        <MenuItem value={4}>گزینه چهارم</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormHelperText error={questionFormError.trueOption}>
                                    گزینه درست را انتخواب کنید
                                </FormHelperText>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">ثبت</Button>
                        <Button color="error" onClick={handleDialogClose}>
                            لغو
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog
                open={previewDialogOpen}
                scroll="paper"
                maxWidth="sm"
                fullWidth
                onClose={handlePreviewClose}>
                <DialogTitle>سوال</DialogTitle>
                <DialogContent>
                    <Box my={3}>
                        <Typography variant="body1">متن سوال</Typography>
                        <Typography variant="body2" color="text.secondary">{questionFormData.body}</Typography>
                    </Box>
                    <Divider />
                    <Box my={3}>
                        <Typography variant="body1">گزینه اول</Typography>
                        <Typography variant="body2" color="text.secondary">{questionFormData.answer1}</Typography>
                    </Box>
                    <Divider />
                    <Box my={3}>
                        <Typography variant="body1">گزینه دوم</Typography>
                        <Typography variant="body2" color="text.secondary">{questionFormData.answer2}</Typography>
                    </Box>
                    <Divider />
                    <Box my={3}>
                        <Typography variant="body1">گزینه سوم</Typography>
                        <Typography variant="body2" color="text.secondary">{questionFormData.answer3}</Typography>
                    </Box>
                    <Divider />
                    <Box my={3}>
                        <Typography variant="body1">گزینه چهارم</Typography>
                        <Typography variant="body2" color="text.secondary">{questionFormData.answer4}</Typography>
                    </Box>
                    <Divider />
                    <Box my={3}>
                        <Typography variant="body1">گزینه صحیح</Typography>
                        <Typography variant="body2" color="text.secondary">{questionFormData.trueOption}</Typography>
                    </Box>
                    <Divider />
                    <Box my={3}>
                        <Typography variant="body1">بارم سوال</Typography>
                        <Typography variant="body2" color="text.secondary">{questionFormData.score}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handlePreviewClose}>
                        بستن
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddExam;

import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
import { Box } from "@mui/system";
import QuestionCard from "../questionCard/QuestionCard";

const AddExam = () => {
    const [formData, setFormData] = useState({ name: "", startTime: "", duration: "" });
    const [formError, setFormError] = useState({
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
    const [questions, setQuestions] = useState([]);

    const [questionDialogOpen, setQuestionDialogOpen] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const { classDocs } = useSelector(state => state.classes);

    const handleExamInput = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        setFormError(prevState => ({ ...prevState, [event.target.name]: false }));
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
            answers: [
                { text: "", option: 1 },
                { text: "", option: 2 },
                { text: "", option: 3 },
                { text: "", option: 4 }
            ],
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
            setQuestions(prevState => [...prevState, { ...questionFormData }]);
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
                                value={formData.name}
                                error={formError.name}
                                onChange={handleExamInput}
                            />
                            <FormHelperText error={formError.name}>
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
                                value={formData.startTime}
                                error={formError.startTime}
                                onChange={handleExamInput}
                            />
                            <FormHelperText error={formError.startTime}>
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
                                value={formData.duration}
                                error={formError.duration}
                                onChange={handleExamInput}
                            />
                            <FormHelperText error={formError.duration}>
                                مدت زمان آزمون را وارد کنید
                            </FormHelperText>
                        </Grid>

                        <Grid item xs={12} sm={9} md={6} lg={6}>
                            <MultiSelect
                                label="زمان شروع"
                                selectedValues={selectedClasses}
                                values={classDocs}
                                error={formError.duration}
                                handler={handleSelectChange}
                                onChange={handleExamInput}
                            />
                            <FormHelperText error={formError.duration}>
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
                                <Button onClick={handleDialogOpen}>افزودن سوال</Button>
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            {questions.map((question, index) => (
                                <QuestionCard key={index} question={question} index={index} />
                            ))}
                        </Grid>
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

                    <Grid container mt={3}>
                        <Grid item xs={12} md={6}>
                                <Button fullWidth variant="contained">
                                    ثبت آزمون
                                </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </>
    );
};

export default AddExam;

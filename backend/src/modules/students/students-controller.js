const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    //write your code
    const className = req.query.class || null;  
    const section = req.query.section || null;
    const userName = req.query.name || null;
    const roll = req.query.roll || null;

    const students = await getAllStudents({ name:userName, className:className, section:section, roll:roll });
    res.json({students});
});

const handleAddStudent = asyncHandler(async (req, res) => {
    //write your code
    const payload = req.body;
    const message = await addNewStudent(payload);

    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const payload = req.body;
    const message = await updateStudent({ ...payload, id });
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code
    const {status} = req.body;
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const message = await setStudentStatus({ userId, reviewerId, status });
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};

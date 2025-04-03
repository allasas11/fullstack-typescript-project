const Student = require('../models/studentModel')


const getStudents = async (req, res) => {
    try {
        const students = await Student.find()
        res.send(students)

    } catch (error) {
        res.status(500).send(error)
    }
}


const getStudentById = async (req, res) => {
    try {
        const { id } = req.params
        const student = await Student.findById(id)

        if(!student) {
            return res.status(404).send( { error: 'User not found' } )
        }

        res.send(student)

    } catch (error) {
        res.status(500).send(error)
    }
}


const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body)
        await student.save()

        res.send(student)

    } catch (error) {
        res.status(500).send(error)
    }
}


const updateStudent = async (req, res) => {
    try {
        const { id } = req.params
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if(!updatedStudent) {
            return res.status(404).send( { error: 'User not found' } )
        }

        res.send(updatedStudent)
    } catch (error) {
        res.status(500).send(error)
    }
}


const removeStudent = async (req, res) => {
    try {
        const {id} = req.params
        const deletedStudent = await Student.findByIdAndDelete(id)

        if(!deletedStudent) {
            return res.status(404).send( { error: 'User not found' } )
        }


        res.send(deletedStudent)

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    removeStudent
}